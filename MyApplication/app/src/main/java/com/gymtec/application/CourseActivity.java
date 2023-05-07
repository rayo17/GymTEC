package com.gymtec.application;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.database.Cursor;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.gymtec.application.database.Sqlite;
import com.gymtec.application.databinding.ActivityCourseBinding;
import com.gymtec.application.maindb_access.models.Clase_cliente;
import com.gymtec.application.maindb_access.models.Cliente;
import com.gymtec.application.maindb_access.models.Methods;
import com.gymtec.application.maindb_access.models.RemoteDBsendGet;

import java.io.IOException;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CourseActivity extends AppCompatActivity {

    /**
     * Shows information of a course
     */

    ActivityCourseBinding binding;
    Sqlite databaseHelper;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityCourseBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        databaseHelper = new Sqlite(getApplicationContext());

        Intent intent = this.getIntent();

        if (intent != null){
            String tipo = intent.getStringExtra("tipo");
            String sucursal = intent.getStringExtra("sucursal");
            String dia = intent.getStringExtra("dia");
            String hora_inicio = intent.getStringExtra("hora inicio");
            String hora_final = intent.getStringExtra("hora final");
            String instructor = intent.getStringExtra("instructor");
            String capacidad = intent.getStringExtra("capacidad");

            binding.tipoClaseInfo.setText(tipo);
            binding.sucursalClaseInfo.setText(sucursal);
            binding.diaClaseInfo.setText(dia);
            binding.horaInicioClaseInfo.setText(hora_inicio);
            binding.horaFinalClaseInfo.setText(hora_final);
            binding.instructorClaseInfo.setText(instructor);
            binding.cuposDisponiblesClaseInfo.setText(capacidad);
        }

        binding.registrarClaseBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                Cursor cliente = databaseHelper.getCliente();
                cliente.moveToFirst();
                @SuppressLint("Range") String cedula = cliente.getString(cliente.getColumnIndex("Cedula"));
                Methods methods = RemoteDBsendGet.getRetrofitInstance().create(Methods.class);
                assert intent != null;
                Call<Clase_cliente> call= methods.getClietClaseData(new Clase_cliente(intent.getStringExtra("identificador"),cedula,intent.getStringExtra("sucursal")));
                call.enqueue(new Callback<Clase_cliente>() {
                    @Override
                    public void onResponse(Call<Clase_cliente> call, Response<Clase_cliente> response) {
                        if(response.isSuccessful()){
                            databaseHelper.addNewClase_Cliente(intent.getStringExtra("identificador"),cedula,intent.getStringExtra("sucursal"));
                            Toast.makeText(getApplicationContext(),"Clase registrada con éxito",Toast.LENGTH_LONG).show();
                            Intent home = new Intent(getApplicationContext(), MainActivity.class);
                            finishAffinity();
                            startActivity(home);
                            finish();
                        } else {
                            String response_code = null;
                            try {
                                response_code = response.errorBody().string();
                            } catch (IOException e) {
                                throw new RuntimeException(e);
                            }
                            Log.d("Error 4000",response_code);
                            Toast.makeText(getApplicationContext(), "La clase ya ha sido registrada" , Toast.LENGTH_LONG).show();


                        }


                    }


                    @Override
                    public void onFailure(Call<Clase_cliente> call, Throwable t) {
                        String error= t.toString();
                        Log.d("Error registrando clase",error);
                        Toast.makeText(getApplicationContext(),error,Toast.LENGTH_LONG).show();

                    }
                });

            }
        });

    }
}
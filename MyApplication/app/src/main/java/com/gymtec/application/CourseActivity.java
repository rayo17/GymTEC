package com.gymtec.application;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.database.Cursor;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.gymtec.application.database.Sqlite;
import com.gymtec.application.databinding.ActivityCourseBinding;

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

                databaseHelper.addNewClase_Cliente( intent.getStringExtra("identificador"),cedula);
                Toast registered = Toast.makeText(getApplicationContext(), "Clase registrada con éxito", Toast.LENGTH_LONG);
                registered.show();
                finish();
            }
        });

    }
}
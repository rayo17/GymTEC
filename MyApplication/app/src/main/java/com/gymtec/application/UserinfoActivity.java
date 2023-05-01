package com.gymtec.application;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.os.Build;
import android.os.Bundle;
import android.view.View;

import com.gymtec.application.database.Sqlite;
import com.gymtec.application.databinding.ActivityCourseListBinding;
import com.gymtec.application.databinding.ActivityUserinfoBinding;
import com.gymtec.application.ui.login.LoginActivity;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.util.Objects;

public class UserinfoActivity extends AppCompatActivity {

    ActivityUserinfoBinding binding;

    Sqlite databaseHelper;
    @SuppressLint({"Range", })
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityUserinfoBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        databaseHelper = new Sqlite(getApplicationContext());

        Cursor cliente = databaseHelper.getCliente();
        if (cliente.moveToFirst()){
            String primer_nombre = cliente.getString(cliente.getColumnIndex("Primer_nombre"));
            String segundo_nombre = cliente.getString(cliente.getColumnIndex("Segundo_nombre"));
            String primer_apellido = cliente.getString(cliente.getColumnIndex("Primer_apellido"));
            String segundo_apellido = cliente.getString(cliente.getColumnIndex("Segundo_apellido"));
            String nombre_completo = primer_nombre+
                    " "+
                    segundo_nombre+
                    " "+
                    primer_apellido+
                    " "+segundo_apellido;
            binding.nombreCompletoTextview.setText(nombre_completo);

            String cedula = cliente.getString(cliente.getColumnIndex("Cedula"));
            binding.cedulaTextview.setText(cedula);

            String fecha_nacimiento = cliente.getString(cliente.getColumnIndex("Fecha_nacimiento"));
            binding.fechaNacimientoTextview.setText(fecha_nacimiento);

            String provincia = cliente.getString(cliente.getColumnIndex("Provincia"));
            binding.userProvinciaTextView.setText(provincia);

            String canton = cliente.getString(cliente.getColumnIndex("Canton"));
            binding.userCantonTextView.setText(canton);

            String distrito = cliente.getString(cliente.getColumnIndex("Distrito"));
            binding.userDistritoTextView.setText(distrito);

            String email = cliente.getString(cliente.getColumnIndex("Correo_electronico"));
            binding.emailTextView.setText(email);

            String peso = cliente.getString(cliente.getColumnIndex("Peso"));
            binding.pesoTextView.setText(peso);

            String imc = cliente.getString(cliente.getColumnIndex("Imc"));
            binding.imcTextView.setText(imc);

            String curr_age = "";
            if (fecha_nacimiento.length()>=10) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    curr_age = String.valueOf(Period.between(LocalDate.parse(fecha_nacimiento), LocalDate.now()).getYears());
                }
            }

            binding.edadTextview.setText(curr_age);
            binding.logoutBtn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    databaseHelper.empty_Clients();
                    Intent login = new Intent(getApplicationContext(), LoginActivity.class);
                    login.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                    finishAffinity();
                    startActivity(login);
                }
            });

        }


    }
}
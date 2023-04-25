package com.gymtec.application;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.gymtec.application.databinding.ActivityCourseBinding;

public class CourseActivity extends AppCompatActivity {

    /**
     * Shows information of a course
     */

    ActivityCourseBinding binding;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityCourseBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        Intent intent = this.getIntent();

        if (intent != null){
            String tipo = intent.getStringExtra("tipo");
            String sucursal = intent.getStringExtra("sucursal");
            String dia = intent.getStringExtra("dia");
            String hora_inicio = intent.getStringExtra("hora inicio");
            String hora_final = intent.getStringExtra("hora final");

            binding.tipoClaseInfo.setText(tipo);
            binding.sucursalClaseInfo.setText(sucursal);
            binding.diaClaseInfo.setText(dia);
            binding.horaInicioClaseInfo.setText(hora_inicio);
            binding.horaFinalClaseInfo.setText(hora_final);
        }

        binding.registrarClaseBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast registered = Toast.makeText(getApplicationContext(), "Clase registrada con éxito", Toast.LENGTH_LONG);
                registered.show();
                finish();
            }
        });

    }
}
package com.gymtec.application;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;

import com.gymtec.application.databinding.ActivityCourseListBinding;

import java.util.ArrayList;

public class CourseListActivity extends AppCompatActivity {

    ActivityCourseListBinding binding;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityCourseListBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        String[] tipos =  {"Ciclismo", "Boxeo", "Spinning", "Pilates","Boxeo","Ciclismo","Tiro al blaco"};
        String[] horas_inicio = {"12:00", "9:00", "7:00", "20:00","20:00","9:00", "3:00"};
        String[] horas_final = {"13:00", "10:00", "9:30", "21:45","10:00","9:30","4:30"};
        String[] dias = {"Lunes", "Lunes", "Miércoles", "Domingo","Viernes", "Miercoles", "Sabado"};
        String[] sucursales = {"Escazu", "Lindora", "Cartago", "Tres Rios", "Leon XIII", "Desamparados","Desamparados"};

        ArrayList<Course> courseArrayList = new ArrayList<>();

        for(int i = 0;i<tipos.length;i++){
            Course course = new Course(tipos[i],sucursales[i],dias[i],horas_inicio[i], horas_final[i]);
            courseArrayList.add(course);
        }

        CourseListAdapter listAdapter = new CourseListAdapter(CourseListActivity.this, courseArrayList);
        binding.listview.setAdapter(listAdapter);
        binding.listview.setClickable(true);
        binding.listview.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent i = new Intent(CourseListActivity.this, CourseActivity.class);
                i.putExtra("tipo", tipos[position]);
                i.putExtra("sucursal", sucursales[position]);
                i.putExtra("dia", dias[position]);
                i.putExtra("hora inicio", horas_inicio[position]);
                i.putExtra("hora final", horas_final[position]);

                startActivity(i);
            }
        });
    }
}
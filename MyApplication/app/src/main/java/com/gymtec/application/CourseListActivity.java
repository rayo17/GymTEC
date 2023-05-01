package com.gymtec.application;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.database.Cursor;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;

import com.gymtec.application.database.Sqlite;
import com.gymtec.application.databinding.ActivityCourseListBinding;

import java.util.ArrayList;

public class CourseListActivity extends AppCompatActivity {

    ActivityCourseListBinding binding;
    Sqlite databaseHelper;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityCourseListBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        databaseHelper = new Sqlite(getApplicationContext());
        Bundle extras = getIntent().getExtras();

        ArrayList<Course> courseArrayList = new ArrayList<>();
        Cursor clases_filtradas = databaseHelper.getClass(
                extras.getString("filtro_sucursal"),
                extras.getString("filtro_tipo"),
                extras.getString("filtro_dia_inicio"),
                extras.getString("filtro_hora_inicio"),
                extras.getString("filtro_dia_final"),
                extras.getString("filtro_hora_final"));
        int cantidad_clases = clases_filtradas.getCount();
        Log.d("Cantidad de clases obtenidas", String.valueOf(cantidad_clases));
        if(clases_filtradas.moveToFirst()){
            for(int i = 0;i<cantidad_clases;i++){
                Course course = new Course(
                        clases_filtradas.getString(0),
                        clases_filtradas.getString(1),
                        clases_filtradas.getString(2),
                        clases_filtradas.getString(3),
                        clases_filtradas.getString(4),
                        clases_filtradas.getString(5),
                        clases_filtradas.getString(6),
                        clases_filtradas.getString(7)
                );
                courseArrayList.add(course);
                clases_filtradas.moveToNext();
            }
        }



        CourseListAdapter listAdapter = new CourseListAdapter(CourseListActivity.this, courseArrayList);
        binding.listview.setAdapter(listAdapter);
        binding.listview.setClickable(true);
        binding.listview.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent i = new Intent(CourseListActivity.this, CourseActivity.class);
                i.putExtra("tipo", courseArrayList.get(position).tipo);
                i.putExtra("sucursal", courseArrayList.get(position).sucursal);
                i.putExtra("dia", courseArrayList.get(position).dia);
                i.putExtra("hora inicio", courseArrayList.get(position).hora_inicio);
                i.putExtra("hora final", courseArrayList.get(position).hora_final);
                i.putExtra("instructor", courseArrayList.get(position).instructor);
                i.putExtra("capacidad", courseArrayList.get(position).capacidad);
                i.putExtra("identificador", courseArrayList.get(position).identificador);
                startActivity(i);
            }
        });
    }
}
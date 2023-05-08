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
import java.util.LinkedHashMap;

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
        Cursor clases_a_mostrar = null;
        int cantidad_clases = 0;
        if(extras.getString("flag").equals("search")){
            clases_a_mostrar = databaseHelper.getClass(
                    extras.getString("filtro_sucursal"),
                    extras.getString("filtro_tipo"),
                    extras.getString("filtro_dia_inicio"),
                    extras.getString("filtro_hora_inicio"),
                    extras.getString("filtro_dia_final"),
                    extras.getString("filtro_hora_final"));
            cantidad_clases = clases_a_mostrar.getCount();

        }
        if(extras.getString("flag").equals("view")){

            clases_a_mostrar = databaseHelper.getClass_cliente();

            cantidad_clases = clases_a_mostrar.getCount();
        }


        assert clases_a_mostrar != null;
        if(clases_a_mostrar.moveToFirst()){
            for(int i = 0;i<cantidad_clases;i++){
                Course course = new Course(
                        clases_a_mostrar.getString(0),
                        clases_a_mostrar.getString(1),
                        clases_a_mostrar.getString(3),
                        clases_a_mostrar.getString(4),
                        clases_a_mostrar.getString(5),
                        clases_a_mostrar.getString(6),
                        clases_a_mostrar.getString(7),
                        clases_a_mostrar.getString(8)

                );
                if (extras.getString("flag").equals("view")){
                    course.setSucursal(" ");
                }
                courseArrayList.add(course);
                clases_a_mostrar.moveToNext();
            }
        }




        CourseListAdapter listAdapter = new CourseListAdapter(CourseListActivity.this, courseArrayList);
        binding.listview.setAdapter(listAdapter);
        binding.listview.setClickable(true);
        if(extras.getString("flag").equals("search")){
            binding.listview.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    Intent i = new Intent(CourseListActivity.this, CourseActivity.class);
                    i.putExtra("tipo", courseArrayList.get(position).tipo);
                    if(extras.getString("flag").equals("view")){
                        i.putExtra("sucursal"," ");
                    } else{
                        i.putExtra("sucursal", courseArrayList.get(position).sucursal);
                    }

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
}
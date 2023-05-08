package com.gymtec.application;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.ArrayList;

public class CourseListAdapter extends ArrayAdapter<Course> {
    public CourseListAdapter(Context context, ArrayList<Course> courseArrayList){
        super(context, R.layout.courses_list_item, courseArrayList);

    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {

        Course course = getItem(position);

        if(convertView == null){
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.courses_list_item, parent, false);
        }

        TextView tipo = convertView.findViewById(R.id.tipo_lista);
        TextView sucursal = convertView.findViewById(R.id.sucursal_lista);
        TextView hora_inicio = convertView.findViewById(R.id.horario_inicio_lista);
        TextView hora_final = convertView.findViewById(R.id.horario_final_lista);
        TextView dia = convertView.findViewById(R.id.dia_lista);


        tipo.setText(course.tipo);
        sucursal.setText(course.sucursal);
        hora_inicio.setText(course.hora_inicio);
        hora_final.setText(course.hora_final);
        dia.setText(course.dia);

        return convertView;
    }
}

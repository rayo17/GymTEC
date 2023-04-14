package com.gymtec.application;

import android.app.Dialog;
import android.app.TimePickerDialog;
import android.os.Bundle;
import android.text.format.DateFormat;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.TimePicker;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.DialogFragment;

import java.util.Calendar;

public class Busqueda_clases extends AppCompatActivity implements View.OnClickListener, TimePickerDialog.OnTimeSetListener {
    private TimePickerFragment timePicker;
    private TextView hora_inicio_tv;
    private TextView hora_final_tv;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_busqueda_clases);


        hora_inicio_tv = findViewById(R.id.hora_inicio_filter);
        hora_final_tv = findViewById(R.id.hora_final_filter);

        Button start_hour_selector = findViewById(R.id.hora_inicio_btn);
        Button end_hour_selector = findViewById(R.id.hora_final_btn);

        timePicker = new TimePickerFragment();

        start_hour_selector.setOnClickListener(this);
        end_hour_selector.setOnClickListener(this);
    }


    @Override
    public void onClick(View view){
        int id = view.getId();
        if(id == R.id.hora_inicio_btn){
            timePicker.setFlag(TimePickerFragment.FLAG_START_HOUR);
            timePicker.show(getSupportFragmentManager(), "Hora inicial");
        } else if(id == R.id.hora_final_btn){
            timePicker.setFlag(TimePickerFragment.FLAG_END_HOUR);
            timePicker.show(getSupportFragmentManager(), "Hora límite");


        }
    }

    @Override
    public void onTimeSet(TimePicker view, int hourOfDay, int minute) {

        //hora y minutos obtenidos
        String hora = String.valueOf(hourOfDay);
        String minuto = String.valueOf(minute);
        String hora_minutos = hora + ":" + minuto;

        if (timePicker.flag == timePicker.FLAG_START_HOUR) {
            hora_inicio_tv.setText(hora_minutos);
        }
        else if (timePicker.flag == timePicker.FLAG_END_HOUR) {
            hora_final_tv.setText(hora_minutos);
        }
    }
}
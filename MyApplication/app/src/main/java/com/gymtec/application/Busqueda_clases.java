package com.gymtec.application;

import android.app.Dialog;
import android.app.TimePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.text.format.DateFormat;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.PopupMenu;
import android.widget.TextView;
import android.widget.TimePicker;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.DialogFragment;

import java.util.Calendar;

public class Busqueda_clases extends AppCompatActivity implements View.OnClickListener, TimePickerDialog.OnTimeSetListener {
    String[] sucursales = {"Escazu", "Lindora", "Cartago", "Tres Rios"};
    String[] tipos_clase = {"Zumba", "Natacion", "Boxeo"};

    String[] dias_semana = {"Lunes", "Martes", "Miercoles", "Jueves", "Viernes","Sabado","Domingo"};

    private TimePickerFragment timePicker;
    private TextView hora_inicio_tv;
    private TextView hora_final_tv;

    private Button tipo_btn;
    private Button sucursal_btn;
    private Button dia_inicio_btn;
    private Button dia_final_btn;
    private Button buscar_btn;

    private TextView sucursal_txt;
    private TextView tipo_txt;
    private TextView dia_inicio_text;
    private TextView hora_inicio_text;
    private TextView dia_final_text;
    private TextView hora_final_text;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_busqueda_clases);




        Button start_hour_selector = (Button) findViewById(R.id.hora_inicio_btn);
        Button end_hour_selector = (Button) findViewById(R.id.hora_final_btn);
        tipo_btn = (Button) findViewById(R.id.tipo_clase_btn);
        sucursal_btn = (Button) findViewById(R.id.sucursal_btn);
        dia_inicio_btn = (Button) findViewById(R.id.periodo_inicio_btn);
        dia_final_btn = (Button) findViewById(R.id.periodo_final_btn);
        buscar_btn = (Button) findViewById(R.id.Buscar_btn);

        sucursal_txt = (TextView) findViewById(R.id.sucursal_filter);
        tipo_txt = (TextView) findViewById(R.id.tipo_clase_filter);
        dia_inicio_text = (TextView) findViewById(R.id.periodo_inicio_filter);
        hora_inicio_tv = (TextView) findViewById(R.id.hora_inicio_filter);
        dia_final_text  = (TextView) findViewById(R.id.periodo_final_filter);
        hora_final_tv = (TextView) findViewById(R.id.hora_final_filter);

        //timepicker
        timePicker = new TimePickerFragment();

        start_hour_selector.setOnClickListener(this);
        end_hour_selector.setOnClickListener(this);

        tipo_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                buttonTipoPopuMenu_onClick(v);
            }
        });

        sucursal_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                buttonSucursalPopupMenu_onClick(v);
            }
        });

        dia_inicio_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                buttonDiaInicialPopupMenu_onClick(v);
            }
        });
        dia_final_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                buttonDiaFinalPopupMenu_onClick(v);
            }
        });

        buscar_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent view_clases = new Intent(Busqueda_clases.this, CourseListActivity.class);
                startActivity(view_clases);
                finish();
            }
        });
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
    /**
     *
     * Abre popup menu para ver las sucursales disponibles
     * @param view
     */
    private void buttonSucursalPopupMenu_onClick(View view){
        PopupMenu popupMenu = new PopupMenu(Busqueda_clases.this, tipo_btn);

        for(int i = 0; i< sucursales.length;i++){
            popupMenu.getMenu().add(i, i+1, i, sucursales[i]);
        }

        popupMenu.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
            @Override
            public boolean onMenuItemClick(MenuItem item) {
                sucursal_txt.setText(item.getTitle());
                return false;
            }
        });
        popupMenu.show();

    }

    /**
     * Abre popup menu para ver los tipos de clase disponible
     * @param view
     */
    private void buttonTipoPopuMenu_onClick(View view){
        PopupMenu popupMenu = new PopupMenu(Busqueda_clases.this, tipo_btn);

        for(int i = 0; i< tipos_clase.length;i++){
            popupMenu.getMenu().add(i, i+1, i, tipos_clase[i]);
        }

        popupMenu.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
            @Override
            public boolean onMenuItemClick(MenuItem item) {
                tipo_txt.setText(item.getTitle());
                return false;
            }
        });
        popupMenu.show();
    }

    private void buttonDiaInicialPopupMenu_onClick(View view){
        PopupMenu popupMenu = new PopupMenu(Busqueda_clases.this, tipo_btn);

        for(int i = 0; i< dias_semana.length;i++){
            popupMenu.getMenu().add(i, i+1, i, dias_semana[i]);
        }

        popupMenu.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
            @Override
            public boolean onMenuItemClick(MenuItem item) {
                dia_inicio_text.setText(item.getTitle());
                return false;
            }
        });
        popupMenu.show();
    }

    private void buttonDiaFinalPopupMenu_onClick(View view){
        PopupMenu popupMenu = new PopupMenu(Busqueda_clases.this, tipo_btn);

        for(int i = 0; i< dias_semana.length;i++){
            popupMenu.getMenu().add(i, i+1, i, dias_semana[i]);
        }

        popupMenu.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
            @Override
            public boolean onMenuItemClick(MenuItem item) {
                dia_final_text.setText(item.getTitle());
                return false;
            }
        });
        popupMenu.show();

    }
}
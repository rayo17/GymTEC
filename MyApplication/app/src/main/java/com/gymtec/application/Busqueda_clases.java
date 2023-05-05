package com.gymtec.application;

import android.app.Dialog;
import android.app.TimePickerDialog;
import android.content.Intent;
import android.database.Cursor;
import android.os.Bundle;
import android.text.format.DateFormat;
import android.util.Log;
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

import com.gymtec.application.database.Sqlite;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;
import android.os.StrictMode;


public class Busqueda_clases extends AppCompatActivity implements View.OnClickListener, TimePickerDialog.OnTimeSetListener {

    //Arrays de datos parametros de filtrado
    String[] sucursales;
    String[][] tipos_clase;
    String[] dias_semana = {"Lunes", "Martes", "Miércoles", "Jueves", "Viernes","Sábado","Domingo"};
    HashMap<String, Integer> dias_dictionary = new HashMap<>();


    HashMap<String, Integer> tipo_clase_dictionary = new HashMap<>();
    Sqlite databaseHelper;
    //Declaracion de parametros de elementos del view
    private TimePickerFragment timePicker;
    private TextView hora_inicio_tv;
    private TextView hora_final_tv;

    private Button tipo_btn;

    private TextView sucursal_txt;
    private TextView tipo_txt;
    private TextView dia_inicio_text;
    private TextView dia_final_text;


    private int selected_type_id;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_busqueda_clases);
        if (android.os.Build.VERSION.SDK_INT > 9) { StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build(); StrictMode.setThreadPolicy(policy); }
        //Setting dictionary keys and values for days of the week
        dias_dictionary.put("Lunes",1);
        dias_dictionary.put("Martes",2);
        dias_dictionary.put("Miércoles",3);
        dias_dictionary.put("Jueves",4);
        dias_dictionary.put("Viernes",5);
        dias_dictionary.put("Sábado",6);
        dias_dictionary.put("Domingo",7);

        databaseHelper = new Sqlite(getApplicationContext());

        //sucursales population
        Cursor cursor_sucursales = databaseHelper.getSucursal();
        cursor_sucursales.moveToFirst();
        int cantidad_sucursales = cursor_sucursales.getCount();
        Log.d("Sucursales", String.valueOf(cantidad_sucursales));
        sucursales = new String[cantidad_sucursales];

        for(int i = 0; i<cantidad_sucursales; i++){
            sucursales[i] = cursor_sucursales.getString(0);
            cursor_sucursales.moveToNext();
        }

        //tipo population
        Cursor cursor_tipos = databaseHelper.getTipo();
        cursor_tipos.moveToFirst();
        int cantidad_tipos = cursor_tipos.getCount();
        Log.d("Tipos", String.valueOf(cantidad_tipos));
        tipos_clase = new String[cantidad_tipos][2];

        for(int i = 0; i<cantidad_tipos; i++){
            tipos_clase[i][0] = cursor_tipos.getString(0);
            tipos_clase[i][1] = cursor_tipos.getString(1);
            tipo_clase_dictionary.put(tipos_clase[i][1], Integer.valueOf(tipos_clase[i][0]));
            cursor_tipos.moveToNext();
        }

        //View elements binding
        Button start_hour_selector = (Button) findViewById(R.id.hora_inicio_btn);
        Button end_hour_selector = (Button) findViewById(R.id.hora_final_btn);
        tipo_btn = (Button) findViewById(R.id.tipo_clase_btn);
        Button sucursal_btn = (Button) findViewById(R.id.sucursal_btn);
        Button dia_inicio_btn = (Button) findViewById(R.id.periodo_inicio_btn);
        Button dia_final_btn = (Button) findViewById(R.id.periodo_final_btn);
        Button buscar_btn = (Button) findViewById(R.id.Buscar_btn);

        sucursal_txt = (TextView) findViewById(R.id.sucursal_filter);
        tipo_txt = (TextView) findViewById(R.id.tipo_clase_filter);
        dia_inicio_text = (TextView) findViewById(R.id.periodo_inicio_filter);
        hora_inicio_tv = (TextView) findViewById(R.id.hora_inicio_filter);
        dia_final_text  = (TextView) findViewById(R.id.periodo_final_filter);
        hora_final_tv = (TextView) findViewById(R.id.hora_final_filter);

        //timepicker
        timePicker = new TimePickerFragment();

        //Hour selector click listener setting
        start_hour_selector.setOnClickListener(this);
        end_hour_selector.setOnClickListener(this);

        //type (tipo) selection button click listener setting
        tipo_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                buttonTipoPopuMenu_onClick(v);
            }
        });

        //branch (sucursal) selection button click listener setting
        sucursal_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                buttonSucursalPopupMenu_onClick(v);
            }
        });

        //start day selection button click listener setting
        dia_inicio_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                buttonDiaInicialPopupMenu_onClick(v);
            }
        });

        //end day selection button click listener setting
        dia_final_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                buttonDiaFinalPopupMenu_onClick(v);
            }
        });

        //Search button click listener setting
        buscar_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent view_clases = new Intent(Busqueda_clases.this, CourseListActivity.class);

                //6 filters according to the design
                int num_filtros = 6;
                //positions mean filtro_sucursal, filtro_tipo, filtro_dia_inicio, filtro_hora_inicio, filtro_dia_final, filtro_hora_final
                String[] filtros= new String[num_filtros];

                //column names to make a null filter
                String[] nombre_columnas = {"Sucursal", "Tipo", "'1'", "Hora_inicio", "'7'", "Hora_fin"};

                //text values of the TextViews
                String[] textvalues = new String[num_filtros];
                textvalues[0] = (String) sucursal_txt.getText();
                textvalues[1] = (String) tipo_txt.getText();
                textvalues[2] = (String) dia_inicio_text.getText();
                textvalues[3] = (String) hora_inicio_tv.getText();
                textvalues[4] = (String) dia_final_text.getText();
                textvalues[5] = (String) hora_final_tv.getText();

                //setting the values for the filters
                for(int i = 0;i<num_filtros;i++){
                    //if there was no filter selected for the parameter
                    if (textvalues[i].equals(getResources().getString(R.string.No_filter))){
                        filtros[i] = nombre_columnas[i];
                    } else {
                        //if the filter is the tipo, search for its equivalent int in the dictionary
                        if(i == 1){
                            filtros[i] = "'"+tipo_clase_dictionary.get(textvalues[i])+"'";
                            //add the filter in the filter

                        }
                        //if the filter is a day of the week
                        else if(i == 2 || i == 4){
                            filtros[i] = "'"+dias_dictionary.get(textvalues[i])+"'";
                        } else{
                            filtros[i] = "'"+textvalues[i]+"'";
                        }
                    }
                }

                //putting the filters in extras for the clase_view intent
                view_clases.putExtra("filtro_sucursal", filtros[0]);
                view_clases.putExtra("filtro_tipo", filtros[1]);
                view_clases.putExtra("filtro_dia_inicio", filtros[2]);
                view_clases.putExtra("filtro_hora_inicio", filtros[3]);
                view_clases.putExtra("filtro_dia_final", filtros[4]);
                view_clases.putExtra("filtro_hora_final", filtros[5]);
                view_clases.putExtra("flag", "search");
                startActivity(view_clases);
            }
        });
    }


    //Override of oneclick for time selector buttons
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

    /**
     * what happens after setting the time in the time setter
     * @param view the view associated with this listener
     * @param hourOfDay the hour that was set
     * @param minute the minute that was set
     */
    @Override
    public void onTimeSet(TimePicker view, int hourOfDay, int minute) {

        //hora y minutos obtenidos
        String hora;
        String minuto;
        if (hourOfDay<10){
            hora = "0"+String.valueOf(hourOfDay);
        } else{
            hora = String.valueOf(hourOfDay);
        }

        if (minute<10){
            minuto = "0"+String.valueOf(minute);
        } else{
            minuto = String.valueOf(minute);
        }

        String hora_minutos = hora+":"+minuto;

        if (timePicker.flag == timePicker.FLAG_START_HOUR) {
            hora_inicio_tv.setText(hora_minutos);
        }
        else if (timePicker.flag == timePicker.FLAG_END_HOUR) {
            hora_final_tv.setText(hora_minutos);
        }
    }
    /**
     * Opens popup menu to show available branches (sucursales)
     * @param view view that calls the btn
     */
    private void buttonSucursalPopupMenu_onClick(View view){
        PopupMenu popupMenu = new PopupMenu(Busqueda_clases.this, tipo_btn);
        int i;
        for(i = 0; i< sucursales.length;i++){
            popupMenu.getMenu().add(i, i+1, i, sucursales[i]);
        }
        popupMenu.getMenu().add(i,i+1,i, R.string.No_filter);
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
     * Opens popup menu to show available courses (clases)
     * @param view
     */
    private void buttonTipoPopuMenu_onClick(View view){
        PopupMenu popupMenu = new PopupMenu(Busqueda_clases.this, tipo_btn);

        int i;
        for(i = 0; i< tipos_clase.length;i++){
            popupMenu.getMenu().add(i, i+1, i, tipos_clase[i][1]);
        }
        popupMenu.getMenu().add(i,i+1,i, R.string.No_filter);
        popupMenu.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
            @Override
            public boolean onMenuItemClick(MenuItem item) {
                tipo_txt.setText(item.getTitle());
                selected_type_id = Integer.parseInt(tipos_clase[item.getItemId()-1][0]);
                Log.d("Selected type", tipos_clase[item.getItemId()-1][0]);
                return false;
            }
        });
        popupMenu.show();
    }

    /**
     * Opens popup menu to show week days for start filtering
     * @param view
     */
    private void buttonDiaInicialPopupMenu_onClick(View view){
        PopupMenu popupMenu = new PopupMenu(Busqueda_clases.this, tipo_btn);
        int i;
        for(i = 0; i< dias_semana.length;i++){
            popupMenu.getMenu().add(i, i+1, i, dias_semana[i]);
        }
        popupMenu.getMenu().add(i,i+1,i, R.string.No_filter);
        popupMenu.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener() {
            @Override
            public boolean onMenuItemClick(MenuItem item) {
                dia_inicio_text.setText(item.getTitle());
                return false;
            }
        });
        popupMenu.show();
    }


    /**
     * Opens popup menu to show week days for end filtering
     * @param view
     */
    private void buttonDiaFinalPopupMenu_onClick(View view){
        PopupMenu popupMenu = new PopupMenu(Busqueda_clases.this, tipo_btn);

        int i;
        for(i=0; i< dias_semana.length;i++){
            popupMenu.getMenu().add(i, i+1, i, dias_semana[i]);
        }
        popupMenu.getMenu().add(i,i+1,i, R.string.No_filter);

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
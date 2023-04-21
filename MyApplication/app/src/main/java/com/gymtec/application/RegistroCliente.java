package com.gymtec.application;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.DialogFragment;

import android.app.DatePickerDialog;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.TextView;

import java.text.DateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.util.Calendar;

public class RegistroCliente extends AppCompatActivity implements DatePickerDialog.OnDateSetListener {

    //Text Boxes
    EditText name_edittext;
    EditText lname_edittext;
    EditText id_edittext;
    EditText age_edittext;
    TextView fecha_edittext;
    EditText province_edittext;
    EditText canton_edittext;
    EditText district_edittext;
    EditText email_edittext;
    EditText weight_edittext;
    EditText imc_edittext;
    EditText password_edittext;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        Bundle extras = getIntent().getExtras();
        setContentView(R.layout.registro_cliente);

        //referencing UI
        fecha_edittext= (TextView) findViewById(R.id.user_date_text);
        age_edittext = (EditText) findViewById(R.id.user_Edad_edittext);
        name_edittext = (EditText) findViewById(R.id.user_Name_edittext);
        lname_edittext = (EditText) findViewById(R.id.user_Apellidos_edittext);
        id_edittext = (EditText) findViewById(R.id.user_Cedula_edittext);
        canton_edittext = (EditText) findViewById(R.id.user_canton_edittext);
        province_edittext = (EditText) findViewById(R.id.user_provincia_edittext);
        canton_edittext = (EditText) findViewById(R.id.user_canton_edittext);
        district_edittext = (EditText) findViewById(R.id.user_distrito_edittext);
        email_edittext = (EditText) findViewById(R.id.user_email_edittext);
        weight_edittext = (EditText) findViewById(R.id.user_weight_edittext);
        imc_edittext = (EditText) findViewById(R.id.user_imc_edittext);
        password_edittext = (EditText) findViewById(R.id.user_passwordregistry_edittext);

        //Boton de registro
        Button completar_registro_btn = (Button) findViewById(R.id.user_Fecha_nacimiento_btn);
        if(extras != null){
            String cedula = extras.getString("cedula_input");
            String selected_password = extras.getString("password_input");
            id_edittext.setText(cedula);
            password_edittext.setText(selected_password);
        }

        completar_registro_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                DialogFragment datePicker = new DatePickerFragment();
                datePicker.show(getSupportFragmentManager(), "Seleccione Fecha de Nacimiento");
            }
        });
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onDateSet(DatePicker datePicker, int year, int month, int day) {
        Calendar c =  Calendar.getInstance();
        c.set(Calendar.YEAR, year);
        c.set(Calendar.MONTH, month);
        c.set(Calendar.DAY_OF_MONTH, day);
        String currentDateString = DateFormat.getDateInstance(DateFormat.FULL).format(c.getTime());


        fecha_edittext.setText(currentDateString);

        String curr_age = "";
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            curr_age = String.valueOf(Period.between(LocalDate.of(year, month, day), LocalDate.now()).getYears());
        }


        age_edittext.setText(curr_age);
        age_edittext.setEnabled(false);
    }

}
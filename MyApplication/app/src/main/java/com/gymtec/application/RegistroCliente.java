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

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.registro_cliente);

        Button button = (Button) findViewById(R.id.user_Fecha_nacimiento_btn);
        button.setOnClickListener(new View.OnClickListener() {
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

        TextView textView = (TextView) findViewById(R.id.user_date_text);
        textView.setText(currentDateString);

        String curr_age = "";
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            curr_age = String.valueOf(Period.between(LocalDate.of(year, month, day), LocalDate.now()).getYears());
        }

        EditText editText_age = (EditText) findViewById(R.id.user_Edad_edittext);
        editText_age.setText(curr_age);
        editText_age.setEnabled(false);
    }

}
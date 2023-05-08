package com.gymtec.application;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.DialogFragment;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.gymtec.application.database.Sqlite;
import com.gymtec.application.maindb_access.models.Cliente;
import com.gymtec.application.maindb_access.models.Methods;
import com.gymtec.application.maindb_access.models.RemoteDBsendGet;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.util.Calendar;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegistroClienteActivity extends AppCompatActivity implements DatePickerDialog.OnDateSetListener {

    RemoteDBsendGet remotedb;
    Sqlite databaseHelper;
    //Text Boxes
    EditText name_edittext;

    EditText snd_name_edittext;
    EditText lname_edittext;
    EditText lname2_edittext;
    TextView id_edittext;
    EditText age_edittext;
    TextView fecha_edittext;
    EditText province_edittext;
    EditText canton_edittext;
    EditText district_edittext;
    EditText email_edittext;
    EditText weight_edittext;
    EditText imc_edittext;
    EditText password_edittext;

    String fecha_numerica = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        Bundle extras = getIntent().getExtras();
        setContentView(R.layout.registro_cliente);

        remotedb = new RemoteDBsendGet();
        databaseHelper=new Sqlite(getApplicationContext());
        //referencing UI
        fecha_edittext= (TextView) findViewById(R.id.user_date_text);
        age_edittext = (EditText) findViewById(R.id.user_Edad_edittext);
        name_edittext = (EditText) findViewById(R.id.user_Name_edittext);
        lname_edittext = (EditText) findViewById(R.id.user_Apellido1_edittext);
        id_edittext = (TextView) findViewById(R.id.user_Cedula_edittext);
        canton_edittext = (EditText) findViewById(R.id.user_canton_edittext);
        province_edittext = (EditText) findViewById(R.id.user_provincia_edittext);
        canton_edittext = (EditText) findViewById(R.id.user_canton_edittext);
        district_edittext = (EditText) findViewById(R.id.user_distrito_edittext);
        email_edittext = (EditText) findViewById(R.id.user_email_edittext);
        weight_edittext = (EditText) findViewById(R.id.user_weight_edittext);
        imc_edittext = (EditText) findViewById(R.id.user_imc_edittext);
        password_edittext = (EditText) findViewById(R.id.user_passwordregistry_edittext);
        snd_name_edittext = (EditText) findViewById(R.id.user_2ndName_edittext);
        lname2_edittext = (EditText) findViewById(R.id.user_Apellido2_edittext);
        //Boton de seleccion de fecha
        Button seleccionarfecha_btn = (Button) findViewById(R.id.user_Fecha_nacimiento_btn);

        //Boton de registro
        Button registrarse_btn = (Button) findViewById(R.id.user_registrarse_btn);
        if(extras != null){
            String cedula = extras.getString("cedula_input");
            String selected_password = extras.getString("password_input");
            id_edittext.setText(cedula);
            password_edittext.setText(selected_password);
        }


        //Click listener que abre datePicker
        seleccionarfecha_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                DialogFragment datePicker = new DatePickerFragment();
                datePicker.show(getSupportFragmentManager(), "Seleccione Fecha de Nacimiento");
            }
        });

        //Click listener de boton de registro
        registrarse_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String id = String.valueOf(id_edittext.getText());
                String username = String.valueOf(name_edittext.getText());
                String snd_name = String.valueOf(snd_name_edittext.getText());
                String apellido1 = String.valueOf(lname_edittext.getText());
                String apellido2 = String.valueOf(lname2_edittext.getText());
                String correo_e = String.valueOf(email_edittext.getText());
                String distrito = String.valueOf(district_edittext.getText());
                String canton = String.valueOf(canton_edittext.getText());
                String provincia = String.valueOf(province_edittext.getText());
                String pwd = String.valueOf(password_edittext.getText());
                String bdate = String.valueOf(fecha_edittext.getText());
                String weight = String.valueOf(weight_edittext.getText());
                String imc = String.valueOf(imc_edittext.getText());

                if(id.equals("")
                        ||username.equals("")
                        ||apellido1.equals("")
                        ||correo_e.equals("")
                        ||distrito.equals("")
                        ||canton.equals("")
                        ||provincia.equals("")
                        ||pwd.equals("")
                        ||bdate.equals("")
                        ||weight.equals("")
                        ||imc.equals("")
                ){
                    Toast.makeText(RegistroClienteActivity.this, "Rellene todos los campos que tienen un *", Toast.LENGTH_LONG).show();
                } else {
                    Methods methods = RemoteDBsendGet.getRetrofitInstance().create(Methods.class);
                    Call<Cliente> call = methods.getUserData(new Cliente(id,username,snd_name,apellido1,apellido2,correo_e,distrito,canton,provincia,pwd,bdate,weight,imc));
                    call.enqueue(new Callback<Cliente>() {
                        @Override
                        public void onResponse(Call<Cliente> call, Response<Cliente> response) {
                            if(response.isSuccessful()){
                                databaseHelper.empty_Clients();
                                databaseHelper.addNewCliente(
                                        id, username,snd_name,apellido1,apellido2,correo_e,distrito,canton,provincia,
                                        pwd, bdate, weight, imc);
                                Toast.makeText(RegistroClienteActivity.this,"Cliente registrado con éxito",Toast.LENGTH_LONG).show();
                                Intent home = new Intent(getApplicationContext(), MainActivity.class);
                                finishAffinity();
                                startActivity(home);
                                finish();
                            } else {
                                String response_code = null;
                                try {
                                    response_code = response.errorBody().string();
                                } catch (IOException e) {
                                    throw new RuntimeException(e);
                                }
                                Log.d("Error 4000",response_code);
                                Toast.makeText(getApplicationContext(),response_code , Toast.LENGTH_LONG).show();


                            }


                        }

                        @Override
                        public void onFailure(Call<Cliente> call, Throwable t) {
                            String error= t.toString();
                            Log.d("ERROR REGISTERING CLIENT",error);
                            Toast.makeText(RegistroClienteActivity.this,"Error",Toast.LENGTH_LONG).show();

                        }
                    });

                }


            }
        });
    }

    //Metodo para seleccion de fecha
    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onDateSet(DatePicker datePicker, int year, int month, int day) {
        Calendar c =  Calendar.getInstance();
        c.set(Calendar.YEAR, year);
        c.set(Calendar.MONTH, month);
        c.set(Calendar.DAY_OF_MONTH, day);

        SimpleDateFormat SDFormat = new SimpleDateFormat("yyyy-MM-dd");
        fecha_numerica = String.valueOf(year)+String.valueOf(month)+String.valueOf(day);
        String currentDateString = SDFormat.format(c.getTime());


        fecha_edittext.setText(currentDateString);

        String curr_age = "";
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            curr_age = String.valueOf(Period.between(LocalDate.of(year, month, day), LocalDate.now()).getYears());
        }


        age_edittext.setText(curr_age);
        age_edittext.setEnabled(false);
    }



}
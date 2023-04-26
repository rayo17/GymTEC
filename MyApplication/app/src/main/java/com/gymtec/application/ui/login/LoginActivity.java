package com.gymtec.application.ui.login;

import androidx.appcompat.app.AppCompatActivity;
import com.gymtec.application.database.Sqlite;

import android.content.Intent;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.gymtec.application.R;
import com.gymtec.application.RegistroCliente;

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.login_activity);

        //Autenticador
        UserAuthentication authenticator = new UserAuthentication(this);

        //Caja de texto para cedula
        EditText cedula_editText = (EditText) findViewById(R.id.cedula_login_inpt);

        //Caja de texto para contrasena
        EditText password_editText = (EditText) findViewById(R.id.password_login_inpt);

        //Boton de Login
        Button login_register_btn = (Button) findViewById(R.id.login_register_btn);


        //database.addNewCliente("604740574","Daniel","Andres","Rayo", "Diaz","drayo.dard.16@gmail.com", "Chacarita", "Puntarenas", "Puntarenas", "1234567" ,"16-08-2002", "70", "15");


        login_register_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String cedula_input = String.valueOf(cedula_editText.getText());
                String password_input = String.valueOf(password_editText.getText());
                 Sqlite database=new Sqlite(getApplicationContext());
                 SQLiteDatabase data=database.getWritableDatabase();
                //database.getCliente(cedula_input, password_input);
                Log.d("Mensaje_prueba","se esta ejecutando el onclick");
                //database.addNewCliente("604740574","Daniel","Andres","Rayo", "Diaz","drayo.dard.16@gmail.com", "Chacarita", "Puntarenas", "Puntarenas", "1234567" ,"16-08-2002", "70", "15");


                if (cedula_input.length()<9){
                    Toast invalid_user = Toast.makeText(getApplicationContext(), R.string.invalid_id, Toast.LENGTH_LONG);
                    invalid_user.show();
                }
              /* else if(database.getCliente(cedula_input, password_input)!=null){
                    Toast invalid_user = Toast.makeText(getApplicationContext(),R.string.welcome , Toast.LENGTH_LONG);

                  */
                else if(authenticator.user_exists(cedula_input)){
                    Toast invalid_user = Toast.makeText(getApplicationContext(),R.string.welcome , Toast.LENGTH_LONG);
                    invalid_user.show();
                }
                else {
                    finish();
                    Intent open_register = new Intent(getApplicationContext(), RegistroCliente.class);
                    open_register.putExtra("cedula_input", cedula_input);
                    open_register.putExtra("password_input", password_input);
                    startActivity(open_register);
                }

            }
        });

    }
}
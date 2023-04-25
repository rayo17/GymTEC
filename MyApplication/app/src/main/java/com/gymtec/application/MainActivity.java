package com.gymtec.application;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.gymtec.application.database.Sqlite;


import com.gymtec.application.database.Sqlite;
import com.gymtec.application.ui.login.LoginActivity;


public class MainActivity extends AppCompatActivity {
    TextView user_name_text;
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        Intent login_intent = new Intent(this, LoginActivity.class);
        Bundle extras = getIntent().getExtras();



        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        user_name_text = (TextView) findViewById(R.id.user_name_show_text);
        Button personal_info = (Button) findViewById(R.id.personal_info_btn);
        Button buscar_clases_btn = (Button) findViewById(R.id.buscar_clases_btn);
        Button mic_clases_btn = (Button) findViewById(R.id.ver_clases_btn);
        Sqlite database= new Sqlite(this);
        //System.out.println("conexion de la base de datos");
        Toast.makeText(this,"conexcion de la base de datos",Toast.LENGTH_SHORT).show();

        //login_or_not
        if (extras==null){
            startActivity(login_intent);
            finish();
        }
        else{
            String username = extras.getString("Username");
            user_name_text.setText(username);
        }
        buscar_clases_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent buscar_clases = new Intent(getApplicationContext(),  Busqueda_clases.class);
                startActivity(buscar_clases);
            }
        });
    }
}
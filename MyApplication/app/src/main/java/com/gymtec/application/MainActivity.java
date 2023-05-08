package com.gymtec.application;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.os.StrictMode;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.gymtec.application.database.Sqlite;


import com.gymtec.application.database.Sqlite;
import com.gymtec.application.maindb_access.models.RemoteDBsendGet;
import com.gymtec.application.ui.login.LoginActivity;

import org.json.JSONArray;


public class MainActivity extends AppCompatActivity {
    TextView user_name_text;
    Sqlite databaseHelper;

    RemoteDBsendGet remotedb;
    @SuppressLint("SetTextI18n")
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        Intent login_intent = new Intent(this, LoginActivity.class);
        Bundle extras = getIntent().getExtras();
        databaseHelper = new Sqlite(getApplicationContext());
        remotedb = new RemoteDBsendGet();

        RemoteDBsendGet.setBASEURL(getResources().getString(R.string.api_url));
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        if (android.os.Build.VERSION.SDK_INT > 9) { StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build(); StrictMode.setThreadPolicy(policy); }


        user_name_text = (TextView) findViewById(R.id.user_name_show_text);
        Button personal_info = (Button) findViewById(R.id.personal_info_btn);
        Button buscar_clases_btn = (Button) findViewById(R.id.buscar_clases_btn);
        Button mis_clases_btn = (Button) findViewById(R.id.ver_clases_btn);

        Cursor cliente = databaseHelper.getCliente();

        if (!cliente.moveToFirst()){
            startActivity(login_intent);
            finish();
        }
        else{

            String username = cliente.getString(1);
            String lastname = cliente.getString(3);
            user_name_text.setText(username+" "+lastname);
        }
        buscar_clases_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                Intent buscar_clases = new Intent(getApplicationContext(),  Busqueda_clases.class);
                startActivity(buscar_clases);
            }
         });

        personal_info.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent persona_info = new Intent(getApplicationContext(), UserinfoActivity.class);
                startActivity(persona_info);
            }
        });

        mis_clases_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                try {
                    String url = getResources().getString(R.string.api_url)+getResources().getString(R.string.getClaseCliente)+"/"+ cliente.getString(0);
                    Log.d("REQUEST URL", url);
                    String jsonString_clases_cliente = remotedb.sendGet(url);
                    Log.d("Clases Obtenidas del usuario",jsonString_clases_cliente);
                    JSONArray json_clases = new JSONArray(jsonString_clases_cliente);
                    databaseHelper.empty_Clase_clientes();
                    databaseHelper.add_cliente_clases_from_json(json_clases);
                    Intent mis_clases_display = new Intent(getApplicationContext(), CourseListActivity.class);
                    mis_clases_display.putExtra("flag", "view");
                    startActivity(mis_clases_display);
                } catch (Exception e) {
                    Log.d("Error getting clases", e.toString());
                    Toast.makeText(getApplicationContext(), "Mostrando Resultados locales", Toast.LENGTH_LONG).show();
                    Intent mis_clases_display = new Intent(getApplicationContext(), CourseListActivity.class);
                    mis_clases_display.putExtra("flag", "view");
                    startActivity(mis_clases_display);
                }
            }
        });
}
}
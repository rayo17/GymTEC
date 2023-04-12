package com.gymtec.application;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Intent intent = new Intent(this, RegistroCliente.class);
        startActivity(intent);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

    }
}
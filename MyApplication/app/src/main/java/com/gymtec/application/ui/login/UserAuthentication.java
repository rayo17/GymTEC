package com.gymtec.application.ui.login;

import java.util.HashMap;

import android.annotation.SuppressLint;
import android.content.Context;
import android.database.Cursor;
import android.database.DatabaseUtils;
import android.provider.ContactsContract;
import android.util.Log;
import android.widget.Toast;


import com.gymtec.application.database.Sqlite;

public class UserAuthentication {
    //User temporal db

    private final Sqlite databaseHandler;


    public UserAuthentication(Context context){
        databaseHandler=new Sqlite(context);
    }

    //
    public boolean user_exist(String user_id) {
        Cursor info = databaseHandler.getCliente(user_id);
        return info.moveToFirst();
    }


    public boolean password_correct(String user_id, String input_password){
        Cursor info = databaseHandler.getCliente(user_id,input_password);
        return info.moveToFirst();

    }
}

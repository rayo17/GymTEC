package com.gymtec.application.ui.login;

import java.util.HashMap;

import android.annotation.SuppressLint;
import android.content.Context;
import android.database.Cursor;
import android.database.DatabaseUtils;
import android.provider.ContactsContract;
import android.util.Log;
import android.widget.Toast;


import com.gymtec.application.R;
import com.gymtec.application.database.RemoteDBsendGet;
import com.gymtec.application.database.Sqlite;

public class UserAuthentication {
    //User temporal db
    RemoteDBsendGet remotedb;
    Context ctx;

    private final Sqlite databaseHandler;


    public UserAuthentication(Context context){
        this.databaseHandler=new Sqlite(context);
        this.remotedb = new RemoteDBsendGet();
        this.ctx = context;
    }

    //
    public boolean user_exist(String user_id) throws Exception {
        String url_root = this.ctx.getResources().getString(R.string.api_url);
        String request = this.ctx.getResources().getString(R.string.clientExists)+user_id;
        return this.remotedb.responseCode(url_root + request) == 200;
    }


    public boolean password_correct(String user_id, String input_password){
        Cursor info = databaseHandler.getCliente(user_id,input_password);
        return info.moveToFirst();

    }
}

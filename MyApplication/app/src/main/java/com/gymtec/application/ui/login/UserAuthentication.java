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
    private final HashMap<String, String> user_ids = new HashMap<>();
    private Sqlite database;

    public UserAuthentication(Context context){
        user_ids.put("604560524", "password");
        database=new Sqlite(context);



    }

    //
    public boolean user_exist(String user_id) {
        Cursor info = database.getCliente(user_id);
        String conversion=DatabaseUtils.dumpCursorToString(info);

        if(info.moveToFirst()){
            Log.d("cursor", DatabaseUtils.dumpCursorToString(info));
            return true;
        }
        return false;
    }

    /*
  public boolean user_exists(String user_id)
  {

      return user_ids.containsKey(user_id);
  }
  */
    @SuppressLint("Range")
    public boolean password_correct(String user_id, String input_password){
        String user_password = user_ids.get(user_id);
        Cursor info = database.getCliente(user_id);
        String infoPassword=info.getString(info.getColumnIndex("Constrasenna"));
        return (infoPassword.equals(input_password));

}
}

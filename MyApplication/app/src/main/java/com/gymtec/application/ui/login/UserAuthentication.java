package com.gymtec.application.ui.login;

import java.util.Arrays;
import java.util.Dictionary;
import java.util.HashMap;
import android.content.Context;
import java.util.Hashtable;
import com.gymtec.application.database.Sqlite;
import com.gymtec.application.MainActivity;
public class UserAuthentication {
    //User temporal db
    private final HashMap<String, String> user_ids = new HashMap<>();


    public UserAuthentication(Context context){
        //user_ids.put("604560524", "password");
        Sqlite dabase=new Sqlite(context);



    }

    public boolean user_exists(String user_id){
        return (user_ids.containsKey(user_id));
    }

    public boolean password_correct(String user_id, String input_password){
        String user_password = user_ids.get(user_id);

        if(user_password!=null)
            return (user_password.equals(input_password));
        return false;
    }
}

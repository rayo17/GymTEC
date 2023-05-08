package com.gymtec.application.ui.login;

import android.content.Context;
import android.util.Log;


import com.gymtec.application.R;
import com.gymtec.application.maindb_access.models.RemoteDBsendGet;
import com.gymtec.application.database.Sqlite;

import org.json.JSONObject;

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
        Log.d("Exists Response", String.valueOf(this.remotedb.responseCode(url_root+request)));
        return this.remotedb.responseCode(url_root + request) == 200;
    }


    public boolean password_correct(String user_id, String input_password) throws Exception {
        String url_root = this.ctx.getResources().getString(R.string.api_url);
        String request = this.ctx.getResources().getString(R.string.clientPasswordCheck)+user_id+"/"+input_password;
        if(this.remotedb.responseCode(url_root+request)==200){
            JSONObject client_data = new JSONObject(this.remotedb.sendGet(url_root+request));
            String cedula = client_data.getString("cedula");
            String p_nombre = client_data.getString("primer_nombre");
            String s_nombre = client_data.getString("segundo_nombre");
            String p_apellido = client_data.getString("primer_apellido");
            String s_apellido = client_data.getString("segundo_apellido");
            String email = client_data.getString("correo_electronico");
            String distrito = client_data.getString("distrito");
            String canton = client_data.getString("canton");
            String provincia = client_data.getString("provincia");
            String pwd = client_data.getString("contrasena");
            String bdate = client_data.getString("fecha_nacimiento");
            String peso = client_data.getString("peso");
            String imc = client_data.getString("imc");
            String jsonstring = client_data.toString();
            this.databaseHandler.addNewCliente(cedula,p_nombre,s_nombre,p_apellido,s_apellido,email,distrito,canton,provincia,pwd,bdate,peso,imc);
            Log.d("Exito", jsonstring);
            return true;

        }
        return false;
    }
}

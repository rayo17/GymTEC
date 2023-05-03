package com.gymtec.application.database;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.BindException;
import java.net.HttpURLConnection;
import java.net.URL;

public class RemoteDBsendGet {
    public String sendGet(String url) throws Exception{
        URL obj = new URL(url);
        HttpURLConnection connection = (HttpURLConnection)  obj.openConnection();

        int responseCode = connection.getResponseCode();

        BufferedReader in = new BufferedReader(
                new InputStreamReader(connection.getInputStream())
        );
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null){
            response.append(inputLine);
        }
        in.close();

        return response.toString();
    }
    public int responseCode(String url) throws Exception{
        URL obj = new URL(url);
        HttpURLConnection connection = (HttpURLConnection)  obj.openConnection();

        return connection.getResponseCode();
    }
}

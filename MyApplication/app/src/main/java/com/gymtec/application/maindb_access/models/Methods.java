package com.gymtec.application.maindb_access.models;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Headers;
import retrofit2.http.POST;

public interface Methods {


    @Headers("Content-Type: application/json")
    @POST("/api/Cliente")
    Call<Cliente> getUserData(@Body Cliente cliente);

    @Headers("Content-Type: application/json")
    @POST("/api/ClaseCliente")
    Call<Clase_cliente> getClietClaseData(@Body Clase_cliente clase_cliente);
}

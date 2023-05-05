package com.gymtec.application.maindb_access.models;

public class Clase_cliente {
    private String clase;
    private String cliente;
    private String sucursal;

    public Clase_cliente(String clase, String cliente, String sucursal) {
        this.clase = clase;
        this.cliente = cliente;
        this.sucursal = sucursal;
    }

    public String getClase() {
        return clase;
    }

    public String getCliente() {
        return cliente;
    }

    public String getSucursal() {
        return sucursal;
    }
}

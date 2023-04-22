package com.gymtec.application;

public class Course {
    /**
     * Modela una de las clases para
     */
    String tipo;
    String sucursal;
    String dia;
    String hora_inicio;
    String hora_final;

    public Course(String tipo, String sucursal, String dia, String hora_inicio, String hora_final) {
        this.tipo = tipo;
        this.sucursal = sucursal;
        this.dia = dia;
        this.hora_inicio = hora_inicio;
        this.hora_final = hora_final;
    }
}

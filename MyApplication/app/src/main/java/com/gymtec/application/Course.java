package com.gymtec.application;

public class Course {
    /**
     * Models a course (clase)
     */

    //course variable declaration
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

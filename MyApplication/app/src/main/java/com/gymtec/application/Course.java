package com.gymtec.application;

import java.util.HashMap;

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

    String instructor;

    String capacidad;

    String identificador;

    HashMap<String, String> numero_dias;

    public Course(String identificador, String capacidad, String tipo, String dia, String instructor, String hora_inicio,String hora_final, String sucursal) {
        numero_dias = new HashMap<String, String>();
        this.numero_dias.put("1","Lunes");
        this.numero_dias.put("2","Martes");
        this.numero_dias.put("3","Miércoles");
        this.numero_dias.put("4","Jueves");
        this.numero_dias.put("5","Viernes");
        this.numero_dias.put("6","Sábado");
        this.numero_dias.put("7","Domingo");
        this.tipo = tipo;
        this.sucursal = sucursal;
        this.dia = numero_dias.get(dia);
        this.hora_inicio = hora_inicio;
        this.hora_final = hora_final;
        this.instructor = instructor;
        this.capacidad = capacidad;
        this.identificador = identificador;
    }

    public void setSucursal(String sucursal) {
        this.sucursal = sucursal;
    }
}

package com.gymtec.application.maindb_access.models;

public class Cliente {
    private String cedula;
    private String primer_nombre;
    private String segundo_nombre;
    private String primer_apellido;
    private String segundo_apellido;
    private String correo_electronico;
    private String distrito;
    private String canton;
    private String provincia;
    private String contrasena;
    private String fecha_nacimiento;
    private String peso;
    private String imc;

    public Cliente(String cedula, String primer_nombre, String segundo_nombre, String primer_apellido, String segundo_apellido, String correo_electronico, String distrito, String canton, String provincia, String contrasena, String fecha_nacimiento, String peso, String imc) {
        this.cedula = cedula;
        this.primer_nombre = primer_nombre;
        this.segundo_nombre = segundo_nombre;
        this.primer_apellido = primer_apellido;
        this.segundo_apellido = segundo_apellido;
        this.correo_electronico = correo_electronico;
        this.distrito = distrito;
        this.canton = canton;
        this.provincia = provincia;
        this.contrasena = contrasena;
        this.fecha_nacimiento = fecha_nacimiento;
        this.peso = peso;
        this.imc = imc;
    }

    public String getCedula() {
        return cedula;
    }

    public String getPrimer_nombre() {
        return primer_nombre;
    }

    public String getSegundo_nombre() {
        return segundo_nombre;
    }

    public String getPrimer_apellido() {
        return primer_apellido;
    }

    public String getSegundo_apellido() {
        return segundo_apellido;
    }

    public String getCorreo_electronico() {
        return correo_electronico;
    }

    public String getDistrito() {
        return distrito;
    }

    public String getCanton() {
        return canton;
    }

    public String getProvincia() {
        return provincia;
    }

    public String getContrasena() {
        return contrasena;
    }

    public String getFecha_nacimiento() {
        return fecha_nacimiento;
    }

    public String getPeso() {
        return peso;
    }

    public String getImc() {
        return imc;
    }
}

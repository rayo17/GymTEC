﻿using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;

namespace GymTec_Api.Models;

public class Empleado
{
    [Key]
    public string Cedula { get; set; }
    public string Primer_nombre { get; set; }
    public string? Segundo_nombre { get; set; }
    public string Primer_apellido { get; set; }
    public string? Segundo_apellido { get; set; }
    public string Distrito { get; set; }
    public string Canton { get; set; }
    public string Provincia { get; set; }
    public int Salario { get; set; }
    
    public string? Sucursal { get; set; }
    
    
    public string Correo_electronico { get; set; }
    
    public string Contrasenna { get; set; }
    public int? Clases_impartidas { get; set; }
    public int Puesto { get; set; }
    public int Planilla { get; set; }
}
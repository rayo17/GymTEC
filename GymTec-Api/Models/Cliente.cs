using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymTec_Api.Models;

public class Cliente
{
    [Key]
    public string Cedula { get; set; }
    public string Primer_nombre { get; set; }
    public string? Segundo_nombre { get; set; }
    public string Primer_apellido { get; set; }
    public string? Segundo_apellido { get; set; }
    public string Correo_electronico { get; set; }
    public string Distrito { get; set; }
    public string Canton { get; set; }
    public string Provincia { get; set; }
    public string Contrasena { get; set; }
    public DateTime Fecha_nacimiento { get; set; }
    public string Peso { get; set; }
    public string Imc { get; set; }
}
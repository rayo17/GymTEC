using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;

namespace GymTec_Api.Models;

public class Empleado
{
    [Key]
    public string Cedula { get; set; }
    public string Primer_nombre { get; set; }
    public string Segundo_nombre { get; set; }
    public string Primer_apellido { get; set; }
    public string Segundo_apellido { get; set; }
    public string Distrito { get; set; }
    public string Canton { get; set; }
    public string Provincia { get; set; }
    public SqlMoney Salario { get; set; }
    public string Correo_electronico { get; set; }
    public string Contrasenna { get; set; }
}
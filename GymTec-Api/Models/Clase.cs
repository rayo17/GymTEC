using System.ComponentModel.DataAnnotations;

namespace GymTec_Api.Models;

public class Clase
{
    [Key]
    public string Identificador { get; set; }
    public string Nombre { get; set; }
    public int Capacidad { get; set; }
    public int Grupal { get; set; }
    public string Tipo { get; set; }
    public int Dia { get; set; }
    public string Instructor { get; set; }
    public string Hora_inicio { get; set; }
    public string Hora_fin { get; set; }
}
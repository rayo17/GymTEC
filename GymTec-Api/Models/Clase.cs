using System.ComponentModel.DataAnnotations;

namespace GymTec_Api.Models;

public class Clase
{
    [Key]
    public int Identificador { get; set; }

    public int Capacidad { get; set; }
    public int Grupal { get; set; }
    public int Tipo { get; set; }
    public int Dia { get; set; }
    public string Instructor { get; set; }
    public string Hora_inicio { get; set; }
    public string Hora_fin { get; set; }
}
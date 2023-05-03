using System.ComponentModel.DataAnnotations;

namespace GymTec_Api.Models;

public class Tipo_equipo
{
    [Key]
    public int? Identificador { get; set; }
    public string Descripcion { get; set; }
}
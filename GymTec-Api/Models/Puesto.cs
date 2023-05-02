using System.ComponentModel.DataAnnotations;

namespace GymTec_Api.Models;

public class Puesto
{
    [Key]
    public string Identificador { get; set; }
    public string Descripcion { get; set; }
}
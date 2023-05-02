using System.ComponentModel.DataAnnotations;

namespace GymTec_Api.Models;

public class Tratamiento
{
    [Key]
    public string identificador { get; set; }
    public string Nombre { get; set; }
}
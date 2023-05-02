using System.ComponentModel.DataAnnotations;

namespace GymTec_Api.Models;

public class Clase_cliente
{
    [Key]
    public string Clase { get; set; }
    public string Cliente { get; set; }
    
}
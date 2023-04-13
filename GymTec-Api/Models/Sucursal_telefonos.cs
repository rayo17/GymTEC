using System.ComponentModel.DataAnnotations;

namespace GymTec_Api.Models;

public class Sucursal_telefonos
{
    [Key]
    public string Sucursal { get; set; }
    public int Telefono { get; set; }
}
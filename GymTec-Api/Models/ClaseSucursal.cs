using System.ComponentModel.DataAnnotations;

namespace GymTec_Api.Models;

public class ClaseSucursal
{
    [Key]
    public string Identificador { get; set; }
    public string Clase { get; set; }
    public string Sucursal { get; set; }
}
using System.ComponentModel.DataAnnotations.Schema;

namespace GymTec_Api.Models;

public class TratamientoSucursal
{
    [ForeignKey("Sucursal")] 
    public string Sucursal { get; set; }
    public string Tratamiento { get; set; }
}
using System.ComponentModel.DataAnnotations.Schema;

namespace GymTec_Api.Models;

public class ProductoSucursal
{
    [ForeignKey("Sucursal")] 
    public string Sucursal { get; set; }
    public string Producto { get; set; }
    public int Stock { get; set; }
}
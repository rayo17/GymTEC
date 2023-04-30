using System.ComponentModel.DataAnnotations;

namespace GymTec_Api.Models;

public class ProductoSucursalInfo
{
    [Key] 
    public string Codigo_barras { get; set; }
    public string Nombre { get; set; }
    public List<string> Sucursales { get; set; }
}

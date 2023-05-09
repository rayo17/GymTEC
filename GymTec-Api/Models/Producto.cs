using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;

namespace GymTec_Api.Models;

public class Producto
{
    [Key]
    public string Codigo_barras { get; set; }
    public string Nombre { get; set; }
    public string Descripcion { get; set; }
    public int? Costo { get; set; }
}
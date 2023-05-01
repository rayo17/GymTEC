using System.ComponentModel.DataAnnotations;

namespace GymTec_Api.Models;

public class ClaseSucursalInfo
{
    [Key]
    public string identificador { get; set; }
    public string Nombre { get; set; }
    public List<string> Sucursales { get; set; }
}
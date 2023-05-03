using System.ComponentModel.DataAnnotations;

namespace GymTec_Api.Models;

public class ClaseSucursalInfo
{
    [Key]
    public int identificador { get; set; }
    public List<string> Sucursales { get; set; }
}
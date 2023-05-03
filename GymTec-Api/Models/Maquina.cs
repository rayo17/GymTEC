using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;

namespace GymTec_Api.Models;

public class Maquina
{
    public int Tipo { get; set; }
    public string Marca { get; set; }
    [Key] 
    public string Numero_serie { get; set; }
    public int Costo { get; set; }
    public string? Sucursal { get; set; }
    
}
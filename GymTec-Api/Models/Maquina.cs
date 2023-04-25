using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;

namespace GymTec_Api.Models;

public class Maquina
{
    public string Tipo { get; set; }
    public string Marca { get; set; }
    [Key] 
    public string Numero_serie { get; set; }
    public int Costo { get; set; }
    
}
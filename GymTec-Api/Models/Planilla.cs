using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;

namespace GymTec_Api.Models;

public class Planilla
{
    [Key] 
    public string Identificador { get; set; }
    public int Pago_mensual { get; set; }
    public int Pago_horas { get; set; }
    public int Pago_clase { get; set; }
    
}

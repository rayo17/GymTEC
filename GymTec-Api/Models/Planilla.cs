using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;

namespace GymTec_Api.Models;

public class Planilla
{
    [Key] 
    public string Identificador { get; set; }
    public SqlMoney Pago_mensual { get; set; }
    public SqlMoney Pago_horas { get; set; }
    public SqlMoney Pago_clase { get; set; }
    
}

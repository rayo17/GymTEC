using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;

namespace GymTec_Api.Models;

public class Planilla
{
    [Key] 
    public string Identificador { get; set; }

    public string Tipo { get; set; }

}

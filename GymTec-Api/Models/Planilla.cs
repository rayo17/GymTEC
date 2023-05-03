using System.ComponentModel.DataAnnotations;
using System.Data.SqlTypes;

namespace GymTec_Api.Models;

public class Planilla
{
    [Key] 
    public int? Identificador { get; set; }

    public string Descripcion { get; set; }

}

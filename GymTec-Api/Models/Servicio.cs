using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace GymTec_Api.Models;

public class Servicio
{
    [Key]
    public int? Identificador { get; set; }
    public string Descripcion { get; set; }
    
    
}
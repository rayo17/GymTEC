using System.ComponentModel.DataAnnotations;

namespace GymTec_Api.Models;

public class Tipo
{
   [Key]
   
   public int Id { get; set; }
   public string Descripcion { get; set; }
}
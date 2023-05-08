using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GymTec_Api.Models;

{
    [Key]
    public int Clase { get; set; }
    public string Cliente { get; set; }
    
}
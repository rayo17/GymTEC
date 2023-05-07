using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GymTec_Api.Models;

[PrimaryKey(nameof(Clase), nameof(Cliente), nameof(Sucursal))]
public class Clase_cliente
{
    
    public int Clase { get; set; }
    public string Cliente { get; set; }
    public string Sucursal { get; set; }
    
}
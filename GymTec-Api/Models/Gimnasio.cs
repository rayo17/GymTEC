using System.ComponentModel.DataAnnotations;

namespace GymTec_Api.Models;

public class Gimnasio
{
    [Key]
    public string Sucursal { get; set; }
    public string Maquina { get; set; }
    public string Clase { get; set; }
    public string Producto { get; set; }
    public string Tratamiento { get; set; }
}
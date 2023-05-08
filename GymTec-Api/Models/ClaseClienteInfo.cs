using System.ComponentModel.DataAnnotations;

namespace GymTec_Api.Models;

public class ClaseClienteInfo
{
    public List<int> Clase { get; set; }
    public string Cliente { get; set; }
}
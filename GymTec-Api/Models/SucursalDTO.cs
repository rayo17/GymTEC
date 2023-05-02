namespace GymTec_Api.Models;

public class SucursalDTO
{
    public string Id { get; set; }
    public List<string> Productos { get; set; }

    public List<string> Clases { get; set; }

    public List<string> Tratamientos { get; set; }
}

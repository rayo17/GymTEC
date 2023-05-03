namespace GymTec_Api.Models;

public class SucursalDTO
{
    public string Id { get; set; }
    public List<string> Productos { get; set; }

    public List<int> Clases { get; set; }

    public List<int> Tratamientos { get; set; }
}

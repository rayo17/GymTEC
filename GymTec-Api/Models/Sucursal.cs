using System.ComponentModel.DataAnnotations;

namespace GymTec_Api.Models;

public class Sucursal
{
    [Key]
    public string Nombre { get; set; }
    public string Distrito { get; set; }
    public string Canton { get; set; }
    public string Provincia { get; set; }
    public DateTime Fecha_apertura { get; set; }
    public string Horario_atencion { get; set; }
    public string Administrador { get; set; }
    public int Capacidad_maxima { get; set; }
    public int Activacion_spa { get; set; }
    public int Activacion_tienda { get; set; }

}
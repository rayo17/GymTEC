using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GymTec_Api.Models
{
    public class SucursalTelefonos
    {
        [ForeignKey("Sucursal")]
        public string Sucursal { get; set; }
        public int Telefono { get; set; }
    }
}
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymTec_Api.Data;
using GymTec_Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymTec_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SucursalTelefonosController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public SucursalTelefonosController(ApplicationDbContext context)
        {
            this.context = context;
        }

        // GET: api/SucursalTelefonos
        [HttpGet]
        public IEnumerable<SucursalTelefonos> Get()
        {
            return context.SucursalTelefonos.ToList();
        }

        // GET: api/SucursalTelefonos/5
        [HttpGet("{sucursal}")]
        public SucursalTelefonos Get(string sucursal)
        {
            return context.SucursalTelefonos.FirstOrDefault(sT => sT.Sucursal == sucursal);
        }
        
        [HttpPost]
        public ActionResult Post([FromBody] SucursalTelefonos sucursalTelefonos)
        {
            try
            {
                context.SucursalTelefonos.Add(sucursalTelefonos);
                context.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE: api/SucursalTelefonos/5
        [HttpDelete("{sucursal}/{telefono}")]
        public ActionResult Delete(string sucursal, int telefono)
        {
            var sT = context.SucursalTelefonos.FirstOrDefault(sT => sT.Sucursal == sucursal && sT.Telefono == telefono);
            if (sT != null)
            {
                context.SucursalTelefonos.Remove(sT);
                context.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }
    }
}
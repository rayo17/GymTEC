using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymTec_Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymTec_Api.Models;

namespace GymTec_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicioController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ServicioController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Servicio
        [HttpGet]
        public IEnumerable<Servicio> Get()
        {
            return _context.Servicio.ToList();
        }

        // GET: api/Servicio/5
        [HttpGet("{id}")]
        public Servicio GetServicio(int id)
        {
            return _context.Servicio.FirstOrDefault(sT => sT.Identificador == id);
        }
        
        // POST: api/Servicio
        [HttpPost]
        public async Task<ActionResult<Servicio>> PostServicio(Servicio servicio)
        {
            _context.Servicio.Add(servicio);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return Conflict();
                
        }

            return CreatedAtAction(nameof(GetServicio), new { id = servicio.Identificador }, servicio);
        }


        // DELETE: api/SucursalTelefonos/5
        [HttpDelete("{id}/{descripcion}")]
        public ActionResult Delete(int id, string descripcion)
        {
            var sT = _context.Servicio.FirstOrDefault(sT => sT.Identificador == id && sT.Descripcion == descripcion);
            if (sT != null)
            {
                _context.Servicio.Remove(sT);
                _context.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        private bool ServicioExists(int id, string descripcion)
        {
            return _context.Servicio.Any(e => e.Identificador == id && e.Descripcion == descripcion);
        }
    }
}

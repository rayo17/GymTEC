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
        public async Task<ActionResult<IEnumerable<Servicio>>> GetServicios()
        {
            return await _context.Servicio.ToListAsync();
        }

        // GET: api/Servicio/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Servicio>> GetServicio(string id)
        {
            var servicio = await _context.Servicio.FindAsync(id);

            if (servicio == null)
            {
                return NotFound();
            }

            return servicio;
        }

        // PUT: api/Servicio/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutServicio(string id, Servicio servicio)
        {
            if (id != servicio.Identificador)
            {
                return BadRequest();
            }

            _context.Entry(servicio).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServicioExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
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
                if (ServicioExists(servicio.Identificador))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(GetServicio), new { id = servicio.Identificador }, servicio);
        }

        // DELETE: api/Servicio/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Servicio>> DeleteServicio(string id)
        {
            var servicio = await _context.Servicio.FindAsync(id);
            if (servicio == null)
            {
                return NotFound();
            }

            _context.Servicio.Remove(servicio);
            await _context.SaveChangesAsync();

            return servicio;
        }

        private bool ServicioExists(string id)
        {
            return _context.Servicio.Any(e => e.Identificador == id);
        }
    }
}

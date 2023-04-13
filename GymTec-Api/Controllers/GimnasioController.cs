using GymTec_Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymTec_Api.Data;

namespace GymTec_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GimnasioController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GimnasioController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Gimnasio
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gimnasio>>> GetGimnasio()
        {
            return await _context.Gimnasio.ToListAsync();
        }

        // GET: api/Gimnasio/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Gimnasio>> GetGimnasio(string id)
        {
            var gimnasio = await _context.Gimnasio.FindAsync(id);

            if (gimnasio == null)
            {
                return NotFound();
            }

            return gimnasio;
        }

        // POST: api/Gimnasio
        [HttpPost]
        public async Task<ActionResult<Gimnasio>> PostGimnasio(Gimnasio gimnasio)
        {
            _context.Gimnasio.Add(gimnasio);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (GimnasioExists(gimnasio.Sucursal))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetGimnasio", new { id = gimnasio.Sucursal }, gimnasio);
        }

        // DELETE: api/Gimnasio/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Gimnasio>> DeleteGimnasio(string id)
        {
            var gimnasio = await _context.Gimnasio.FindAsync(id);
            if (gimnasio == null)
            {
                return NotFound();
            }

            _context.Gimnasio.Remove(gimnasio);
            await _context.SaveChangesAsync();

            return gimnasio;
        }

        private bool GimnasioExists(string id)
        {
            return _context.Gimnasio.Any(e => e.Sucursal == id);
        }
    }
}

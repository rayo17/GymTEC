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
    public class PuestoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PuestoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Puesto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Puesto>>> GetPuestos()
        {
            return await _context.Puesto.ToListAsync();
        }

        // GET: api/Puesto/5
        [HttpGet("{identificador}")]
        public async Task<ActionResult<Puesto>> GetPuesto(int identificador)
        {
            var puesto = await _context.Puesto.FindAsync(identificador);

            if (puesto == null)
            {
                return NotFound();
            }

            return puesto;
        }

        // POST: api/Puesto
        [HttpPost]
        public async Task<ActionResult<Puesto>> PostPuesto(Puesto puesto)
        {
            _context.Puesto.Add(puesto);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                return Conflict();

            }

            return CreatedAtAction(nameof(GetPuesto), new { identificador = puesto.Identificador }, puesto);
        }

        // PUT: api/Puesto/5
        [HttpPut("{identificador}")]
        public async Task<IActionResult> PutPuesto(int identificador, Puesto puesto)
        {
            if (identificador != puesto.Identificador)
            {
                return BadRequest();
            }

            _context.Entry(puesto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                    return NotFound();
                    
            }

            return NoContent();
        }

        // DELETE: api/Puesto/5
        [HttpDelete("{identificador}")]
        public async Task<IActionResult> DeletePuesto(int identificador)
        {
            var puesto = await _context.Puesto.FindAsync(identificador);
            if (puesto == null)
            {
                return NotFound();
            }

            _context.Puesto.Remove(puesto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PuestoExists(int identificador)
        {
            return _context.Puesto.Any(e => e.Identificador == identificador);
        }
    }
}

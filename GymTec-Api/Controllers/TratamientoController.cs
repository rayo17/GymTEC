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
    public class TratamientoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TratamientoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Tratamiento
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tratamiento>>> GetTratamientos()
        {
            return await _context.Tratamiento.ToListAsync();
        }

        // GET: api/Tratamiento/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tratamiento>> GetTratamiento(string id)
        {
            var tratamiento = await _context.Tratamiento.FindAsync(id);

            if (tratamiento == null)
            {
                return NotFound();
            }

            return tratamiento;
        }

        // PUT: api/Tratamiento/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTratamiento(string id, Tratamiento tratamiento)
        {
            if (id != tratamiento.identificador)
            {
                return BadRequest();
            }

            _context.Entry(tratamiento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TratamientoExists(id))
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

        // POST: api/Tratamiento
        [HttpPost]
        public async Task<ActionResult<Tratamiento>> PostTratamiento(Tratamiento tratamiento)
        {
            _context.Tratamiento.Add(tratamiento);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TratamientoExists(tratamiento.identificador))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTratamiento", new { id = tratamiento.identificador }, tratamiento);
        }

        // DELETE: api/Tratamiento/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Tratamiento>> DeleteTratamiento(string id)
        {
            var tratamiento = await _context.Tratamiento.FindAsync(id);
            if (tratamiento == null)
            {
                return NotFound();
            }

            _context.Tratamiento.Remove(tratamiento);
            await _context.SaveChangesAsync();

            return tratamiento;
        }

        private bool TratamientoExists(string id)
        {
            return _context.Tratamiento.Any(e => e.identificador == id);
        }
    }
}

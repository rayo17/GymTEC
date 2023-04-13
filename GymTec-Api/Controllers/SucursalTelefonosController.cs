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
        private readonly ApplicationDbContext _context;

        public SucursalTelefonosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/SucursalTelefonos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sucursal_telefonos>>> GetSucursalTelefonos()
        {
            return await _context.Sucursal_telefonos.ToListAsync();
        }

        // GET: api/SucursalTelefonos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sucursal_telefonos>> GetSucursalTelefonos(string id)
        {
            var sucursalTelefonos = await _context.Sucursal_telefonos.FindAsync(id);

            if (sucursalTelefonos == null)
            {
                return NotFound();
            }

            return sucursalTelefonos;
        }

        // PUT: api/SucursalTelefonos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSucursalTelefonos(string id, Sucursal_telefonos sucursalTelefonos)
        {
            if (id != sucursalTelefonos.Sucursal)
            {
                return BadRequest();
            }

            _context.Entry(sucursalTelefonos).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SucursalTelefonosExists(id))
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

        // POST: api/SucursalTelefonos
        [HttpPost]
        public async Task<ActionResult<Sucursal_telefonos>> PostSucursalTelefonos(Sucursal_telefonos sucursalTelefonos)
        {
            _context.Sucursal_telefonos.Add(sucursalTelefonos);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SucursalTelefonosExists(sucursalTelefonos.Sucursal))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(GetSucursalTelefonos), new { id = sucursalTelefonos.Sucursal }, sucursalTelefonos);
        }

        // DELETE: api/SucursalTelefonos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSucursalTelefonos(string id)
        {
            var sucursalTelefonos = await _context.Sucursal_telefonos.FindAsync(id);
            if (sucursalTelefonos == null)
            {
                return NotFound();
            }

            _context.Sucursal_telefonos.Remove(sucursalTelefonos);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SucursalTelefonosExists(string id)
        {
            return _context.Sucursal_telefonos.Any(e => e.Sucursal == id);
        }
    }
}

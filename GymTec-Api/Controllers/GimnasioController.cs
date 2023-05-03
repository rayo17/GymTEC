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
        // POST: api/Gimnasio/CopiarGimnasio
[HttpPost("CopiarGimnasio")]
public async Task<ActionResult<Gimnasio>> CopiarGimnasio(string id, string nuevoNombre)
{
    var gimnasioOrigen = await _context.Gimnasio.Include(g => g.Producto)
                                                .Include(g => g.Tratamiento)
                                                .Include(g => g.Clase)
                                                .FirstOrDefaultAsync(g => g.Sucursal == id);

    if (gimnasioOrigen == null)
    {
        return NotFound();
    }

    // Crear una nueva instancia de Gimnasio con el nuevo nombre
    var gimnasioNuevo = new Gimnasio
    {
        Sucursal = nuevoNombre,
        Maquina = gimnasioOrigen.Maquina,
        Clase = gimnasioOrigen.Clase,
        Producto = gimnasioOrigen.Producto,
        Tratamiento = gimnasioOrigen.Tratamiento
    };

    // Agregar la nueva instancia de Gimnasio a la base de datos
    _context.Gimnasio.Add(gimnasioNuevo);

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateException)
    {
        if (GimnasioExists(gimnasioNuevo.Sucursal))
        {
            return Conflict();
        }
        else
        {
            throw;
        }
    }

    return CreatedAtAction("GetGimnasio", new { id = gimnasioNuevo.Sucursal }, gimnasioNuevo);
}


        private bool GimnasioExists(string id)
        {
            return _context.Gimnasio.Any(e => e.Sucursal == id);
        }
    }
}

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymTec_Api.Data;
using GymTec_Api.Models;

namespace GymTec_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoEquipoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TipoEquipoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/TipoEquipo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tipo_equipo>>> GetTipoEquipos()
        {
            return await _context.Tipo_equipo.ToListAsync();
        }

        // GET: api/TipoEquipo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tipo_equipo>> GetTipo_equipo(string id)
        {
            var tipo_equipo = await _context.Tipo_equipo.FindAsync(id);

            if (tipo_equipo == null)
            {
                return NotFound();
            }

            return tipo_equipo;
        }

        // PUT: api/TipoEquipo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTipo_equipo(string id, Tipo_equipo tipo_equipo)
        {
            if (id != tipo_equipo.Identificador)
            {
                return BadRequest();
            }

            _context.Entry(tipo_equipo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Tipo_equipoExists(id))
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

        // POST: api/TipoEquipo
        [HttpPost]
        public async Task<ActionResult<Tipo_equipo>> PostTipo_equipo(Tipo_equipo tipo_equipo)
        {
            _context.Tipo_equipo.Add(tipo_equipo);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Tipo_equipoExists(tipo_equipo.Identificador))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTipo_equipo", new { id = tipo_equipo.Identificador }, tipo_equipo);
        }

        // DELETE: api/TipoEquipo/5
        [HttpDelete("{id}/{descripcion}")]
        public async Task<IActionResult> DeleteTipo_equipo(string id, string descripcion)
        {
            var sT = _context.Tipo_equipo.FirstOrDefault(sT => sT.Identificador == id && sT.Descripcion == descripcion);
            if (sT != null)
            {
                _context.Tipo_equipo.Remove(sT);
                _context.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

        private bool Tipo_equipoExists(string id)
        {
            return _context.Tipo_equipo.Any(e => e.Identificador == id);
        }
    }
}

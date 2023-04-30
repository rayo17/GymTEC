using System;
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
    public class ClaseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ClaseController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Clase
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Clase>>> GetClases()
        {
            return await _context.Clase.ToListAsync();
        }

        // GET: api/Clase/5
        [HttpGet("{identificador}")]
        public async Task<ActionResult<Clase>> GetClase(string identificador)
        {
            var clase = await _context.Clase.FindAsync(identificador);

            if (clase == null)
            {
                return NotFound();
            }

            return clase;
        }

        // POST: api/Clase
        [HttpPost]
        public async Task<ActionResult<Clase>> PostClase(Clase clase)
        {
            if (clase.Sucursal == "")
            {
                clase.Sucursal = null;
            }
            _context.Clase.Add(clase);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ClaseExists(clase.Identificador))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(GetClase), new { identificador = clase.Identificador }, clase);
        }

        // PUT: api/Clase/5
        [HttpPut("{identificador}")]
        public async Task<IActionResult> PutClase(string identificador, Clase clase)
        {
            if (clase.Sucursal == "")
            {
                clase.Sucursal = null;
            }
            if (identificador != clase.Identificador)
            {
                return BadRequest();
            }

            _context.Entry(clase).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClaseExists(identificador))
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

        // DELETE: api/Clase/5
        [HttpDelete("{identificador}")]
        public async Task<IActionResult> DeleteClase(string identificador)
        {
            var clase = await _context.Clase.FindAsync(identificador);
            if (clase == null)
            {
                return NotFound();
            }

            _context.Clase.Remove(clase);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("conSucursal")]
        public async Task<ActionResult<IEnumerable<ClaseSucursal>>> GetClaseConSucursal()
        {
            var clasesConSucursal = await _context.Clase
                .Select(p => new ClaseSucursal {
                    Identificador = p.Identificador,
                    Clase = p.Nombre,
                    Sucursal = _context.Sucursal.Where(s => s.Nombre == p.Sucursal).Select(s => s.Nombre)
                        .FirstOrDefault()
                        })
                .ToListAsync();

            return clasesConSucursal;
        }

        private bool ClaseExists(string identificador)
        {
            return _context.Clase.Any(e => e.Identificador == identificador);
        }
    }
}

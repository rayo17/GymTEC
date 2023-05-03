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

        [HttpPost]
        public async Task<ActionResult<Clase>> PostClase(Clase clase)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Clase.Add(clase);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClase), new { identificador = clase.Identificador }, clase);
        }
        // GET: api/TratamientoSucursal
        [HttpGet("ClaseSucursal")]
        public IEnumerable<ClaseSucursal> GetClaseSucursal()
        {
            return _context.ClaseSucursal.ToList();
        }
        [HttpPut("{identificador}")]
        public async Task<IActionResult> PutClase(int identificador, Clase clase)
        {
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

                    return NotFound();
                    
            }

            return NoContent();
        }

        private bool ClaseExists(int identificador)
        {
            return _context.Clase.Any(e => e.Identificador == identificador);
        }



        // POST: api/TratamientoSucursal
        [HttpPost("ClaseSucursal/{id}/{nombreSucursal}")]
        public async Task<IActionResult> ClaseSucursalPost(int id, string nombreSucursal)
        {
            var clase = await _context.Clase.FindAsync(id);
            
            if (clase == null)
            {
                return NotFound();
            }

            var clase1 = new ClaseSucursal { Clase = id, Sucursal = nombreSucursal };
            _context.ClaseSucursal.Add(clase1);
            await _context.SaveChangesAsync();
            return Ok();
        }


        // DELETE: api/TratamientoSucursal/sucursal/tratamiento
        [HttpDelete("ClaseSucursal/{sucursal}/{clase}")]
        public async Task<IActionResult> DeleteClaseSucursal([FromRoute] string sucursal, [FromRoute] string clase)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var claseSucursal = await _context.ClaseSucursal.FindAsync(sucursal, clase);
            if (claseSucursal == null)
            {
                return NotFound();
            }

            _context.ClaseSucursal.Remove(claseSucursal);
            await _context.SaveChangesAsync();

            return Ok(claseSucursal);
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
        // GET: api/TratamientoSucursal/sucursal
        [HttpGet("ClaseSucursal/{sucursal}")]
        public IActionResult GetClaseSucursal([FromRoute] string sucursal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var claseSucursal = _context.ClaseSucursal.Where(ts => ts.Sucursal == sucursal);

            if (claseSucursal == null)
            {
                return NotFound();
            }

            return Ok(claseSucursal);
        }
        [HttpGet("conSucursal")]
        public async Task<ActionResult<IEnumerable<ClaseSucursalInfo>>> GetClasesConSucursal()
        {
            var tratamientosConSucursal = await _context.Clase
                .Select(p => new ClaseSucursalInfo {
                    identificador = p.Identificador,
                    Sucursales = _context.ClaseSucursal
                        .Where(ps => ps.Clase == p.Identificador)
                        .Select(ps => _context.Sucursal
                                .Where(s => s.Nombre == ps.Sucursal)
                                .Select(s => s.Nombre)
                                .ToList()  // Convertir a lista de cadenas
                        )
                        .SelectMany(sucursales => sucursales)  // "Aplanar" la lista de listas
                        .ToList()  // Convertir a lista de cadenas
                })
                .ToListAsync();



            return tratamientosConSucursal;
        }
    }
}

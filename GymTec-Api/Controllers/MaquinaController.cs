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
    public class MaquinasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MaquinasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Maquinas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Maquina>>> GetMaquinas()
        {
            return await _context.Maquina.ToListAsync();
        }

        // GET: api/Maquinas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Maquina>> GetMaquina(string id)
        {
            var maquina = await _context.Maquina.FindAsync(id);

            if (maquina == null)
            {
                return NotFound();
            }

            return maquina;
        }

        // PUT: api/Maquinas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMaquina(string id, Maquina maquina)
        {
            if (id != maquina.Numero_serie)
            {
                return BadRequest();
            }

            _context.Entry(maquina).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaquinaExists(id))
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

        // POST: api/Maquinas
        [HttpPost]
        public async Task<ActionResult<Maquina>> PostMaquina(Maquina maquina)
        {
            _context.Maquina.Add(maquina);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MaquinaExists(maquina.Numero_serie))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMaquina", new { id = maquina.Numero_serie }, maquina);
        }

        // DELETE: api/Maquinas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Maquina>> DeleteMaquina(string id)
        {
            var maquina = await _context.Maquina.FindAsync(id);
            if (maquina == null)
            {
                return NotFound();
            }

            _context.Maquina.Remove(maquina);
            await _context.SaveChangesAsync();

            return maquina;
        }
        
        [HttpGet("congimnasio")]
        public async Task<ActionResult<IEnumerable<MaquinaGimnasio>>> GetMaquinasConGimnasio()
        {
            var maquinasConGimnasio = await _context.Maquina
                .Select(m => new MaquinaGimnasio {
                    Numero_serie = m.Numero_serie,
                    Tipo = m.Tipo,
                    Marca = m.Marca,
                    Sucursal = _context.Sucursal
                        .Where(g => g.Nombre == m.Sucursal)
                        .Select(g => g.Nombre)
                        .FirstOrDefault(),
                    Costo = m.Costo
                })
                .ToListAsync();
            
            return maquinasConGimnasio;
        }

        // DELETE: api/Maquinas/5/sucursal
        [HttpDelete("{id}/sucursal")]
        public async Task<IActionResult> DeleteMaquinaSucursal(string id)
        {
            var maquina = await _context.Maquina.FindAsync(id);
        
            if (maquina == null)
            {
                return NotFound();
            }
        
            maquina.Sucursal = null;
        
            await _context.SaveChangesAsync();
        
            return NoContent();
        }

        [HttpPut("maquina/{id}/sucursal/{nombreSucursal}")]
        public async Task<IActionResult> UpdateMaquinaSucursal(string id, string nombreSucursal)
        {
            var maquina = await _context.Maquina.FindAsync(id);

            if (maquina == null)
            {
                return NotFound();
            }

            maquina.Sucursal = nombreSucursal;


            if (maquina.Sucursal == null)
            {
                return NotFound("No se encontró la sucursal especificada.");
            }

            await _context.SaveChangesAsync();

            return Ok();
        }


        private bool MaquinaExists(string id)
        {
            return _context.Maquina.Any(e => e.Numero_serie == id);
        }
    }
}

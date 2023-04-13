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
    public class SucursalController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SucursalController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Sucursal
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sucursal>>> GetSucursales()
        {
            return await _context.Sucursal.ToListAsync();
        }

        // GET: api/Sucursal/NombreSucursal
        [HttpGet("{nombre}")]
        public async Task<ActionResult<Sucursal>> GetSucursal(string nombre)
        {
            var sucursal = await _context.Sucursal.FindAsync(nombre);

            if (sucursal == null)
            {
                return NotFound();
            }

            return sucursal;
        }

        // POST: api/Sucursal
        [HttpPost]
        public async Task<ActionResult<Sucursal>> PostSucursal(Sucursal sucursal)
        {
            _context.Sucursal.Add(sucursal);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SucursalExists(sucursal.Nombre))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(GetSucursal), new { nombre = sucursal.Nombre }, sucursal);
        }

        // PUT: api/Sucursal/NombreSucursal
        [HttpPut("{nombre}")]
        public async Task<IActionResult> PutSucursal(string nombre, Sucursal sucursal)
        {
            if (nombre != sucursal.Nombre)
            {
                return BadRequest();
            }

            _context.Entry(sucursal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SucursalExists(nombre))
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

        // DELETE: api/Sucursal/NombreSucursal
        [HttpDelete("{nombre}")]
        public async Task<IActionResult> DeleteSucursal(string nombre)
        {
            var sucursal = await _context.Sucursal.FindAsync(nombre);
            if (sucursal == null)
            {
                return NotFound();
            }

            _context.Sucursal.Remove(sucursal);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SucursalExists(string nombre)
        {
            return _context.Sucursal.Any(e => e.Nombre == nombre);
        }
    }
}

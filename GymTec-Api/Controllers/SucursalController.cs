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
        [HttpGet("conTodo")]
        public async Task<ActionResult<IEnumerable<SucursalDTO>>> GetAllData()
        {
            var sucursales = await _context.Sucursal
                .Select(s => new SucursalDTO
                {
                    Id = s.Nombre,
                    Productos = _context.ProductoSucursal.Where(ps => ps.Sucursal == s.Nombre).Select(ps => ps.Producto).ToList(),
                    Clases = _context.ClaseSucursal.Where(cs => cs.Sucursal == s.Nombre).Select(cs => cs.Clase).ToList(),
                    Tratamientos = _context.TratamientoSucursal.Where(ms => ms.Sucursal == s.Nombre).Select(ms => ms.Tratamiento).ToList()
                })
                .ToListAsync();

            return sucursales;
        }
        // GET: api/Sucursal/Nombres
        [HttpGet("Nombres")]
        public async Task<ActionResult<IEnumerable<SucursalNombre>>> GetNombresSucursales()
        {   
            var sucursales = await _context.Sucursal.Select(s => new SucursalNombre
            {
                Nombre = s.Nombre
            }).ToListAsync();
            return sucursales;
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
        public ActionResult Delete(string nombre)
        {
            var sucursal = _context.Sucursal.FirstOrDefault(s => s.Nombre == nombre);
            if (sucursal == null)
            {
                return NotFound();
            }

            var sucTel = _context.SucursalTelefonos.Where(s => s.Sucursal == nombre);
            foreach (var s in sucTel)
            {
                _context.SucursalTelefonos.Remove(s);
            }
            
            var sucTrat = _context.TratamientoSucursal.Where(t => t.Sucursal == nombre);
            foreach (var t in sucTrat)
            {
                _context.TratamientoSucursal.Remove(t);
            }

            _context.SaveChanges();
            _context.Sucursal.Remove(sucursal);
            _context.SaveChanges();

            return Ok();
        }

        private bool SucursalExists(string nombre)
        {
            return _context.Sucursal.Any(e => e.Nombre == nombre);
        }
    }
}

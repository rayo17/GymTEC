﻿using System.Collections.Generic;
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
        public async Task<IActionResult> PutTratamiento(int id, Tratamiento tratamiento)
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
                return NotFound();
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
                return Conflict();
            }

            return CreatedAtAction("GetTratamiento", new { id = tratamiento.identificador }, tratamiento);
        }

        // DELETE: api/Tratamiento/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Tratamiento>> DeleteTratamiento(int id)
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
        [HttpGet("conSucursal")]
        public async Task<ActionResult<IEnumerable<TratamientoSucursalInfo>>> GetTratamientosConSucursal()
        {
            var tratamientosConSucursal = await _context.Tratamiento
                .Select(p => new TratamientoSucursalInfo {
                    identificador = p.identificador,
                    Nombre = p.Nombre,
                    Sucursales = _context.TratamientoSucursal
                        .Where(ps => ps.Tratamiento == p.identificador)
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

        private bool TratamientoExists(int id)
        {
            return _context.Tratamiento.Any(e => e.identificador == id);
        }
    }
}

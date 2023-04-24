using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymTec_Api.Data;
using GymTec_Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;

namespace GymTec_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmpleadoController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Empleado
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Empleado>>> GetEmpleados()
        {
            return await _context.Empleado.ToListAsync();
        }

        // GET: api/Empleado/
        [HttpGet("{cedula}")]
        public async Task<ActionResult<Empleado>> GetEmpleado(string cedula)
        {
            var empleado = await _context.Empleado.FindAsync(cedula);

            if (empleado == null)
            {
                return NotFound();
            }

            return empleado;
        }
        
        // GET: api/Empleado/Contrasenna
        [HttpGet("{cedula}/{password}")]
        public ActionResult Get(string cedula, string password)
        {
            var empleado = _context.Empleado.FirstOrDefault(e => e.Cedula == cedula && e.Contrasenna == password);
            
            if (empleado != null)
            {
                return Ok();
            }
            return NotFound();
        }

        // POST: api/Empleado
        [HttpPost]
        public async Task<ActionResult<Empleado>> PostEmpleado(Empleado empleado)
        {
            _context.Empleado.Add(empleado);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EmpleadoExists(empleado.Cedula))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction(nameof(GetEmpleado), new { cedula = empleado.Cedula }, empleado);
        }

        // PUT: api/Empleado/5
        [HttpPut("{cedula}")]
        public async Task<IActionResult> PutEmpleado(string cedula, Empleado empleado)
        {
            if (cedula != empleado.Cedula)
            {
                return BadRequest();
            }

            _context.Entry(empleado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmpleadoExists(cedula))
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

        // DELETE: api/Empleado/5
        [HttpDelete("{cedula}")]
        public async Task<IActionResult> DeleteEmpleado(string cedula)
        {
            var empleado = await _context.Empleado.FindAsync(cedula);
            if (empleado == null)
            {
                return NotFound();
            }

            _context.Empleado.Remove(empleado);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmpleadoExists(string cedula)
        {
            return _context.Empleado.Any(e => e.Cedula == cedula);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;
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
        [HttpPut("clases-impartidas/{cedula}")]
        public IActionResult IncrementarClasesImpartidas(string cedula)
        {
            var empleado = ObtenerEmpleadoPorCedula(cedula);
            if (empleado == null)
            {
                return NotFound();
            }

            empleado.Clases_impartidas += 1;

            // Actualizar el empleado en la base de datos
            _context.SaveChanges();

            return Ok(empleado);
        }


        private Empleado ObtenerEmpleadoPorCedula(string cedula)
        {
            var empleado = _context.Empleado.FirstOrDefault(e => e.Cedula == cedula);
            return empleado;
        }


        
        // GET: api/Empleado/Contrasenna
        [HttpGet("{cedula}/{password}")]
        public async Task<ActionResult<Empleado>> Get(string cedula, string password)
        {
            var md5 = MD5.Create();
            var hash = md5.ComputeHash(Encoding.UTF8.GetBytes(password));
            var hashedPassword = BitConverter.ToString(hash).Replace("-", "").ToLower();

            var empleado = _context.Empleado.FirstOrDefault(e => e.Cedula == cedula && e.Contrasenna == hashedPassword);

            if (empleado != null)
            {
                return empleado;
            }

            return BadRequest();
        }


        // POST: api/Empleado
        [HttpPost]
        public async Task<ActionResult<Empleado>> PostEmpleado(Empleado empleado)
        {
            // Encriptar la contraseña en formato MD5
            using (MD5 md5Hash = MD5.Create())
            {
                string contrasenaMD5 = GetMd5Hash(md5Hash, empleado.Contrasenna);
                empleado.Contrasenna = contrasenaMD5;
            }

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

// Función para obtener la representación en formato MD5 de una cadena
        private string GetMd5Hash(MD5 md5Hash, string input)
        {
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            StringBuilder sBuilder = new StringBuilder();

            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            return sBuilder.ToString();
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

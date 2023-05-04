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

namespace GymTec_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ClienteController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Cliente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes()
        {
            return await _context.Cliente.ToListAsync();
        }

        // GET: api/Cliente/5
        [HttpGet("{cedula}")]
        public async Task<ActionResult<Cliente>> GetCliente(string cedula)
        {
            var cliente = await _context.Cliente.FindAsync(cedula);

            if (cliente == null)
            {
                return NotFound();
            }

            return cliente;
        }

        // POST: api/Cliente
        [HttpPost]
        public async Task<ActionResult<Cliente>> PostCliente(Cliente cliente)
        {
            // Encriptar contraseña en formato MD5
            using (MD5 md5Hash = MD5.Create())
            {
                string contrasenaMD5 = GetMd5Hash(md5Hash, cliente.Contrasena);
                cliente.Contrasena = contrasenaMD5;
            }

            _context.Cliente.Add(cliente);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ClienteExists(cliente.Cedula))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Ok(cliente);
<<<<<<< HEAD
        }
        
        [HttpGet("{cedula}/{password}")]
        public ActionResult Get(string cedula, string password)
        {
            var md5 = MD5.Create();
            var hash = md5.ComputeHash(Encoding.UTF8.GetBytes(password));
            var hashedPassword = BitConverter.ToString(hash).Replace("-", "").ToLower();

            var cliente = _context.Cliente.FirstOrDefault(c => c.Cedula == cedula && c.Contrasena == hashedPassword);

            if (cliente != null)
            {
                return Ok();
            }

            return BadRequest();
=======
>>>>>>> f202d31d40007867ed3f0c67c11d94e2b0c77d45
        }

        // PUT: api/Cliente/5
        [HttpPut("{cedula}")]
        public async Task<IActionResult> PutCliente(string cedula, Cliente cliente)
        {
            if (cedula != cliente.Cedula)
            {
                return BadRequest();
            }

            _context.Entry(cliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteExists(cedula))
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

        // DELETE: api/Cliente/5
        [HttpDelete("{cedula}")]
        public async Task<IActionResult> DeleteCliente(string cedula)
        {
            var cliente = await _context.Cliente.FindAsync(cedula);
            if (cliente == null)
            {
                return NotFound();
            }

            _context.Cliente.Remove(cliente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClienteExists(string cedula)
        {
            return _context.Cliente.Any(e => e.Cedula == cedula);
        }
        
        
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
    }
}

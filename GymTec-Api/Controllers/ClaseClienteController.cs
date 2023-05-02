using System.Collections.Generic;
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
    public class ClaseClienteController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ClaseClienteController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Clase_cliente
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Clase_cliente>>> GetClase_cliente()
        {
            return await _context.Clase_cliente.ToListAsync();
        }

        // GET: api/Clase_cliente/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Clase_cliente>> GetClase_cliente(string id)
        {
            var clase_cliente = await _context.Clase_cliente.FindAsync(id);

            if (clase_cliente == null)
            {
                return NotFound();
            }

            return clase_cliente;
        }

        // PUT: api/Clase_cliente/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClase_cliente(string id, Clase_cliente clase_cliente)
        {
            if (id != clase_cliente.Clase)
            {
                return BadRequest();
            }

            _context.Entry(clase_cliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Clase_clienteExists(id))
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

        // POST: api/Clase_cliente
        [HttpPost]
        public async Task<ActionResult<Clase_cliente>> PostClase_cliente(Clase_cliente clase_cliente)
        {
            _context.Clase_cliente.Add(clase_cliente);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Clase_clienteExists(clase_cliente.Clase))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetClase_cliente", new { id = clase_cliente.Clase }, clase_cliente);
        }

        // DELETE: api/Clase_cliente/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Clase_cliente>> DeleteClase_cliente(string id)
        {
            var clase_cliente = await _context.Clase_cliente.FindAsync(id);
            if (clase_cliente == null)
            {
                return NotFound();
            }

            _context.Clase_cliente.Remove(clase_cliente);
            await _context.SaveChangesAsync();

            return clase_cliente;
        }

        private bool Clase_clienteExists(string id)
        {
            return _context.Clase_cliente.Any(e => e.Clase == id);
        }
    }
}

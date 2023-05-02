using GymTec_Api.Data;
using GymTec_Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GymTec_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class TipoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        
        public TipoController(ApplicationDbContext context)
        {
            _context = context;
        }
        
        // GET: api/Tipo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tipo>>> GetTipos()
        {
            return await _context.Tipo.ToListAsync();
        }
        
        // POST: api/Tipo
        [HttpPost]
        public async Task<ActionResult<Tipo>> PostTipo(Tipo tipo)
        {
            _context.Tipo.Add(tipo);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TipoExists(tipo.Descripcion))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTipos", new { id = tipo.Id }, tipo);
        }
        
        private bool TipoExists(string description)
        {
            return _context.Tipo.Any(e => e.Descripcion == description);
        }
    }
}


using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GymTec_Api.Models;
using System.ComponentModel.DataAnnotations;
using GymTec_Api.Data;

namespace GymTec_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanillasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PlanillasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Planillas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Planilla>>> GetPlanillas()
        {
            return await _context.Planilla.ToListAsync();
        }

        // GET: api/Planillas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Planilla>> GetPlanilla(string id)
        {
            var planilla = await _context.Planilla.FindAsync(id);

            if (planilla == null)
            {
                return NotFound();
            }

            return planilla;
        }

        // PUT: api/Planillas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlanilla(string id, Planilla planilla)
        {
            if (id != planilla.Identificador)
            {
                return BadRequest();
            }

            _context.Entry(planilla).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlanillaExists(id))
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

        // POST: api/Planillas
        [HttpPost]
        public async Task<ActionResult<Planilla>> PostPlanilla(Planilla planilla)
        {
            _context.Planilla.Add(planilla);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PlanillaExists(planilla.Identificador))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPlanilla", new { id = planilla.Identificador }, planilla);
        }

        // DELETE: api/Planillas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Planilla>> DeletePlanilla(string id)
        {
            var planilla = await _context.Planilla.FindAsync(id);
            if (planilla == null)
            {
                return NotFound();
            }

            _context.Planilla.Remove(planilla);
            await _context.SaveChangesAsync();

            return planilla;
        }

        private bool PlanillaExists(string id)
        {
            return _context.Planilla.Any(e => e.Identificador == id);
        }
    }
}

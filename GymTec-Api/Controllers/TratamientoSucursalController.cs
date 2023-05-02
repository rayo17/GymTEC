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
    public class TratamientoSucursalController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TratamientoSucursalController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/TratamientoSucursal
        [HttpGet]
        public IEnumerable<TratamientoSucursal> GetTratamientoSucursal()
        {
            return _context.TratamientoSucursal.ToList();
        }

        // GET: api/TratamientoSucursal/sucursal
        [HttpGet("{sucursal}")]
        public IActionResult GetTratamientoSucursal([FromRoute] string sucursal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tratamientoSucursal = _context.TratamientoSucursal.Where(ts => ts.Sucursal == sucursal);

            if (tratamientoSucursal == null)
            {
                return NotFound();
            }

            return Ok(tratamientoSucursal);
        }

        // POST: api/TratamientoSucursal
        [HttpPost("{id}/{nombreSucursal}")]
        public async Task<IActionResult> PostTratamientoSucursal(string id, string nombreSucursal)
        {
            var tratamiento = await _context.Tratamiento.FindAsync(id);
            
            if (tratamiento == null)
            {
                return NotFound();
            }

            var tratamiento1 = new TratamientoSucursal { Tratamiento = id, Sucursal = nombreSucursal };
            _context.TratamientoSucursal.Add(tratamiento1);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE: api/TratamientoSucursal/sucursal/tratamiento
        [HttpDelete("{sucursal}/{tratamiento}")]
        public async Task<IActionResult> DeleteTratamientoSucursal([FromRoute] string sucursal, [FromRoute] string tratamiento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tratamientoSucursal = await _context.TratamientoSucursal.FindAsync(sucursal, tratamiento);
            if (tratamientoSucursal == null)
            {
                return NotFound();
            }

            _context.TratamientoSucursal.Remove(tratamientoSucursal);
            await _context.SaveChangesAsync();

            return Ok(tratamientoSucursal);
        }

        private bool TratamientoSucursalExists(string id)
        {
            return _context.TratamientoSucursal.Any(e => e.Sucursal == id);
        }
    }
}

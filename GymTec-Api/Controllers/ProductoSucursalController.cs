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
    public class ProductoSucursalController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public ProductoSucursalController(ApplicationDbContext context)
        {
            this.context = context;
        }

        // GET: api/ProductoSucursal
        [HttpGet]
        public IEnumerable<ProductoSucursal> Get()
        {
            return context.ProductoSucursal.ToList();
        }

        // GET: api/ProductoSucursal/sucursal
        [HttpGet("{sucursal}")]
        public IEnumerable<ProductoSucursal> Get(string sucursal)
        {
            return context.ProductoSucursal.Where(ps => ps.Sucursal == sucursal).ToList();
        }

        // POST: api/ProductoSucursal
        [HttpPost("producto/{id}/sucursal/{nombreSucursal}")]
        public async Task<IActionResult> AgregarProductoSucursal(string id, string nombreSucursal)
        {
            var producto = await context.Producto.FindAsync(id);

            if (producto == null)
            {
                return NotFound();
            }

            var productoSucursal = new ProductoSucursal { Producto = id, Sucursal = nombreSucursal, Stock = 1};
            context.ProductoSucursal.Add(productoSucursal);

            await context.SaveChangesAsync();

            return Ok();
        }


        // DELETE: api/ProductoSucursal/sucursal/producto
        [HttpDelete("{sucursal}/{producto}")]
        public ActionResult Delete(string sucursal, string producto)
        {
            var ps = context.ProductoSucursal.FirstOrDefault(ps => ps.Sucursal == sucursal && ps.Producto == producto);
            if (ps != null)
            {
                context.ProductoSucursal.Remove(ps);
                context.SaveChanges();
                return Ok();
            }
            return BadRequest();
        }

    }
}
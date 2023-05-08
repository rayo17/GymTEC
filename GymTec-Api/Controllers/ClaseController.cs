using System;
using System.Collections.Generic;
using System.Globalization;
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
    public class ClaseController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ClaseController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Clase
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Clase>>> GetClases()
        {
            return await _context.Clase.ToListAsync();
        }

        // GET: api/Clase/5
        [HttpGet("{identificador}")]
        public async Task<ActionResult<Clase>> GetClase(string identificador)
        {
            var clase = await _context.Clase.FindAsync(identificador);

            if (clase == null)
            {
                return NotFound();
            }

            return clase;
        }

        [HttpPost]
        public async Task<ActionResult<Clase>> PostClase(Clase clase)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Clase.Add(clase);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClase), new { identificador = clase.Identificador }, clase);
        }
        // GET: api/TratamientoSucursal
        [HttpGet("ClaseSucursal")]
        public IEnumerable<ClaseSucursal> GetClaseSucursal()
        {
            return _context.ClaseSucursal.ToList();
        }
        [HttpPut("{identificador}")]
        public async Task<IActionResult> PutClase(int identificador, Clase clase)
        {
            if (identificador != clase.Identificador)
            {
                return BadRequest();
            }

            _context.Entry(clase).State = EntityState.Modified;

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

        private bool ClaseExists(int identificador)
        {
            return _context.Clase.Any(e => e.Identificador == identificador);
        }



        // POST: api/TratamientoSucursal
        [HttpPost("ClaseSucursal/{id}/{nombreSucursal}")]
        public async Task<IActionResult> ClaseSucursalPost(int id, string nombreSucursal)
        {
            var clase = await _context.Clase.FindAsync(id);
            
            if (clase == null)
            {
                return NotFound();
            }

            var clase1 = new ClaseSucursal { Clase = id, Sucursal = nombreSucursal };
            _context.ClaseSucursal.Add(clase1);
            await _context.SaveChangesAsync();
            return Ok();
        }


        // DELETE: api/TratamientoSucursal/sucursal/tratamiento
        [HttpDelete("ClaseSucursal/{sucursal}/{clase}")]
        public async Task<IActionResult> DeleteClaseSucursal([FromRoute] string sucursal, [FromRoute] int clase)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var claseSucursal = await _context.ClaseSucursal.FindAsync(sucursal, clase);
            if (claseSucursal == null)
            {
                return NotFound();
            }

            _context.ClaseSucursal.Remove(claseSucursal);
            await _context.SaveChangesAsync();

            return Ok(claseSucursal);
        }

        // DELETE: api/Clase/5
        [HttpDelete("{identificador}")]
        public async Task<IActionResult> DeleteClase(int identificador)
        {
            var clase = await _context.Clase.FindAsync(identificador);
            if (clase == null)
            {
                return NotFound();
            }

            _context.Clase.Remove(clase);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // GET: api/TratamientoSucursal/sucursal
        [HttpGet("ClaseSucursal/{sucursal}")]
        public IActionResult GetClaseSucursal([FromRoute] string sucursal)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var claseSucursal = _context.ClaseSucursal.Where(ts => ts.Sucursal == sucursal);

            if (claseSucursal == null)
            {
                return NotFound();
            }

            return Ok(claseSucursal);
        }
        // GET: api/TratamientoSucursal/sucursal
        [HttpGet("ClaseSucursal/{clase}")]
        public IActionResult getClaseSucursal([FromRoute] int clase)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var claseSucursal = _context.ClaseSucursal.Where(ts => ts.Clase == clase);

            if (claseSucursal == null)
            {
                return NotFound();
            }

            return Ok(claseSucursal);
        }
        [HttpGet("ClaseSucursal/TCSucursal")]
        public async Task<ActionResult<IEnumerable<ClaseSucursalCInfo>>> GetTCSucursal()
        {
            var CTClase = await _context.Clase
                .Select(p => new ClaseSucursalCInfo() {
                    
                    Identificador = p.Identificador,
                    Capacidad = p.Capacidad,
                    Grupal = p.Grupal,
                    Tipo = p.Tipo,
                    Dia = p.Dia,
                    Instructor = p.Instructor,
                    Hora_inicio = p.Hora_inicio,
                    Hora_fin = p.Hora_fin,
                    Sucursal = _context.ClaseSucursal
                        .Where(ps => ps.Clase == p.Identificador)
                        .Select(ps => _context.Sucursal
                                .Where(s => s.Nombre == ps.Sucursal)
                                .Select(s => s.Nombre)
                                .ToList()  // Convertir a lista de cadenas
                        )
                        .SelectMany(sucursales => sucursales)  // "Aplanar" la lista de listas
                        .ToList()  // Convertir a lista de cadenas
                })
                .ToListAsync();



            return CTClase;
        }
        [HttpGet("conSucursal")]
        public async Task<ActionResult<IEnumerable<ClaseSucursalInfo>>> GetClasesConSucursal()
        {
            var tratamientosConSucursal = await _context.Clase
                .Select(p => new ClaseSucursalInfo {
                    identificador = p.Identificador,
                    Sucursales = _context.ClaseSucursal
                        .Where(ps => ps.Clase == p.Identificador)
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
        
        [HttpGet("clasesClientes/{id}")]
        public async Task<ActionResult<IEnumerable<ClaseClienteInfo>>> GetClasesCliente(string id)
        {
            var tratamientosConSucursal = await _context.Cliente
                .Where(cc => cc.Cedula == id)
                .Select(p => new ClaseClienteInfo {
                    Cliente = p.Cedula,
                    Clase = _context.Clase_cliente
                        .Where(ps => ps.Cliente == p.Cedula)
                        .Select(ps => _context.Clase
                                .Where(s => s.Identificador == ps.Clase)
                                .Select(s => s.Identificador)
                                .ToList()  // Convertir a lista de cadenas
                        )
                        .SelectMany(clases => clases)  // "Aplanar" la lista de listas
                        .ToList()  // Convertir a lista de cadenas
                })
                .ToListAsync();



            return tratamientosConSucursal;
        }
        [HttpGet("clases/rango-hora")]
        public IActionResult GetClasesEnRangoHora(string horaInicio, string horaFin)
        {
            List<Clase> clasesEnRango = new List<Clase>();
            foreach (Clase clase in _context.Clase)
            {
                if (EsHoraEnRango(clase.Hora_inicio, horaInicio, horaFin) &&
                    EsHoraEnRango(clase.Hora_fin, horaInicio, horaFin))
                {
                    clasesEnRango.Add(clase);
                }
            }
            return Ok(clasesEnRango);
        }

        private bool EsHoraEnRango(string hora, string horaInicio, string horaFin)
        {
            DateTime horaDateTime = DateTime.ParseExact(hora, "HH:mm", CultureInfo.InvariantCulture);
            DateTime horaInicioDateTime = DateTime.ParseExact(horaInicio, "HH:mm", CultureInfo.InvariantCulture);
            DateTime horaFinDateTime = DateTime.ParseExact(horaFin, "HH:mm", CultureInfo.InvariantCulture);
            return horaDateTime >= horaInicioDateTime && horaDateTime <= horaFinDateTime;
        }
        [HttpGet("clases/sucursal")]
        public IActionResult GetClasesEnSucursal(string sucursal)
        {
            List<Clase> clasesEnRango = _context.Clase
                .Join(
                    _context.ClaseSucursal,
                    clase => clase.Identificador,
                    claseSucursal => claseSucursal.Clase,
                    (clase, claseSucursal) => new { Clase = clase, ClaseSucursal = claseSucursal }
                )
                .Where(joinResult => joinResult.ClaseSucursal.Sucursal == sucursal)
                .Select(joinResult => joinResult.Clase)
                .ToList();

            return Ok(clasesEnRango);
        }

        [HttpGet("clases/tipo")]
        public IActionResult GetClasesEnTipo(int tipo)
        {
            List<Clase> clasesEnRango = _context.Clase
                .Where(c => c.Tipo == tipo)
                .ToList();
            return Ok(clasesEnRango);
        }
        [HttpGet("clases/rango-dia")]
        public IActionResult GetClasesEnRangoDia(int diaInicio, int diaFin)
        {
            List<Clase> clasesEnRango = _context.Clase
                .Where(c => c.Dia >= diaInicio && c.Dia <= diaFin)
                .ToList();
            return Ok(clasesEnRango);
        }
        [HttpPut("cupos/{identificador}")]
        public IActionResult DisminuirCupo(int identificador)
        {
            var clase = ObtenerClase(identificador);
            if (clase == null)
            {
                return NotFound();
            }

            clase.Capacidad -= 1;

            // Actualizar el empleado en la base de datos
            _context.SaveChanges();

            return Ok(clase);
        }


        private Clase ObtenerClase(int identificador)
        {
            var clase = _context.Clase.FirstOrDefault(e => e.Identificador == identificador);
            return clase;
        }


    }
}

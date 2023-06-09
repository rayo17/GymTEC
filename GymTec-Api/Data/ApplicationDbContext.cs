﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymTec_Api.Models;

namespace GymTec_Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SucursalTelefonos>()
                .HasKey(s => new {s.Sucursal, s.Telefono});
            modelBuilder.Entity<TratamientoSucursal>().HasKey(s => new { s.Sucursal, s.Tratamiento });
            modelBuilder.Entity<ProductoSucursal>().HasKey(s => new { s.Sucursal, s.Producto });
            modelBuilder.Entity<ClaseSucursal>().HasKey(s => new{s.Sucursal, s.Clase});
            modelBuilder.Entity<Clase_cliente>().HasKey(s => new{s.Clase, s.Cliente});

        }
        
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Clase> Clase { get; set; }
        public DbSet<Sucursal> Sucursal { get; set; }
        
        public DbSet<SucursalTelefonos> SucursalTelefonos { get; set; }
        public DbSet<Empleado> Empleado { get; set; }
        public DbSet<Puesto> Puesto { get; set; }
        public DbSet<Planilla> Planilla { get; set; }
        public DbSet<Maquina> Maquina { get; set; }
        public DbSet<Producto> Producto { get; set; }
        public DbSet<Tratamiento> Tratamiento { get; set; }

        public DbSet<TratamientoSucursal> TratamientoSucursal { get; set; }
        
        public DbSet<ProductoSucursal> ProductoSucursal { get; set; }
        
        public DbSet<ClaseSucursal> ClaseSucursal { get; set; }
        public DbSet<Clase_cliente> Clase_cliente { get; set; }
        public DbSet<Tipo_equipo> Tipo_equipo { get; set; }
        public DbSet<Servicio> Servicio { get; set; }


    }
}
CREATE TABLE SUCURSAL (
	Nombre VARCHAR(30) NOT NULL,
	Distrito VARCHAR(30) NOT NULL,
	Canton VARCHAR(30) NOT NULL,
	Provincia VARCHAR(30) NOT NULL,
	Fecha_apertura DATE NOT NULL,
	Horario_atencion VARCHAR(100) NOT NULL,
	Administrador VARCHAR(9) NOT NULL,
	Capacidad_maxima INT NOT NULL,
	Activacion_spa INT NOT NULL,
	Activacion_tienda INT NOT NULL,

	PRIMARY KEY(Nombre)
);

CREATE TABLE SUCURSAL_TELEFONOS (
	Sucursal VARCHAR(30) NOT NULL,
	Telefono INT NOT NULL,

	PRIMARY KEY(Sucursal, Telefono)
);

CREATE TABLE EMPLEADO (
	Cedula VARCHAR(9) NOT NULL,
	Primer_nombre VARCHAR(20) NOT NULL,
	Segundo_nombre VARCHAR(20),
	Primer_apellido VARCHAR(20) NOT NULL,
	Segundo_apellido VARCHAR(20),
	Distrito VARCHAR(30) NOT NULL,
	Canton VARCHAR(30) NOT NULL,
	Provincia VARCHAR(30) NOT NULL,
	Salario MONEY NOT NULL,
	Correo_electronico VARCHAR(50) NOT NULL,
	Contrasenna VARCHAR(30) NOT NULL,

	PRIMARY KEY(Cedula)
);

CREATE TABLE PUESTO (
	Identificador VARCHAR(9) NOT NULL,
	Descripcion VARCHAR(20) NOT NULL,

	PRIMARY KEY(Identificador)
);

CREATE TABLE PLANILLA (
	Identificador VARCHAR(9) NOT NULL,
	Pago_mensual MONEY,
	Pago_horas MONEY,
	Pago_clase MONEY,

	PRIMARY KEY(Identificador)
);

CREATE TABLE MAQUINA (
	Tipo VARCHAR(20) NOT NULL,
	Marca VARCHAR(20) NOT NULL,
	Numero_serie VARCHAR(10) NOT NULL,
	Costo MONEY NOT NULL,

	PRIMARY KEY(Numero_serie)
);

CREATE TABLE CLASE (
	Identificador VARCHAR(10) NOT NULL,
	Capacidad INT NOT NULL,
	Grupal INT NOT NULL,
	Tipo VARCHAR(30) NOT NULL,
	Fecha DATE NOT NULL,
	Instructor VARCHAR(100) NOT NULL,
	Hora_inicio VARCHAR(5) NOT NULL,
	Hora_fin VARCHAR(5) NOT NULL,

	PRIMARY KEY(Identificador)
);

CREATE TABLE PRODUCTO( -- Productos de tienda
	Codigo_barras VARCHAR(10) NOT NULL,
	Nombre VARCHAR(30) NOT NULL,
	Descripcion VARCHAR(50) NOT NULL,
	Costo MONEY,

	PRIMARY KEY(Codigo_barras)
);

CREATE TABLE TRATAMIENTO ( -- Tratamientos de spa
	Identificador VARCHAR(10) NOT NULL,
	Nombre VARCHAR(50) NOT NULL,

	PRIMARY KEY(Identificador)
);

CREATE TABLE GIMNASIO (
	Sucursal VARCHAR(30) NOT NULL,
	Maquina VARCHAR(10) NOT NULL,
	Clase VARCHAR(10) NOT NULL,
	Producto VARCHAR(10) NOT NULL,
	Tratamiento VARCHAR(10) NOT NULL,

	PRIMARY KEY(Sucursal)
);

CREATE TABLE CLIENTE(
	Cedula VARCHAR(10) NOT NULL,
	Primer_nombre VARCHAR(20) NOT NULL,
	Segundo_nombre VARCHAR(20),
	Primer_apellido VARCHAR(20) NOT NULL,
	Segundo_apellido VARCHAR(20),
	Correo_electronico VARCHAR(50) NOT NULL,
	Distrito VARCHAR(30) NOT NULL,
	Canton VARCHAR(30) NOT NULL,
	Provincia VARCHAR(30) NOT NULL,
	Contrasena VARCHAR(30) NOT NULL,
	Fecha_nacimiento DATE NOT NULL,
	Peso VARCHAR(4) NOT NULL,
	Imc VARCHAR(4) NOT NULL,
	
	PRIMARY KEY(Cedula)
);

CREATE TABLE CLASE_CLIENTES (
	Clase VARCHAR(10) NOT NULL,
	Cliente VARCHAR(10) NOT NULL,

	PRIMARY KEY(Clase, Cliente)
);

CREATE TABLE TIPO_EQUIPO (
	Identificador VARCHAR(30) NOT NULL,
	Descripcion VARCHAR(50) NOT NULL,

	PRIMARY KEY(Identificador, Descripcion)
);

CREATE TABLE SERVICIO(
	Identificador VARCHAR(30) NOT NULL,
	Descripcion VARCHAR(50) NOT NULL,

	PRIMARY KEY(Identificador, Descripcion)
);


-- Foreign keys

ALTER TABLE SUCURSAL_TELEFONOS
	ADD FOREIGN KEY (Sucursal) REFERENCES SUCURSAL(Nombre);

ALTER TABLE PUESTO
	ADD FOREIGN KEY (Identificador) REFERENCES EMPLEADO(Cedula);

ALTER TABLE PLANILLA
	ADD FOREIGN KEY (Identificador) REFERENCES EMPLEADO(Cedula);


ALTER TABLE GIMNASIO
	ADD FOREIGN KEY (Sucursal) REFERENCES SUCURSAL(Nombre);
ALTER TABLE GIMNASIO
	ADD FOREIGN KEY (Maquina) REFERENCES MAQUINA(Numero_serie);
ALTER TABLE GIMNASIO
	ADD FOREIGN KEY (Clase) REFERENCES CLASE(Identificador);
ALTER TABLE GIMNASIO
	ADD FOREIGN KEY (Producto) REFERENCES PRODUCTO(Codigo_barras);
ALTER TABLE GIMNASIO
	ADD FOREIGN KEY (Tratamiento) REFERENCES TRATAMIENTO(Identificador);


ALTER TABLE CLASE_CLIENTES
	ADD FOREIGN KEY (Clase) REFERENCES CLASE(Identificador);
ALTER TABLE CLASE_CLIENTES
	ADD FOREIGN KEY (Cliente) REFERENCES CLIENTE(Cedula);


ALTER TABLE TIPO_EQUIPO
	ADD FOREIGN KEY (Identificador) REFERENCES SUCURSAL(Nombre);

ALTER TABLE SERVICIO
	ADD FOREIGN KEY (Identificador) REFERENCES SUCURSAL(Nombre);
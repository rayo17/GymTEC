package com.gymtec.application.database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

public class Sqlite extends SQLiteOpenHelper {

    // creating a constant variables for our database.
    // below variable is for our database name.
    private static final String DB_NAME = "GYMTECAPP";

    // below int is our database version
    private static final int DB_VERSION = 1;


    public Sqlite(Context context) {
        super(context, DB_NAME, null, DB_VERSION);
    }

    // below method is for creating a database by running a sqlite query
    @Override
    public void onCreate(SQLiteDatabase db) {
        // on below line we are creating
        // an sqlite query and we are
        // setting our column names
        // along with their data types.
        String table_Sucursal= " CREATE TABLE SUCURSAL ( Nombre VARCHAR(30) NOT NULL, " +
                "Distrito VARCHAR(30) NOT NULL, " +
                "Canton VARCHAR(30) NOT NULL, "+
                " Provincia VARCHAR(30) NOT NULL,"+
                " Fecha_apertura DATE NOT NULL, " +
                " Horario_atencion VARCHAR(100) NOT NULL,"+
                " Administrador VARCHAR(9) NOT NULL," +
                " Capacidad_maxima INT NOT NULL, " +
                " Activacion_spa INT NOT NULL, " +
                " Activacion_tienda INT NOT NULL, " +
                " PRIMARY KEY(Nombre));";


        String table_sucrusal_telefonos = "CREATE TABLE SUCURSAL_TELEFONOS (Sucursal VARCHAR(30) NOT NULL, "+
                "Telefono INTTEGER NOT NULL, " +
                "PRIMARY KEY(Sucursal, Telefono));";

        String table_empleado = "CREATE TABLE EMPLEADO (Cedula VARCHAR(9) NOT NULL, " +
                "Primer_nombre VARCHAR(20) NOT NULL, "+
                "Segundo_nombre VARCHAR(20), " +
                "Primer_apellido VARCHAR(20) NOT NULL, " +
                "Segundo_apellido VARCHAR(20), " +
                "Distrito VARCHAR(30) NOT NULL, " +
                "Canton VARCHAR(30) NOT NULL, " +
                "Provincia VARCHAR(30) NOT NULL, " +
                "Salario MONEY NOT NULL, " +
                "Correo_electronico VARCHAR(50) NOT NULL, " +
                "Contrasenna VARCHAR(30) NOT NULL, " +
                "PRIMARY KEY(Cedula));";

        String table_Planilla= "CREATE TABLE PLANILLA (Identificador VARCHAR(9) NOT NULL, Pago_mensual MONEY, Pago_horas MONEY, Pago_clase MONEY,PRIMARY KEY(Identificador))";
        String table_Maquina="CREATE TABLE MAQUINA (Tipo VARCHAR(20) NOT NULL, Marca VARCHAR(20) NOT NULL, Numero_serie VARCHAR(10) NOT NULL, Costo MONEY NOT NULL, PRIMARY KEY(Numero_serie));";


        String table_clase = "CREATE TABLE CLASE (Identificador VARCHAR(10) NOT NULL, " +
                "Capacidad INT NOT NULL, "+
                "Grupal INT NOT NULL, " +
                "Tipo VARCHAR(30) NOT NULL, " +
                "Dia INT NOT NULL, " +
                "Instructor VARCHAR(100) NOT NULL, " +
                "Hora_inicio VARCHAR(5) NOT NULL, " +
                "Hora_fin VARCHAR(5) NOT NULL, " +
                "PRIMARY KEY(Identificador));";

        String table_tipo = "CREATE TABLE TIPO (Id INT IDENTITY(1,1), " +
                "Descripcion VARCHAR(30)  NOT NULL, "+
                "PRIMARY KEY(Id));";

        String table_tipo_clase = "CREATE TABLE TIPO_CLASE (Tipo_id INT NOT NULL, " +
                "Clase_id VARCHAR(10) NOT NULL, "+
                "PRIMARY KEY(Tipo_id, Clase_id));";

        String table_producto = "CREATE TABLE PRODUCTO (Codigo_barras VARCHAR(10) NOT NULL, " +
                "Nombre VARCHAR(30) NOT NULL, "+
                "Descripcion VARCHAR(50) NOT NULL, " +
                "Costo MONEY, " +
                "PRIMARY KEY(Codigo_barras));";

        String table_tratamiento = "CREATE TABLE TRATAMIENTO (Identificador VARCHAR(10) NOT NULL, " +
                "Nombre VARCHAR(50) NOT NULL, "+
                "PRIMARY KEY(Identificador));";

        String table_gimnasio = "CREATE TABLE GIMNASIO (Sucursal VARCHAR(30) NOT NULL, " +
                "Maquina VARCHAR(10) NOT NULL, "+
                "Clase VARCHAR(10) NOT NULL, " +
                "Producto VARCHAR(10) NOT NULL, " +
                "Tratamiento VARCHAR(10) NOT NULL, " +
                "PRIMARY KEY(Sucursal));";

        String table_cliente = "CREATE TABLE CLIENTE (Cedula VARCHAR(10) NOT NULL, " +
                "Primer_nombre VARCHAR(20) NOT NULL, "+
                "Segundo_nombre VARCHAR(20), " +
                "Primer_apellido VARCHAR(20) NOT NULL, " +
                "Segundo_apellido VARCHAR(20), " +
                "Correo_electronico VARCHAR(50) NOT NULL, " +
                "Distrito VARCHAR(30) NOT NULL, " +
                "Canton VARCHAR(30) NOT NULL, " +
                "Provincia VARCHAR(30) NOT NULL, " +
                "Salario MONEY NOT NULL, " +
                "Contrasenna VARCHAR(30) NOT NULL, " +
                "Fecha_nacimiento DATE NOT NULL, " +
                "Peso VARCHAR(4) NOT NULL, " +
                "Imc VARCHAR(4) NOT NULL, " +
                "PRIMARY KEY(Cedula));";

        String table_clase_clientes = "CREATE TABLE CLASE_CLIENTES (Clase VARCHAR(10) NOT NULL, " +
                "Cliente VARCHAR(10) NOT NULL, "+
                "PRIMARY KEY(Clase, Cliente));";

        String table_tipo_equipo = "CREATE TABLE TIPO_EQUIPO (Identificador VARCHAR(30) NOT NULL, " +
                "Descripcion VARCHAR(50) NOT NULL, "+
                "PRIMARY KEY(Identificador, Descripcion));";

        //
        String table_servicio = "CREATE TABLE SERVICIO (Identificador VARCHAR(30) NOT NULL, " +
                "Descripcion VARCHAR(50) NOT NULL, "+
                "PRIMARY KEY(Identificador, Descripcion));";


        String alter_Sucursal="ALTER TABLE SUCURSAL_TELEFONOS " +
                "ADD FOREIGN KEY (Sucursal) REFERENCES SUCURSAL(Nombre);";
        String alter_Puesto  = "ALTER TABLE PUESTO " +
                "ADD FOREIGN KEY (Identificador) REFERENCES EMPLEADO(Cedula);";
        String  alter_Planilla = "ALTER TABLE PLANILLA ADD FOREIGN KEY (Identificador) REFERENCES EMPLEADO(Cedula);";

        String alter_Gym1= "ALTER TABLE GIMNASIO ADD FOREIGN KEY (Sucursal) REFERENCES SUCURSAL(Nombre);";
        String alter_Gym2= "ALTER TABLE GIMNASIO ADD FOREIGN KEY (Maquina) REFERENCES MAQUINA(Numero_serie);";
        String alter_Gym3 = "ALTER TABLE GIMNASIO ADD FOREIGN KEY (Clase) REFERENCES CLASE(Identificador);";
        String alter_Gym4="ALTER TABLE GIMNASIO ADD FOREIGN KEY (Producto) REFERENCES PRODUCTO(Codigo_barras);";
        String alter_Gym5="ALTER TABLE GIMNASIO ADD FOREIGN KEY (Tratamiento) REFERENCES TRATAMIENTO(Identificador);";
        String alter_Cliente1= "ALTER TABLE CLASE_CLIENTES ADD FOREIGN KEY (Clase) REFERENCES CLASE(Identificador);";
        String alter_Cliente2="ALTER TABLE CLASE_CLIENTES " +
                "ADD FOREIGN KEY (Cliente) REFERENCES CLIENTE(Cedula);";
        String alter_tipo_equipo=" ALTER TABLE TIPO_EQUIPO ADD FOREIGN KEY (Identificador) REFERENCES SUCURSAL(Nombre);";
        String alter_Servicio= "ALTER TABLE SERVICIO ADD FOREIGN KEY (Identificador) REFERENCES SUCURSAL(Nombre);";
        String alter_tipo_clase1= "ALTER TABLE TIPO_CLASE ADD CONSTRAINT tipo_fk FOREIGN KEY (Tipo_id) REFERENCES TIPO(Id);";
        String alter_tipo_clase2= "ALTER TABLE TIPO_CLASE ADD CONSTRAINT clase_fk FOREIGN KEY (Clase_id) REFERENCES CLASE(Identificador);";
        String alter_clase= "ALTER TABLE CLASE ADD CONSTRAINT Week_days CHECK(1<=Dia AND  Dia<= 7);";



        // at last we are calling a exec sql
        // method to execute above sql query
        db.execSQL(table_Sucursal);
        db.execSQL(table_sucrusal_telefonos);
        db.execSQL(table_empleado);
        db.execSQL(table_Planilla);
        db.execSQL(table_Maquina);
        db.execSQL(table_clase);
        db.execSQL(table_tipo);
        db.execSQL(table_tipo_clase);
        db.execSQL(table_producto);
        db.execSQL(table_tratamiento);
        db.execSQL(table_gimnasio);
        db.execSQL(table_cliente);
        db.execSQL(table_clase_clientes);
        db.execSQL(table_tipo_equipo);
        db.execSQL(table_servicio);
        db.execSQL(alter_Sucursal);
        db.execSQL(alter_Puesto);
        db.execSQL(alter_Planilla);
        db.execSQL(alter_Gym1);
        db.execSQL(alter_Gym2);
        db.execSQL(alter_Gym3);
        db.execSQL(alter_Gym4);
        db.execSQL(alter_Gym5);
        db.execSQL(alter_Cliente1);
        db.execSQL(alter_Cliente2);
        db.execSQL(alter_tipo_equipo);
        db.execSQL(alter_Servicio);
        db.execSQL(alter_tipo_clase1);
        db.execSQL(alter_tipo_clase2);
        db.execSQL(alter_clase);





    }

    // this method is use to add new course to our sqlite database.
    public void addNewCliente(String cedula, String Primer_nombre, String Segundo_nombre, String Primer_apellido, String Segundo_apellido, String correo, String distrito, String canton,
                              String provincia, String contrasenna, String Fecha_nacimiento, String peso, String Imc) {
        // on below line we are creating a variable for
        // our sqlite database and calling writable method
        // as we are writing data in our database.
        SQLiteDatabase db = this.getWritableDatabase();

        // on below line we are creating a
        // variable for content values.
        ContentValues values = new ContentValues();

        // on below line we are passing all values
        // along with its key and value pair.
        values.put("Cedula", cedula);
        values.put("Primer_nombre", Primer_nombre);
        values.put("Segundo_nombre", Segundo_nombre);
        values.put("Primer_apellido", Primer_apellido);
        values.put("Segundo_apellido", Segundo_apellido);
        values.put("Correo_electronico", correo);
        values.put("Distrito", distrito);
        values.put("Canton", canton);
        values.put("Provincia", provincia);
        values.put("Contrasenna", contrasenna);
        values.put("Fecha_nacimiento", Fecha_nacimiento);
        values.put("Peso", peso);
        values.put("Imc", Imc);


        // after adding all values we are passing
        // content values to our table.
        db.insert("CLIENTE", null, values);

        // at last we are closing our
        // database after adding database.
        db.close();
    }
    public Cursor getCliente(String cedula, String contrasenna) {
        // on below line we are creating a variable for
        // our sqlite database and calling writable method
        // as we are writing data in our database.
        SQLiteDatabase db = this.getWritableDatabase();



        // on below line we are passing all values
        // along with its key and value pair.
        Cursor cedula_contr_cliente = db.rawQuery("SELECT Cedula, Contrasenna FROM CLIENTE WHERE Cedula = "+cedula, null);



        // after adding all values we are passing
        // content values to our table.


        // at last we are closing our
        // database after adding database.

        db.close();
        return cedula_contr_cliente;
    }

    public Cursor getSucursal() {
        // on below line we are creating a variable for
        // our sqlite database and calling writable method
        // as we are writing data in our database.
        SQLiteDatabase db = this.getWritableDatabase();



        // on below line we are passing all values
        // along with its key and value pair.
        Cursor nombre_sucursal = db.rawQuery("SELECT Nombre FROM SUCURSAL", null);


        // at last we are closing our
        // database after adding database.

        db.close();
        return nombre_sucursal;
    }
    public void addNewClase_Cliente(String Clase, String Cliente) {

        // on below line we are creating a variable for
        // our sqlite database and calling writable method
        // as we are writing data in our database.
        SQLiteDatabase db = this.getWritableDatabase();

        // on below line we are creating a
        // variable for content values.
        ContentValues values = new ContentValues();

        // on below line we are passing all values
        // along with its key and value pair.
        values.put("Clase", Clase);
        values.put("Cliente", Cliente);



        // after adding all values we are passing
        // content values to our table.
        db.insert("CLASE_CLIENTES", null, values);

        // at last we are closing our
        // database after adding database.
        db.close();
    }




    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // this method is called to check if the table exists already.
        String [] array= new String[12];
        array[0]= "SUCURSAL";
        array[1]= "SUCURSAL_TELEFONOS";
        array[2]= "EMPLEADO";
        array[3]= "PLANILLA";
        array[4]= "MAQUINA";
        array[5]= "CLASE";
        array[6]= "PRODUCTO";
        array[7]= "TRATAMIENTO";
        array[8]= "GIMNASIO";
        array[9]= "CLIENTE";
        array[10]= "CLASE_CLIENTES";
        array[11]= "TIPO_EQUIPO";
        array[12]= "SERVICIO";
        for(int i=0; i<13; i++) {
            db.execSQL("DROP TABLE IF EXISTS" + array[i] );


        }
        onCreate(db);

        }

    }


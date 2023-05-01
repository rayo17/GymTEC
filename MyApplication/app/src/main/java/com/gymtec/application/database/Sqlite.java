package com.gymtec.application.database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;
import android.widget.Toast;

public class Sqlite extends SQLiteOpenHelper {

    // creating a constant variables for our database.
    // below variable is for our database name.
    private static final String DB_NAME = "GYMTECTEST";

    // below int is our database version
    private static final int DB_VERSION = 13;


    public Sqlite(Context context) {
        super(context, DB_NAME, null, DB_VERSION);

    }

    /**
     * Creates the db
     * @param db The database.
     */
    @Override
    public void onCreate(SQLiteDatabase db) {
        //TABLE CREATION SCRIPT DEFINITION
        String table_Sucursal= " CREATE TABLE SUCURSAL ( Nombre VARCHAR(30) NOT NULL, " +
                " PRIMARY KEY(Nombre));";


        String table_clase = "CREATE TABLE CLASE (Identificador INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, " +
                "Capacidad INT NOT NULL, "+
                "Grupal INT NOT NULL, " +
                "Tipo VARCHAR(30) NOT NULL, " +
                "Dia INT NOT NULL, " +
                "Instructor VARCHAR(100) NOT NULL, " +
                "Hora_inicio VARCHAR(5) NOT NULL, " +
                "Hora_fin VARCHAR(5) NOT NULL, " +
                "Sucursal VARCHAR(30),"+
                "FOREIGN KEY (Sucursal) REFERENCES SUCURSAL(Nombre),"+
                "FOREIGN KEY (Tipo) REFERENCES TIPO(Id));";

        String table_tipo = "CREATE TABLE TIPO (Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, " +
                " VARCHAR(30)  NOT NULL);";


        String table_cliente = "CREATE TABLE CLIENTE (Cedula VARCHAR(10) NOT NULL, " +
                "Primer_nombre VARCHAR(20) NOT NULL, "+
                "Segundo_nombre VARCHAR(20), " +
                "Primer_apellido VARCHAR(20) NOT NULL, " +
                "Segundo_apellido VARCHAR(20), " +
                "Correo_electronico VARCHAR(50) NOT NULL, " +
                "Distrito VARCHAR(30) NOT NULL, " +
                "Canton VARCHAR(30) NOT NULL, " +
                "Provincia VARCHAR(30) NOT NULL, " +
                "Contrasenna VARCHAR(30) NOT NULL, " +
                "Fecha_nacimiento DATE NOT NULL, " +
                "Peso VARCHAR(4) NOT NULL, " +
                "Imc VARCHAR(4) NOT NULL, " +
                "PRIMARY KEY(Cedula));";

        String table_clase_clientes = "CREATE TABLE CLASE_CLIENTES (Clase VARCHAR(10) NOT NULL, " +
                "Cliente VARCHAR(10) NOT NULL, "+
                "FOREIGN KEY (Clase) REFERENCES CLASE(Identificador),"+
                "FOREIGN KEY (Cliente) REFERENCES CLIENTE(Cedula),"+
                "PRIMARY KEY(Clase, Cliente));";

        //CONSTRAINT

        String alter_clase= "ALTER TABLE CLASE ADD CONSTRAINT Week_days CHECK(1<=Dia AND  Dia<= 7);";



        //population of sucursales
        String sucursal1 = "INSERT INTO SUCURSAL(Nombre) VALUES('San Pedro');";
        String sucursal3 = "INSERT INTO SUCURSAL(Nombre) VALUES('Cartago');";
        String sucursal4 = "INSERT INTO SUCURSAL(Nombre) VALUES('Curridabat');";
        String sucursal5 = "INSERT INTO SUCURSAL(Nombre) VALUES('Lindora');";
        String sucursal6 = "INSERT INTO SUCURSAL(Nombre) VALUES('Paraiso');";
        String sucursal7 = "INSERT INTO SUCURSAL(Nombre) VALUES('Guachipelin');";
        String sucursal8 = "INSERT INTO SUCURSAL(Nombre) VALUES('Santa Ana');";

        //population of tipos
        String tipo1 = "INSERT INTO TIPO(Descripcion) VALUES('Indoor Cycling');";
        String tipo2 = "INSERT INTO TIPO(Descripcion) VALUES('Pilates');";
        String tipo3 = "INSERT INTO TIPO(Descripcion) VALUES('Yoga');";
        String tipo4 = "INSERT INTO TIPO(Descripcion) VALUES('Zumba');";
        String tipo5 = "INSERT INTO TIPO(Descripcion) VALUES('Natación');";

        //population of clases
        String clase1 = "INSERT INTO CLASE(Capacidad, Grupal, Tipo, Dia, Instructor, Hora_inicio, Hora_fin, Sucursal) VALUES(22,1,3,1,'Jose Ramirez','12:00','13:00', 'Curridabat');";
        String clase2 = "INSERT INTO CLASE(Capacidad, Grupal, Tipo, Dia, Instructor, Hora_inicio, Hora_fin, Sucursal) VALUES(15,1,4,3,'Ernesto Zamora','07:00','08:00','Santa Ana');";
        String clase3 = "INSERT INTO CLASE(Capacidad, Grupal, Tipo, Dia, Instructor, Hora_inicio, Hora_fin, Sucursal) VALUES(30,1,2,6, 'Roxanna Cisneros','08:00','10:00','Lindora');";
        String clase4 = "INSERT INTO CLASE(Capacidad, Grupal, Tipo, Dia, Instructor, Hora_inicio, Hora_fin, Sucursal) VALUES(10,1,5,1, 'Benjamín Quesada','16:00','17:30','Curridabat');";
        String clase5 = "INSERT INTO CLASE(Capacidad, Grupal, Tipo, Dia, Instructor, Hora_inicio, Hora_fin, Sucursal) VALUES(1,0,5,7, 'Yendry Castillo','14:00','15:30','Cartago');";
        String clase6 = "INSERT INTO CLASE(Capacidad, Grupal, Tipo, Dia, Instructor, Hora_inicio, Hora_fin, Sucursal) VALUES(40,1,4,2, 'Roberta Gonzalez','17:00','19:00','Guachipelin');";
        String clase7 = "INSERT INTO CLASE(Capacidad, Grupal, Tipo, Dia, Instructor, Hora_inicio, Hora_fin, Sucursal) VALUES(12,1,2,5, 'Mariana Santamaría','18:00','19:30','Cartago');";
        String clase8 = "INSERT INTO CLASE(Capacidad, Grupal, Tipo, Dia, Instructor, Hora_inicio, Hora_fin, Sucursal) VALUES(8,1,1,7, 'Marcos Guzman','10:00','11:00','San Pedro');";
        String clase9 = "INSERT INTO CLASE(Capacidad, Grupal, Tipo, Dia, Instructor, Hora_inicio, Hora_fin, Sucursal) VALUES(20,1,3,3, 'George Smith','19:00','20:30','Santa Ana');";
        String clase10 = "INSERT INTO CLASE(Capacidad, Grupal, Tipo, Dia, Instructor, Hora_inicio, Hora_fin, Sucursal) VALUES(20,1,1,4, 'Carmen Diaz','08:00','10:30','Santa Ana');";
        String clase11= "INSERT INTO CLASE(Capacidad, Grupal, Tipo, Dia, Instructor, Hora_inicio, Hora_fin, Sucursal) VALUES(20,1,2,3, 'Carmen Diaz','09:00','11:30','Guachipelin');";
        String clase12 = "INSERT INTO CLASE(Capacidad, Grupal, Tipo, Dia, Instructor, Hora_inicio, Hora_fin, Sucursal) VALUES(20,1,3,5, 'Carmen Diaz','10:00','12:30','San Pedro');";


        // at last we are calling a exec sql
        // method to execute above sql query
        db.execSQL(table_Sucursal);
        db.execSQL(table_clase);
        db.execSQL(table_tipo);
        db.execSQL(table_cliente);
        db.execSQL(table_clase_clientes);

        this.addNewCliente(db, "123456789","Fulano","Sutano","Smith", "Diaz","correo@correogymtec.com", "DistritoX", "CantonX", "ProvinciaX", "12345678" ,"19000101", "1", "2");

        db.execSQL(sucursal1);
        db.execSQL(sucursal3);
        db.execSQL(sucursal4);
        db.execSQL(sucursal5);
        db.execSQL(sucursal6);
        db.execSQL(sucursal7);
        db.execSQL(sucursal8);

        db.execSQL(tipo1);
        db.execSQL(tipo2);
        db.execSQL(tipo3);
        db.execSQL(tipo4);
        db.execSQL(tipo5);

        db.execSQL(clase1);
        db.execSQL(clase2);
        db.execSQL(clase3);
        db.execSQL(clase4);
        db.execSQL(clase5);
        db.execSQL(clase6);
        db.execSQL(clase7);
        db.execSQL(clase8);
        db.execSQL(clase9);
        db.execSQL(clase10);
        db.execSQL(clase11);
        db.execSQL(clase12);

    }

    /**
     * Creates new tuple in table Clientes
     * @param cedula
     * @param Primer_nombre
     * @param Segundo_nombre
     * @param Primer_apellido
     * @param Segundo_apellido
     * @param correo
     * @param distrito
     * @param canton
     * @param provincia
     * @param contrasenna
     * @param Fecha_nacimiento
     * @param peso
     * @param Imc
     */
    public void addNewCliente(String cedula, String Primer_nombre, String Segundo_nombre, String Primer_apellido, String Segundo_apellido, String correo, String distrito, String canton,
                              String provincia, String contrasenna, String Fecha_nacimiento, String peso, String Imc) {
        // on below line we are creating a variable for
        // our sqlite database and calling writable method
        // as we are writing data in our database.
        SQLiteDatabase db = this.getWritableDatabase();

        // on below line we are creating a
        // variable for content values.
        ContentValues values = new ContentValues();
        if (db!=null){
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

            Log.d("Success", "Client added");

            // after adding all values we are passing
            // content values to our table.
            db.insert("CLIENTE", null, values);
            //db.close();
        } else {
            Log.d("Error", "Failed to write");

        }

    }

    public void addNewCliente(SQLiteDatabase db,String cedula, String Primer_nombre, String Segundo_nombre, String Primer_apellido, String Segundo_apellido, String correo, String distrito, String canton,
                              String provincia, String contrasenna, String Fecha_nacimiento, String peso, String Imc) {
        // on below line we are creating a variable for
        // our sqlite database and calling writable method
        // as we are writing data in our database.

        // on below line we are creating a
        // variable for content values.
        ContentValues values = new ContentValues();
        if (db!=null){
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

            Log.d("Success", "Client added");

            // after adding all values we are passing
            // content values to our table.
            db.insert("CLIENTE", null, values);
            //db.close();
        } else {
            Log.d("Error", "Failed to write");

        }

    }
    /**
     * gets client information if password and cedula exists
     * @param cedula input client id
     * @param contrasenna input client password
     * @return cursor con que posea la cedula solicitada y la contrasena correcta
     */
    public Cursor getCliente(String cedula, String contrasenna) {

        SQLiteDatabase db = this.getWritableDatabase();

        Cursor cedula_contr_cliente = db.rawQuery("SELECT * FROM CLIENTE WHERE Cedula = "+cedula+
                " AND Contrasenna = "+"'"+contrasenna+"'", null);


        //db.close();
        return cedula_contr_cliente;
    }

    /**
     *
     * @param cedula input client id
     * @return cursor con el cliente que posea la cedula solicitada
     */
    public Cursor getCliente(String cedula) {
        SQLiteDatabase db = this.getWritableDatabase();
        Log.d("Get Cliente", "db opened");
        Cursor cedula_cliente = db.rawQuery("SELECT Cedula FROM CLIENTE WHERE Cedula = " + cedula, null);
        Log.d("Get Cliente", "Client consulted");
        //db.close();
        //Log.d("Get Cliente", "DB closed");
        return cedula_cliente;
    }

    public Cursor getSucursal() {

        SQLiteDatabase db = this.getWritableDatabase();

        // query to get Sucursal
        Cursor nombre_sucursales = db.rawQuery("SELECT * FROM SUCURSAL", null);

        // at last we are closing our
        // database after adding database.

        return nombre_sucursales;
    }
    public Cursor getTipo() {

        SQLiteDatabase db = this.getWritableDatabase();

        // query to get Sucursal
        Cursor nombre_tipo = db.rawQuery("SELECT * FROM TIPO", null);

        //db.close();
        return nombre_tipo;
    }
    public void addNewClase_Cliente(String Clase, String Cliente) {

        SQLiteDatabase db = this.getWritableDatabase();

        // variable for content values.
        ContentValues values = new ContentValues();

        // along with its key and value pair.
        values.put("Clase", Clase);
        values.put("Cliente", Cliente);

        // insert content values to our table.
        db.insert("CLASE_CLIENTES", null, values);

        // at last we are closing our
        // database after adding database.
        //db.close();
    }


    public Cursor getClass_cliente(){
        SQLiteDatabase db=this.getWritableDatabase();
        Cursor Class_cliente = db.rawQuery("SELECT Cliente FROM CLASE_CLIENTES", null);
        return Class_cliente;


    }

    /**
     * Gets class based on filters
     * @param sucursal sucursal de la clase
     * @param tipo tipo de clase
     * @param dia_i dia despues o igual a este
     * @param hora_i hora inicial igual o mayor a esta
     * @param dia_f dia antes o igual a este
     * @param hora_f hora final igual o menor a esta
     * @return Cursor con el tipo, la sucursal, el dia, la hora de inicio, hora de finalizacion, Instructor y capacidad de la clase que cumpla con los filtros
     */
    public Cursor getClass(String sucursal, String tipo, String dia_i, String hora_i, String dia_f, String hora_f){

        SQLiteDatabase db =this.getWritableDatabase();
        Cursor Class=db.rawQuery("SELECT TIPO.Descripcion, CLASE.Sucursal, CLASE.Dia, CLASE.Hora_inicio, CLASE.Hora_fin, CLASE.Instructor, CLASE.Capacidad, CLASE.Identificador  FROM  CLASE \n"+
                " JOIN TIPO ON CLASE.Tipo = TIPO.Id"+
                " WHERE Sucursal = "+sucursal+
                " AND Tipo = "+tipo+
                " AND Dia >= "+dia_i+
                " AND Dia <= "+dia_f+
                " AND Hora_inicio >= "+hora_i+
                " AND Hora_fin <= "+hora_f+";", null);
        return Class;
    }



    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // this method is called to check if the table exists already.
        String [] array= new String[15];
        array[0]= "SUCURSAL";
        array[1]= "SUCURSAL_TELEFONOS";
        array[2]= "EMPLEADO";
        array[3]= "PLANILLA";
        array[4]= "MAQUINA";
        array[5]= "CLASE";
        array[6]= "TIPO";
        array[7]= "TIPO_CLASE";
        array[8]= "PRODUCTO";
        array[9]= "TRATAMIENTO";
        array[10]= "GIMNASIO";
        array[11]= "CLIENTE";
        array[12]= "CLASE_CLIENTES";
        array[13]= "TIPO_EQUIPO";
        array[14]= "SERVICIO";
        for(int i=0; i<14; i++) {
            db.execSQL("DROP TABLE IF EXISTS " + array[i] );


        }
        Log.d("DB","DB updated");
        onCreate(db);

        }

    }


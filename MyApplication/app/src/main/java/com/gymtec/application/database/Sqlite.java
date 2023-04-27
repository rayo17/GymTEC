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
    private static final String DB_NAME = "GYMTEC";

    // below int is our database version
    private static final int DB_VERSION = 6;


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


        String table_clase = "CREATE TABLE CLASE (Identificador VARCHAR(10) NOT NULL, " +
                "Capacidad INT NOT NULL, "+
                "Grupal INT NOT NULL, " +
                "Tipo VARCHAR(30) NOT NULL, " +
                "Dia INT NOT NULL, " +
                "Instructor VARCHAR(100) NOT NULL, " +
                "Hora_inicio VARCHAR(5) NOT NULL, " +
                "Hora_fin VARCHAR(5) NOT NULL, " +
                "PRIMARY KEY(Identificador));";

        String table_tipo = "CREATE TABLE TIPO (Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, " +
                "Descripcion VARCHAR(30)  NOT NULL);";

        String table_tipo_clase = "CREATE TABLE TIPO_CLASE (Tipo_id INTEGER NOT NULL,  " +
                "Clase_id VARCHAR(10) NOT NULL,"+
                "FOREIGN KEY (Tipo_id) REFERENCES TIPO(Id),"+
                "FOREIGN KEY (Clase_id) REFERENCES CLASE(Identificador));";


        String table_gimnasio = "CREATE TABLE GIMNASIO (Nombre VARCHAR(30) PRIMARY KEY NOT NULL, " +
                "Sucursal VARCHAR(30) NOT NULL, "+
                "FOREIGN KEY (Sucursal) REFERENCES SUCURSAL(Nombre));";

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



        // at last we are calling a exec sql
        // method to execute above sql query
        db.execSQL(table_Sucursal);
        db.execSQL(table_clase);
        db.execSQL(table_tipo);
        db.execSQL(table_tipo_clase);
        db.execSQL(table_gimnasio);
        db.execSQL(table_cliente);
        db.execSQL(table_clase_clientes);

        Log.d("BASE_DE_DATOS", "SE  CREARON LAS TABLAS");




    }

    // this method is use to add new course to our sqlite database.
    public void addNewCliente(String cedula, String Primer_nombre, String Segundo_nombre, String Primer_apellido, String Segundo_apellido, String correo, String distrito, String canton,
                              String provincia, String contrasenna, String Fecha_nacimiento, String peso, String Imc) {
        // on below line we are creating a variable for
        // our sqlite database and calling writable method
        // as we are writing data in our database.
        SQLiteDatabase db = this.getWritableDatabase();

        Log.d("Wrote everything", "Wrote everything");
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


            // after adding all values we are passing
            // content values to our table.
            db.insert("CLIENTE", null, values);
            db.close();
        } else {
            Log.d("Error", "Failed to write");

        }

        // on below line we are passing all values
        // along with its key and value pair.


        // at last we are closing our
        // database after adding database.

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

        //db.close();
        return cedula_contr_cliente;
    }
    public Cursor getCliente(String cedula) {
        SQLiteDatabase db = this.getWritableDatabase();
        Cursor cedula_contr_cliente = db.rawQuery("SELECT * FROM CLIENTE WHERE Cedula = " + cedula, null);
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

        //db.close();
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
        //db.close();
    }


    public Cursor getClass_cliente(){
        SQLiteDatabase db=this.getWritableDatabase();
        Cursor Class_cliente = db.rawQuery("SELECT Cliente FROM CLASE_CLIENTES", null);
        return Class_cliente;


    }
    public Cursor getClass(String Identificador){
        SQLiteDatabase db =this.getWritableDatabase();
        Cursor Class=db.rawQuery("SELECT Capacidad, Grupal, Tipo, Dia, Instructor, Hora_inicio, Hora_fin FROM  CLASE WHERE Identificador ="+ Identificador, null);
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


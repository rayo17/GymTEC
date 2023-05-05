package com.gymtec.application.database;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

public class Sqlite extends SQLiteOpenHelper {

    // creating a constant variables for our database.
    // below variable is for our database name.
    private static final String DB_NAME = "GYMTECTEST";

    // below int is our database version
    private static final int DB_VERSION = 15;


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
                "FOREIGN KEY (Tipo) REFERENCES TIPO(Id));";

        String table_tipo = "CREATE TABLE TIPO (Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, " +
                " Descripcion VARCHAR(30)  NOT NULL);";


        String table_cliente = "CREATE TABLE CLIENTE (Cedula VARCHAR(10) NOT NULL, " +
                "Primer_nombre VARCHAR(20) NOT NULL, "+
                "Segundo_nombre VARCHAR(20), " +
                "Primer_apellido VARCHAR(20) NOT NULL, " +
                "Segundo_apellido VARCHAR(20), " +
                "Correo_electronico VARCHAR(50) NOT NULL, " +
                "Distrito VARCHAR(30) NOT NULL, " +
                "Canton VARCHAR(30) NOT NULL, " +
                "Provincia VARCHAR(30) NOT NULL, " +
                "Contrasena VARCHAR(30) NOT NULL, " +
                "Fecha_nacimiento DATE NOT NULL, " +
                "Peso VARCHAR(4) NOT NULL, " +
                "Imc VARCHAR(4) NOT NULL, " +
                "PRIMARY KEY(Cedula));";

        String table_clase_clientes = "CREATE TABLE CLASE_CLIENTES (Clase VARCHAR(10) NOT NULL, " +
                "Cliente VARCHAR(10) NOT NULL, "+
                "Sucursal VARCHAR(30) NOT NULL, "+
                "FOREIGN KEY (Clase) REFERENCES CLASE(Identificador),"+
                "FOREIGN KEY (Cliente) REFERENCES CLIENTE(Cedula),"+
                "FOREIGN KEY (Sucursal) REFERENCES Sucursal(Nombre), "+
                "PRIMARY KEY(Clase, Cliente,Sucursal));";

        String table_clase_sucursal = "CREATE TABLE CLASESUCURSAL (Clase INT NOT NULL, "+
                "Sucursal VARCHAR(30) NOT NULL, "+
                "PRIMARY KEY(Clase, Sucursal));";

        // at last we are calling a exec sql
        // method to execute above sql query
        db.execSQL(table_Sucursal);
        db.execSQL(table_clase);
        db.execSQL(table_tipo);
        db.execSQL(table_cliente);
        db.execSQL(table_clase_clientes);
        db.execSQL(table_clase_sucursal);

    }
    public void add_Sucursales_from_json(JSONArray sucursales) throws JSONException {
        SQLiteDatabase db = this.getWritableDatabase();

        this.empty_Sucursales();
        for(int i = 0; i<sucursales.length();i++){
            db.execSQL("INSERT INTO SUCURSAL(Nombre) VALUES("+"'"+sucursales.getJSONObject(i).getString("nombre")+"'"+");");
        }
    }
    public void add_tipos_from_json(JSONArray tipos) throws JSONException {
        SQLiteDatabase db = this.getWritableDatabase();

        this.empty_Sucursales();
        for(int i = 0; i<tipos.length();i++){
            db.execSQL("INSERT INTO TIPO(Id, Description) VALUES(" +
                    "'"+tipos.getJSONObject(i).getString("id")+"'"
                    +","
                    +"'"+tipos.getJSONObject(i).getString("descripcion")+"'"+
                    ");");
        }
    }

    // TODO add code to clases from json
    public void add_clases_from_json(JSONArray tipos) throws JSONException {
        SQLiteDatabase db = this.getWritableDatabase();

        this.empty_Sucursales();
        for(int i = 0; i<tipos.length();i++){
            db.execSQL("INSERT INTO TIPO(Id, Description) VALUES(" +
                    "'"+tipos.getJSONObject(i).getString("id")+"'"
                    +","
                    +"'"+tipos.getJSONObject(i).getString("descripcion")+"'"+
                    ");");
        }
    }

    // TODO add code to cliente_clases from json
    public void add_cliente_clases_from_json(JSONArray tipos) throws JSONException {
        SQLiteDatabase db = this.getWritableDatabase();

        this.empty_Sucursales();
        for(int i = 0; i<tipos.length();i++){
            db.execSQL("INSERT INTO TIPO(Id, Description) VALUES(" +
                    "'"+tipos.getJSONObject(i).getString("id")+"'"
                    +","
                    +"'"+tipos.getJSONObject(i).getString("descripcion")+"'"+
                    ");");
        }
    }

    /**
     * Deletes all rows from Clients
     */
    public void empty_Clients(){
        SQLiteDatabase db = this.getWritableDatabase();
        db.execSQL("DELETE FROM CLIENTE;");
    }

    /**
     * Deletes all rows from clientes
     */
    public void empty_Clase_clientes(){
        SQLiteDatabase db = this.getWritableDatabase();
        db.execSQL("DELETE FROM CLASE_CLIENTES;");
    }

    public void empty_Clase_sucursal(){
        SQLiteDatabase db = this.getWritableDatabase();
        db.execSQL("DELETE FROM CLASESUCURSAL;");
    }

    /**
     * Deletes all rows from Sucursales
     */
    public void empty_Sucursales(){
        SQLiteDatabase db = this.getWritableDatabase();
        db.execSQL("DELETE FROM SUCURSAL;");
    }

    /**
     * Deletes all rows form Clase
     */
    public void empty_clases(){
        SQLiteDatabase db = this.getWritableDatabase();
        db.execSQL("DELETE FROM CLASE;");
    }

    /**
     * Deletes all rows from tipo
     */
    public void empty_tipo(){
        SQLiteDatabase db = this.getWritableDatabase();
        db.execSQL("DELETE FROM TIPO;");
    }

    /**
     * Adds new client to the db
     * @param cedula client´s id
     * @param Primer_nombre client´s first name
     * @param Segundo_nombre client´s middle name
     * @param Primer_apellido client´s lastname 1
     * @param Segundo_apellido client´s lastname 2
     * @param correo client´s email
     * @param distrito client´s district
     * @param canton client´s town
     * @param provincia client´s province
     * @param contrasenna client´s password
     * @param Fecha_nacimiento client´s birthdate
     * @param peso client´s weight
     * @param Imc client´s IMC
     */
    public void addNewCliente(String cedula, String Primer_nombre, String Segundo_nombre,
                              String Primer_apellido, String Segundo_apellido, String correo,
                              String distrito, String canton, String provincia, String contrasenna,
                              String Fecha_nacimiento, String peso, String Imc) {
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
            values.put("Contrasena", contrasenna);
            values.put("Fecha_nacimiento", Fecha_nacimiento);
            values.put("Peso", peso);
            values.put("Imc", Imc);

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
                " AND Contrasena = "+"'"+contrasenna+"'", null);


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

    public Cursor getCliente() {
        SQLiteDatabase db = this.getWritableDatabase();
        Cursor cliente = db.rawQuery("SELECT * FROM CLIENTE;", null);
        return cliente;
    }

    /**
     *
     * @return todas las sucursales en la base de datos
     */
    public Cursor getSucursal() {

        SQLiteDatabase db = this.getWritableDatabase();

        // query to get Sucursal
        Cursor nombre_sucursales = db.rawQuery("SELECT * FROM SUCURSAL", null);

        // at last we are closing our
        // database after adding database.

        return nombre_sucursales;
    }

    /**
     *
     * @return todos los tipos de clase en la base de datos
     */
    public Cursor getTipo() {

        SQLiteDatabase db = this.getWritableDatabase();

        // query to get Sucursal
        Cursor nombre_tipo = db.rawQuery("SELECT * FROM TIPO", null);

        //db.close();
        return nombre_tipo;
    }
    public void addNewClase_Cliente(String clase_id, String cliente_cedula,String sucursal) {

        SQLiteDatabase db = this.getWritableDatabase();

        // variable for content values.
        ContentValues values = new ContentValues();

        // along with its key and value pair.
        values.put("Clase", clase_id);
        values.put("Cliente", cliente_cedula);
        values.put("Sucursal", sucursal);

        // insert content values to our table.
        db.insert("CLASE_CLIENTES", null, values);

    }


    /**
     *
     * @return cursor with the clases that the local user is subscribed to
     */
    public Cursor getClass_cliente(){
        SQLiteDatabase db=this.getWritableDatabase();
        Cursor clase=db.rawQuery("SELECT TIPO.Descripcion,ClASE_CLIENTES.Sucursal, CLASE.Dia, CLASE.Hora_inicio, CLASE.Hora_fin, CLASE.Instructor, CLASE.Capacidad, CLASE.Identificador  FROM  CLASE_CLIENTES \n"+
                " JOIN CLASE ON CLASE_CLIENTES.Clase = CLASE.Identificador"+
                " JOIN TIPO ON CLASE.Tipo = TIPO.Id;", null);
        return clase;
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


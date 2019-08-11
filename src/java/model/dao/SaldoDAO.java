/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import model.Conexion;
import org.json.simple.JSONObject;

/**
 *
 * @author Zero
 */
public class SaldoDAO {


    public SaldoDAO(){}

    public String setSaldo(int Id_cliente,int Saldo, int Estado,String Responsable){

       Conexion sql = new Conexion();
       String id_saldo = new String();
       
        try {
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Saldo_cliente(?,?,?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                  /* Parametros IN */
                 cstmt.setInt(1,Id_cliente);
                 cstmt.setInt(2,Saldo);
                 cstmt.setInt(3,Estado);
                 cstmt.setString(4,Responsable);

                 ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */

                 while (r.next()) {
                    id_saldo = r.getString("Id_cliente");
                  }
                      cstmt.close();
                      sql.getConexion().close();


        } catch (SQLException e) {
             System.out.println(e.getMessage());
        }
        return id_saldo;
    }

    public String read_Saldo(int Id_cliente){

           Conexion sql = new Conexion();
           JSONObject saldo = new JSONObject();

           try{
                      PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Saldo_cliente(?)}",
                      ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                        /* Parametros IN */
                       cstmt.setInt(1,Id_cliente);
                       ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */

                      while(r.next()){
                           /* Recibe saldo  */
                               saldo.put("Id_cliente",r.getString("Id_cliente"));
                               saldo.put("Saldo",r.getString("Saldo"));
                               saldo.put("Fecha",r.getString("Fecha"));
                               saldo.put("Responsable",r.getString("Responsable"));
                      }/* end while */

                      /* Close connection */
                        cstmt.close();
                        sql.getConexion().close();

           }catch(SQLException e){System.out.println(e.getMessage());}

        return saldo.toJSONString();

 }/* ## read saldo ##*/








}

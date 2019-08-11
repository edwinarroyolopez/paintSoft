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
import model.vo.ClienteVO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;


public class ClienteDAO {


     public ClienteDAO() {}

     public String Registrar(ClienteVO cliente){

            Conexion sql = new Conexion();
            String respuesta = new String();

       try {

                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Cliente(?,?,?,?,?,?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                  /* Parametros IN */
                 cstmt.setInt(1, cliente.getId());
                 cstmt.setString(2, cliente.getNombre());
                 cstmt.setString(3, cliente.getDocumento());
                 cstmt.setString(4, cliente.getTelefono());
                 cstmt.setString(5, cliente.getDireccion());
                 cstmt.setString(6, cliente.getCiudad());
                 cstmt.setString(7, cliente.getEmail());

                ResultSet  r = cstmt.executeQuery();

                 while (r.next()) {
                    respuesta = r.getString(1);
                }

                    cstmt.close();
                    sql.getConexion().close();


            } catch (SQLException e) {
                 System.out.println(e.getMessage());
            }
                  return respuesta;

    }

     public String read_Clientes(){

        Conexion sql = new Conexion();
        JSONArray list_clientes = new JSONArray();/* Lista de clientes */

        try{
                     PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Clientes()}",
                     ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                     ResultSet  r = cstmt.executeQuery();

                   while(r.next()){
                        /* Recibe clientes  */
                             JSONObject cliente = new JSONObject();
                                        cliente.put("Id",r.getInt("Id"));
                                        cliente.put("Nombre",r.getString("Nombre"));
                                        cliente.put("Documento",r.getString("Documento"));
                                        cliente.put("Telefono",r.getString("Telefono"));
                                        cliente.put("Direccion",r.getString("Direccion"));
                                        cliente.put("Ciudad",r.getString("Ciudad"));
                                        cliente.put("Email",r.getString("Email"));

                            list_clientes.add(list_clientes.size(),cliente);
                   }/* end while */

                   /* Close connection */
                        r.close();
                        cstmt.close();
                        sql.getConexion().close();

        }catch(SQLException e){System.out.println(e.getMessage());}

     return list_clientes.toJSONString();

  }/* ## read clientes ##*/

    public String get_Historia(int id_cliente){

        Conexion sql = new Conexion();
        JSONObject historia = new JSONObject();


        try{
                     PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_read_Historia(?)}",
                     ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                     cstmt.setInt(1,id_cliente);
                     ResultSet  r = cstmt.executeQuery();

                   while(r.next()){
                        /* Recibe historia del cliente  */
                        historia.put("Cerradas",r.getInt("Cerradas"));
                        historia.put("Pendientes",r.getInt("Pendientes"));
                        historia.put("Deuda",r.getInt("Deuda"));
                        historia.put("Saldo",r.getInt("Saldo"));
                   }/* end while */

                   /* Close connection */
                        r.close();
                        cstmt.close();
                        sql.getConexion().close();

        }catch(SQLException e){System.out.println(e.getMessage());}

        System.out.println(historia.toJSONString());

        return historia.toJSONString();
    }


  public String get_Facturas_cerradas(int id_cliente){

      Conexion sql = new Conexion();
      JSONArray list_facturas_cerradas = new JSONArray();/* Lista de facturas cerradas */
     

      try{
                   PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_read_Facturas_cerradas(?)}",
                   ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                   cstmt.setInt(1,id_cliente);
                   ResultSet  r = cstmt.executeQuery();

                 while(r.next()){
                      /* Recibe facturas cerradas del cliente  */
                     JSONObject factura = new JSONObject();
                                 factura.put("Id",r.getInt("Id"));
                                 factura.put("Numero",r.getString("Numero"));
                                 factura.put("Fecha",r.getString("Fecha"));
                                 factura.put("Forma_pago",r.getInt("Forma_pago"));
                                 factura.put("Valor",r.getInt("Valor"));
                                 list_facturas_cerradas.add(list_facturas_cerradas.size(),factura);
                 }/* end while */

                 /* Close connection */
                      r.close();
                      cstmt.close();
                      sql.getConexion().close();

      }catch(SQLException e){System.out.println(e.getMessage());}

      System.out.println(list_facturas_cerradas.toJSONString());

      return list_facturas_cerradas.toJSONString();
  }

  public String get_Facturas_pendientes(int id_cliente){

      Conexion sql = new Conexion();
        JSONArray list_facturas_pendientes = new JSONArray();/* Lista de facturas pendientes */


      try{
                   PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_read_Facturas_pendientes(?)}",
                   ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                   cstmt.setInt(1,id_cliente);
                   ResultSet  r = cstmt.executeQuery();

                 while(r.next()){
                      /* Recibe facturas abiertas del cliente  */
                      JSONObject factura = new JSONObject();
                                 factura.put("Id",r.getInt("Id"));
                                 factura.put("Numero",r.getString("Numero"));
                                 factura.put("Fecha",r.getString("Fecha"));
                                 factura.put("Forma_pago",r.getInt("Forma_pago"));
                                 factura.put("Valor",r.getInt("Valor"));
                                 factura.put("Saldo",r.getInt("Saldo"));
                                 list_facturas_pendientes.add(list_facturas_pendientes.size(),factura);
                 }/* end while */

                 /* Close connection */
                      r.close();
                      cstmt.close();
                      sql.getConexion().close();

      }catch(SQLException e){System.out.println(e.getMessage());}

      System.out.println(list_facturas_pendientes.toJSONString());

      return list_facturas_pendientes.toJSONString();
  }


}

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
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 *
 * @author Zero
 */
public class EstadisticaDAO {


    public EstadisticaDAO(){}

    /*
        spd_Estadistica_ganancia_gasto_diario
    */

    public String getGasto_Ganancia_diaria(){

            String json_gasto_ganancia = new String();

             Conexion sql = new Conexion();

                 try{

                     PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_Estadistica_ganancia_gasto_diario()}",
                                               ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                             /* Parámetros IN */

                         ResultSet r = cstmt.executeQuery();

                         while(r.next()){

                                json_gasto_ganancia =  "[{\"Ganancia\":"+r.getString("Ganancia")+
                                                       ",\"Gasto\":"+r.getString("Gasto")+"}]";
                         }

                 }catch(SQLException e){System.out.println(e.getMessage());}

            return json_gasto_ganancia;
    }

    /* get Informe de ventas  */
      public String getInforme_ventas(String fecha_inicial,String fecha_final){

            Conexion sql = new Conexion();
            JSONArray list_ventas = new JSONArray();/* Lista de ventas */

            try{
                         PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_Informe_ventas(?,?)}",
                         ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                         /* Parametros IN */
                          cstmt.setString(1, fecha_inicial);
                          cstmt.setString(2, fecha_final);
                         ResultSet  r = cstmt.executeQuery();

                       while(r.next()){
                            /* Recibe clientes  */
                             JSONObject venta = new JSONObject();
                                        venta.put("Valor",r.getInt("Valor"));
                                        venta.put("Forma_pago",r.getString("Forma_pago"));
                                        venta.put("Ganancia",r.getInt("Ganancia"));
                                        venta.put("Facturas",r.getInt("Facturas"));
                                        venta.put("Fecha",r.getString("Fecha"));
                                        venta.put("Numero_factura",r.getString("Numero_factura"));
                                        venta.put("Cliente",r.getString("Cliente"));
                                        venta.put("Estado",r.getString("Estado"));

                            list_ventas.add(list_ventas.size(),venta);
                       }/* end while */

                       /* Close connection */
                            r.close();
                            cstmt.close();
                            sql.getConexion().close();

            }catch(SQLException e){System.out.println(e.getMessage());}

         return list_ventas.toJSONString();
    } /* ## getInforme_ventas ## */

    /* get Informe facturas credito  */
      public String getInforme_facturas_credito(String fecha_inicial,String fecha_final){

            Conexion sql = new Conexion();
            JSONArray list_creditos = new JSONArray();/* Lista de creditos */

            try{
                         PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_Informe_facturas_credito(?,?)}",
                         ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                         /* Parametros IN */
                          cstmt.setString(1, fecha_inicial);
                          cstmt.setString(2, fecha_final);
                         ResultSet  r = cstmt.executeQuery();

                       while(r.next()){
                            /* Recibe creditos  */
                             JSONObject credito = new JSONObject();
                                        credito.put("Fecha",r.getString("Fecha"));
                                        credito.put("Valor",r.getInt("Valor"));
                                        credito.put("Saldo",r.getInt("Saldo"));
                                        credito.put("Numero_factura",r.getString("Numero_factura"));
                                        credito.put("Ganancia",r.getInt("Ganancia"));
                                        credito.put("Cliente",r.getString("Cliente"));
                                        credito.put("Estado",r.getString("Estado"));
                                        credito.put("Abonos",r.getString("Abonos"));
                                        credito.put("Ultimo_abono",r.getString("Ultimo_abono"));
                                        credito.put("Valor_ultimo_abono",r.getInt("Valor_ultimo_abono"));

                            list_creditos.add(list_creditos.size(),credito);
                       }/* end while */

                       /* Close connection */
                            r.close();
                            cstmt.close();
                            sql.getConexion().close();

            }catch(SQLException e){System.out.println(e.getMessage());}

         return list_creditos.toJSONString();

    } /* ## getInforme_facturas_credito ## */


    /* get Informe porductos agotados  */
      public String getInforme_productos_agotados (){

            Conexion sql = new Conexion();
            JSONArray list_productos = new JSONArray();/* Lista de productos agotados */

            try{
                         PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_Informe_productos_agotados()}",
                         ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                         ResultSet  r = cstmt.executeQuery();

                       while(r.next()){
                            /* Recibe clientes  */
                             JSONObject producto = new JSONObject();
                                        producto.put("Id",r.getString("Id"));
                                        producto.put("Id_producto",r.getString("Id_producto"));
                                        producto.put("Descripcion",r.getInt("Descripcion"));
                                        producto.put("Presentacion",r.getString("Presentacion"));
                                        producto.put("Venta",r.getString("Venta"));
                                        producto.put("Stock",r.getString("Stock"));
                                        producto.put("Estado",r.getString("Estado"));
                                        producto.put("Id_unidad_medida",r.getString("Id_unidad_medida"));
                                        producto.put("Fecha",r.getString("Fecha"));
                                        producto.put("Fecha_modificacion",r.getString("Fecha_modificacion"));
                                        producto.put("Precio_venta",r.getString("Precio_venta"));

                            list_productos.add(list_productos.size(),producto);
                       }/* end while */

                       /* Close connection */
                            r.close();
                            cstmt.close();
                            sql.getConexion().close();

            }catch(SQLException e){System.out.println(e.getMessage());}

         return list_productos.toJSONString();

    } /* ## getInforme_productos_agotados ## */

}

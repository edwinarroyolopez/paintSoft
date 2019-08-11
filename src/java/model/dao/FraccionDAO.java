
package model.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import model.Conexion;
import model.vo.FraccionVO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;


public class FraccionDAO {

    /**/
    public FraccionDAO(){}

    public String registrar(FraccionVO fraccion){

                Conexion sql = new Conexion();
                String Id = new String();

        try {

                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Fraccion(?,?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                  /* Parametros IN */
                 cstmt.setInt(1, fraccion.getId_unidad_medida());
                 cstmt.setString(2, fraccion.getFraccion());
                 cstmt.setFloat(3, fraccion.getProporcion());


                ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */

                 while (r.next()) {
                    Id = r.getString(1);
                }

                    cstmt.close();
                    sql.getConexion().close();


        } catch (SQLException e) {
             System.out.println(e.getMessage());
        }

        return Id;


    }
    public String listFracciones(int pmtId_unidad_medida,int pmtId_producto){

        Conexion sql= new Conexion();
        JSONArray list_fracciones = new JSONArray();/* Lista de fracciones */

      try
      {
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Fracciones(?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                 /* Parametros IN */
                 cstmt.setInt(1, pmtId_unidad_medida);
                 cstmt.setInt(2, pmtId_producto);
                 ResultSet  r = cstmt.executeQuery();

                        while (r.next()) {

                          JSONObject fraccion = new JSONObject();
                                     fraccion.put("Id",r.getString("Id_fraccion"));
                                     fraccion.put("Id_unidad_medida",r.getString("Id_unidad_medida"));
                                     fraccion.put("Fraccion",r.getString("Fraccion"));
                                     fraccion.put("Precio_fraccion",r.getString("Precio_fraccion"));
                                     fraccion.put("Proporcion",r.getString("Proporcion"));
                                     list_fracciones.add(list_fracciones.size(),fraccion);
                        }
                          cstmt.close();
                          sql.getConexion().close();

            }catch (SQLException e) {
                 System.out.println(e.getMessage());
            }

            return list_fracciones.toJSONString();
    }

    public String addPrecio_fraccion(int pmtId_producto, int pmtId_unidad, int pmtId_fraccion, int pmtPrecio_fraccion ){

                            Conexion sql = new Conexion();
                            String respuesta="";

                            try {

                                    PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Precio_fraccion(?,?,?,?)}",
                                    ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                                      /* Parametros IN */
                                     cstmt.setInt(1, pmtId_producto);
                                     cstmt.setInt(2, pmtId_unidad);
                                     cstmt.setInt(3, pmtId_fraccion);
                                     cstmt.setFloat(4, pmtPrecio_fraccion);

                                     ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */

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

    public String listPrecioFracciones(int pmtId_producto,int pmtId_unidad_medida){

        String listPrecioFracciones = "";
        Conexion sql= new Conexion();

      try
      {

                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Precio_Fracciones(?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                 /* Parametros IN */
                 cstmt.setInt(1, pmtId_producto);
                 cstmt.setInt(2, pmtId_unidad_medida);

                 ResultSet  r = cstmt.executeQuery();

                 listPrecioFracciones = "[";

                        while (r.next()) {

                            String id = String.valueOf(r.getInt("Id"));
                            String precio_fraccion  = String.valueOf(r.getFloat("Precio_fraccion"));
                            String fraccion = r.getString("Fraccion");
                            String proporcion = String.valueOf(r.getFloat("Proporcion"));

                             listPrecioFracciones = listPrecioFracciones + "{\"Id\":"+ id +",\"Precio_fraccion\":"+precio_fraccion +
                                     ",\"Fraccion\":\""+fraccion+"\",\"Proporcion\":"+proporcion+"}";

                             if(r.isLast()==false){
                                 listPrecioFracciones = listPrecioFracciones + ",";
                             }

                        }

                    listPrecioFracciones = listPrecioFracciones + "]";

                    cstmt.close();
                    sql.getConexion().close();

            }catch (SQLException e) {
                 System.out.println(e.getMessage());
            }

        return listPrecioFracciones;

    }

    /* Eliminar fraccion a partir del Id y la unidad medida */
    public String Delete_Fraccion(int pmtId_unidad_medida,int pmtId_fraccion){

        String response = new String();
        Conexion sql = new Conexion();

          System.out.println("Inicia eliminar...");

        try{

            PreparedStatement pstmt = sql.getConexion().prepareStatement("{call spd_D_Fraccion(?,?)}",ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                    /* Parámetros para SQL */
                    pstmt.setInt(1, pmtId_unidad_medida);
                    pstmt.setInt(2, pmtId_fraccion);

                    /* Resultados de la consulta empaquetados */
                    ResultSet r = pstmt.executeQuery();

                    while(r.next()){/* Recorrido de resultados */
                        response = r.getString("response");
                    }

                    /* Cerrar conexión */
                    pstmt.close();
                    sql.getConexion().close();

        }catch(SQLException e){System.out.println(e.getMessage());}

        return response;
    }

     /* Eliminar fraccion a partir del Id y la unidad medida */
    public String Buscar_fraccion(int pmtId_fraccion){

        String fraccion = new String();
        Conexion sql = new Conexion();

          System.out.println("Inicia eliminar...");

        try{

            PreparedStatement pstmt = sql.getConexion().prepareStatement("{call spd_F_Fraccion_devolucion(?)}",ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                    /* Parámetros para SQL */
                    pstmt.setInt(1, pmtId_fraccion);

                    /* Resultados de la consulta empaquetados */
                    ResultSet r = pstmt.executeQuery();

                    while(r.next()){/* Recorrido de resultados */
                        fraccion = r.getString("Fraccion");
                    }

                    /* Cerrar conexión */
                    pstmt.close();
                    sql.getConexion().close();

        }catch(SQLException e){System.out.println(e.getMessage());}

        return fraccion;
    }

}

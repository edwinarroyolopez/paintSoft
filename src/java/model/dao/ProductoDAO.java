
package model.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import model.Conexion;
import model.vo.ProductoVO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class ProductoDAO {

public ProductoDAO(){

}

public String Registrar(ProductoVO producto){

    String json_producto = new String();
    Conexion sql = new Conexion();

      try {

                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Producto(?,?,?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                  /* Parametros IN */
                 cstmt.setInt(1, producto.getId_Grupo());
                 cstmt.setInt(2, producto.getId_Marca());
                 cstmt.setString(3, producto.getCodigo());
                 cstmt.setString(4, producto.getDescripcion());

                ResultSet  r = cstmt.executeQuery();

                 while (r.next()) {

                    json_producto = "[{\"Id\":"+r.getString("Id")+
                                    ",\"Id_grupo\":"+producto.getId_Grupo()+
                                    ",\"Grupo\":\""+producto.getGrupo()+
                                    "\",\"Id_marca\":"+producto.getId_Marca()+
                                    ",\"Marca\":\""+producto.getMarca()+
                                    "\",\"Codigo\":\""+producto.getCodigo()+
                                    "\",\"Descripcion\":\""+producto.getDescripcion()+"\"}]";
                }

                    cstmt.close();
                    sql.getConexion().close();

            } catch (SQLException e) {
                 System.out.println(e.getMessage());
            }

    return json_producto;
}


 public String read_Productos(){

         Conexion sql = new Conexion();
        JSONArray list_productos = new JSONArray();/* Lista de productos */

        try{
                 PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Productos()}",
                        ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                ResultSet  r = cstmt.executeQuery();

                   while(r.next()){ /* Recibe prodcutos  */

                     JSONObject producto = new JSONObject();
                           producto.put("Id",r.getInt("Id"));
                           producto.put("Id_grupo",String.valueOf(r.getInt("Id_grupo")));
                           producto.put("Id_marca",String.valueOf(r.getInt("Id_marca")));
                           producto.put("Codigo",r.getString("Codigo"));
                           producto.put("Descripcion",r.getString("Descripcion"));
                           producto.put("Marca",r.getString("Marca"));
                           producto.put("Grupo",r.getString("Grupo"));
                           producto.put("Id_medida",String.valueOf(r.getInt("Id_medida")));
                           list_productos.add(list_productos.size(),producto);
                   }

            /* Close connection */
                   r.close();
                   cstmt.close();
                   sql.getConexion().close();
    }catch(SQLException e){System.out.println(e.getMessage());}

        return list_productos.toJSONString();
 }




public String getMax_codigo_producto(int pmtId_grupo, int pmtId_marca){



            Conexion sql= new Conexion();
             String Codigo = "";

              try
              {
                        PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Max_codigo_producto(?,?)}",
                        ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                          /* Parametros IN */
                            cstmt.setInt(1, pmtId_grupo);
                            cstmt.setInt(2, pmtId_marca);

                            ResultSet  r = cstmt.executeQuery();

                            while (r.next()) {
                                Codigo = String.valueOf(r.getString("Codigo"));
                            }

                            cstmt.close();
                            sql.getConexion().close();

            }catch (SQLException e) {
                 System.out.println(e.getMessage());
            }




    return Codigo;
}

public String getProductos_by_IdGrupoIdMarca(int pmtId_grupo, int pmtId_marca){


            Conexion sql = new Conexion();
            String listProductos = new String();

              try
              {
                        PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Productos_by_IdGrupoIdMarca(?,?)}",
                        ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                          /* Parametros IN */
                            cstmt.setInt(1, pmtId_grupo);
                            cstmt.setInt(2, pmtId_marca);

                            ResultSet  r = cstmt.executeQuery();
                            listProductos = "[";

                            while (r.next()) {

                                    String id = String.valueOf(r.getInt("Id"));
                                    String id_grupo = String.valueOf(r.getInt("Id_grupo"));
                                    String grupo = r.getString("Grupo");
                                    String id_marca = String.valueOf(r.getInt("Id_marca"));
                                    String marca = r.getString("Marca");
                                    String codigo = r.getString("Codigo");
                                    String descripcion = r.getString("Descripcion");

                                    listProductos = listProductos + "{\"Id\":"+id+
                                            ",\"Id_grupo\":"+id_grupo+
                                            ",\"Grupo\":\""+grupo+
                                            "\",\"Id_marca\":"+id_marca+
                                            ",\"Marca\":\""+marca+
                                            "\",\"Codigo\":\""+codigo+
                                            "\",\"Descripcion\":\""+descripcion+"\"}";

                                    if(r.isLast()==false){
                                        listProductos = listProductos + ",";
                                    }
                               }
                                listProductos = listProductos + "]";

                            cstmt.close();
                            sql.getConexion().close();

            }catch (SQLException e) {
                 System.out.println(e.getMessage());
            }




    return listProductos;
}

public String Insert_desde_txt(int pmtId, String pmtDescripcion){


 Conexion sql = new Conexion();


              try
              {
                        PreparedStatement cstmt = sql.getConexion().prepareStatement("UPDATE tblProducto SET Descripcion=? WHERE Id =? ",
                        ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                          /* Parametros IN */
                            cstmt.setString(1, pmtDescripcion);
                            cstmt.setInt(2, pmtId);


                            ResultSet  r = cstmt.executeQuery();


                            while (r.next()) {

                            }


                            cstmt.close();
                            sql.getConexion().close();

            }catch (SQLException e) {
                 System.out.println(e.getMessage());
            }

              return "Listo!";
}

/* Eliminar producto */
public String Eliminar_producto(int pmtId_producto){

    String response = new String();
    Conexion sql = new Conexion();

     try
              {
                        PreparedStatement cstmt = sql.getConexion().prepareStatement("DELETE FROM tblProducto  WHERE Id =? ",
                        ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                          /* Parametros IN */
                            cstmt.setInt(1, pmtId_producto);
                            ResultSet  r = cstmt.executeQuery();

                            while (r.next()) {

                            }


                            cstmt.close();
                            sql.getConexion().close();

            }catch (SQLException e) {
                 System.out.println(e.getMessage());
            }


    return response;
}

public String read_Presentaciones(int Id_producto){
        
        Conexion sql = new Conexion();
        JSONArray list_presentaciones = new JSONArray();/* Lista de presentaciones de un producto */
        
         try {

                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_read_Presentaciones(?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                  /* Parametros IN */
                 cstmt.setInt(1,Id_producto);

                 ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */


                 while (r.next()) {

                     JSONObject presentacion = new JSONObject();
                                presentacion.put("Id",String.valueOf(r.getInt("Id_unidad_medida")));
                                presentacion.put("Unidad_medida", r.getString("Unidad_medida"));
                                presentacion.put("Stock",r.getInt("Stock"));
                                presentacion.put("Precio_venta",String.valueOf(r.getInt("Precio_venta")));
                                presentacion.put("Iva",String.valueOf(r.getFloat("Iva")));
                                list_presentaciones.add(list_presentaciones.size(),presentacion);
                    }
                      cstmt.close();
                      sql.getConexion().close();


        } catch (SQLException e) {
             System.out.println(e.getMessage());
        }
         
         System.out.println(list_presentaciones.toJSONString());
        return list_presentaciones.toJSONString();
}


public String getStockProducto(int Control,int Id_producto, int Id_medida){

       Conexion sql = new Conexion();
       String listStockProducto = "[";




        try {

                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Stock_producto(?,?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                  /* Parametros IN */
                 cstmt.setInt(1,Control);
                 cstmt.setInt(2,Id_producto);
                 cstmt.setInt(3,Id_medida);

                 ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */


                 while (r.next()) {

                        listStockProducto = listStockProducto + "{";
                        /* Parámetros recibidos */
                        String stock = String.valueOf(r.getInt("Stock"));
                        String id_unidad_medida = String.valueOf(r.getInt("Id_unidad_medida"));
                        String unidad_medida = r.getString("Unidad_medida");
                        String precio_venta = String.valueOf(r.getInt("Precio_venta"));
                        String iva = String.valueOf(r.getFloat("Iva"));

                        listStockProducto = listStockProducto +  "\"Stock\":"+stock+
                                ",\"Id\":"+id_unidad_medida+
                                ",\"Id_medida\":"+Id_medida+
                                ",\"Precio_venta\":"+precio_venta+
                                ",\"Iva\":"+iva+
                                ",\"Unidad_medida\":\""+unidad_medida+"\"}";

                        if(r.isLast()==false){
                                 listStockProducto = listStockProducto + ",";
                        }
                    }

                        listStockProducto = listStockProducto + "]";
                        cstmt.close();
                        sql.getConexion().close();


        } catch (SQLException e) {
             System.out.println(e.getMessage());
        }
        return listStockProducto;
    }


}

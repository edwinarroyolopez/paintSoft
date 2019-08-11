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
import model.vo.FacturaDetalleVO;

/**
 *
 * @author Zero
 */
public class FacturaDetalleDAO {
    
    public FacturaDetalleDAO(){}
    
    
     public String setFactura_detalle_compra( FacturaDetalleVO Factura_detalle ){
    
      Conexion sql = new Conexion();
        String respuesta="";
        
        try {
                        
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Factura_detalle(?,?,?,?,?,?,?,?,?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                
                  /* Parametros IN */
                 cstmt.setInt(1, Factura_detalle.getId_encabezado());
                 cstmt.setInt(2, Factura_detalle.getId_producto());
                 cstmt.setInt(3, Factura_detalle.getId_unidad());
                 cstmt.setInt(4, Factura_detalle.getCantidad());
                 cstmt.setFloat(5, Factura_detalle.getPrecio_unidad());
                 cstmt.setFloat(6, Factura_detalle.getPrecio_venta());
                 cstmt.setFloat(7, Factura_detalle.getMargen_ganancia());
                 cstmt.setFloat(8, Factura_detalle.getDescuento());
                 cstmt.setFloat(9, Factura_detalle.getIva());
                 cstmt.setBoolean(10, Factura_detalle.getEstado());
                 
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
    
     public String setFactura_Venta( FacturaDetalleVO Factura_detalle ){
    
      Conexion sql = new Conexion();
      String respuesta="";
        
        try {
                        
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Factura_detalle_venta(?,?,?,?,?,?,?,?,?,?,?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                
                  /* Parametros IN */
                 cstmt.setInt(1, Factura_detalle.getId_encabezado());
                 cstmt.setInt(2, Factura_detalle.getId_producto());
                 cstmt.setInt(3, Factura_detalle.getId_unidad());
                 cstmt.setInt(4, Factura_detalle.getTipo());
                 cstmt.setInt(5, Factura_detalle.getId_fraccion());
                 cstmt.setInt(6, Factura_detalle.getCantidad());
                 cstmt.setFloat(7, Factura_detalle.getPrecio_unidad());
                 cstmt.setFloat(8, Factura_detalle.getDescuento());
                 cstmt.setFloat(9, Factura_detalle.getIva());
                 cstmt.setBoolean(10, Factura_detalle.getEstado());                 
                 cstmt.setFloat(11, Factura_detalle.getRestante());  
                 cstmt.setInt(12, Factura_detalle.getResta_inventario());

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
    public String setDetalle_formula(int pmtId_unidad,int pmtPrecio_unidad,int pmtCantidad,Float  pmtDescuento, Float pmtIva,int pmtId_formula){
        
        String Id = new String();
        Conexion sql = new Conexion();
        
        try{
            
                PreparedStatement pstmt = sql.getConexion().prepareStatement("{call spd_S_Detalle_formula_venta(?,?,?,?,?,?)}",ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                pstmt.setInt(1, pmtId_unidad);
                pstmt.setInt(2, pmtPrecio_unidad);
                pstmt.setInt(3, pmtCantidad);
                pstmt.setFloat(4, pmtDescuento);
                pstmt.setFloat(5, pmtIva);
                pstmt.setInt(6, pmtId_formula);

                ResultSet r = pstmt.executeQuery();

                while(r.next()){
                    Id = r.getString("Id");
                }
            
        }catch(SQLException e){System.out.println(e.getMessage());}
        
        return Id;
    }
    
    public String Descontar_productos_formula(int pmtId_producto,int pmtId_unidad_medida,int pmtSalida_empezada,
                                              int pmtRestante_empezada,int pmtSalida_entera,int pmtRestante_entera){
        String Id = new String();
        Conexion sql = new Conexion();
        
        try{
            
            PreparedStatement pstmt = sql.getConexion().prepareStatement("{call spd_S_Descontar_productos_formula(?,?,?,?,?,?)}",ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
            
            pstmt.setInt(1, pmtId_producto);
            pstmt.setInt(2, pmtId_unidad_medida);
            pstmt.setInt(3, pmtSalida_empezada);
            pstmt.setInt(4, pmtRestante_empezada);
            pstmt.setInt(5, pmtSalida_entera);
            pstmt.setInt(6, pmtRestante_entera);
            
            ResultSet r = pstmt.executeQuery();
            
            while(r.next()){
                Id = r.getString("Id");
            }
            
            
        }catch(SQLException e){System.out.println(e.getMessage());}
        
        
    
        return Id;
    }
    /* Get detalle factura venta */
    public String getFactura_detalle_venta(int pmtId_factura){
    
            String json_factura_detalle = new String();
            Conexion sql = new Conexion();
        
        
                    try {

                            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Detalle_factura_venta(?)}",
                            ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                              /* Parametros IN */
                              cstmt.setInt(1, pmtId_factura);
                              
                              ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */

                             while (r.next()) {   

                                        if(r.isFirst()){/* Primer registro*/
                                            json_factura_detalle = "[";
                                        }

                                           /* Recibe datos desde bd */
                                              int Id_detalle = r.getInt("Id");
                                              int Id_encabezado_factura = r.getInt("Id_encabezado_venta");
                                              int Id_unidad= r.getInt("Id_unidad");
                                              int Tipo= r.getInt("Tipo");
                                              int Id_fraccion= r.getInt("Id_fraccion");
                                              int Cantidad= r.getInt("Cantidad");
                                              int Precio_unidad= r.getInt("Precio_unidad");
                                            float Descuento= r.getInt("Descuento");
                                            float Iva= r.getInt("Iva");
                                              int Estado= r.getInt("Estado");
                                              int Id_producto= r.getInt("Id_producto");
                                              int Id_formula= r.getInt("Id_formula");
                                           String Descripcion = r.getString("Descripcion");
                                           String Codigo = r.getString("Codigo");
                                           String Unidad = r.getString("Unidad");

                                           /* Configura datos en forma de json's */
                                            json_factura_detalle = json_factura_detalle + "{\"Id_detalle\":"+Id_detalle+
                                                   ",\"Id_encabezado_factura\":"+Id_encabezado_factura+
                                                   ",\"Id_unidad\":"+Id_unidad+
                                                   ",\"Tipo\":"+Tipo+
                                                   ",\"Id_fraccion\":"+Id_fraccion+
                                                   ",\"Cantidad\":"+Cantidad+
                                                   ",\"Precio_unidad\":"+Precio_unidad+
                                                   ",\"Descuento\":"+Descuento+
                                                   ",\"Iva\":"+Iva+
                                                   ",\"Estado\":"+Estado+
                                                   ",\"Id_producto\":"+Id_producto+
                                                   ",\"Id_formula\":"+Id_formula+
                                                   ",\"Descripcion\":\""+Descripcion+
                                                   "\",\"Codigo\":\""+Codigo+ 
                                                   "\",\"Unidad\":\""+Unidad+"\"}";

                                           if(r.isLast()==false){
                                               json_factura_detalle = json_factura_detalle + ",";
                                           }else{/* Ultimo registro */
                                               json_factura_detalle = json_factura_detalle +"]";
                                           }
                              }

                                cstmt.close();
                                sql.getConexion().close();


                    } catch (SQLException e) {
                         System.out.println(e.getMessage());
                    }
            
            
            
            
            return json_factura_detalle;
    }
 
    
    
    /* Get detalle factura venta */
    public String getFactura_detalle_compra(int pmtId_factura){
    
            String json_factura_detalle = new String();
            Conexion sql = new Conexion();
        
        
                    try {

                            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Detalle_factura_compra(?)}",
                            ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                              /* Parametros IN */
                              cstmt.setInt(1, pmtId_factura);
                              
                              ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */

                             while (r.next()) {   

                                        if(r.isFirst()){/* Primer registro*/
                                            json_factura_detalle = "[";
                                        }
                                            
                                           /* Recibe datos desde bd */
                                              int Id_detalle = r.getInt("Id");
                                              int Id_encabezado_factura = r.getInt("Id_encabezado");
                                              int Id_unidad= r.getInt("Id_unidad");
                                              int Cantidad= r.getInt("Cantidad");
                                              int Precio_unidad= r.getInt("Precio_unidad");
                                            float Descuento= r.getInt("Descuento");
                                            float Iva= r.getInt("Iva");
                                              int Estado= r.getInt("Estado");
                                              int Id_producto= r.getInt("Id_producto");
                                           String Descripcion = r.getString("Descripcion");
                                           String Codigo = r.getString("Codigo");
                                           String Unidad = r.getString("Unidad");

                                           /* Configura datos en forma de json's */
                                            json_factura_detalle = json_factura_detalle + "{\"Id_detalle\":"+Id_detalle+
                                                   ",\"Id_encabezado_factura\":"+Id_encabezado_factura+
                                                   ",\"Id_unidad\":"+Id_unidad+
                                                   ",\"Cantidad\":"+Cantidad+
                                                   ",\"Precio_unidad\":"+Precio_unidad+
                                                   ",\"Descuento\":"+Descuento+
                                                   ",\"Iva\":"+Iva+
                                                   ",\"Estado\":"+Estado+
                                                   ",\"Id_producto\":"+Id_producto+
                                                   ",\"Descripcion\":\""+Descripcion+
                                                   "\",\"Codigo\":\""+Codigo+ 
                                                   "\",\"Unidad\":\""+Unidad+"\"}";

                                           if(r.isLast()==false){
                                               json_factura_detalle = json_factura_detalle + ",";
                                           }else{/* Ultimo registro */
                                               json_factura_detalle = json_factura_detalle +"]";
                                           }
                              }

                                cstmt.close();
                                sql.getConexion().close();


                    } catch (SQLException e) {
                         System.out.println(e.getMessage());
                    }
            
            
            return json_factura_detalle;
    }
    
     public String Eliminar_factura_venta(int pmtId_factura){
    
            String result = new String();
            Conexion sql = new Conexion();
        
        
                    try {

                            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_Eliminar_factura(?)}",
                            ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                              /* Parametros IN */
                              cstmt.setInt(1, pmtId_factura);
                              
                              ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */

                             while (r.next()) {                                           
                                 result =  r.getString("result");
                              }

                                cstmt.close();
                                sql.getConexion().close();


                    } catch (SQLException e) {
                         System.out.println(e.getMessage());
                    }
            
            
            return result;
    }
     
     public String Captura_factura_compra(String Numero,String Fecha_ingreso,String Fecha_pago,String Proveedor,String Id_proveedor, String Valor_factura){
    
            String result = new String();
            Conexion sql = new Conexion();
       
                    try {

                            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_CapturaFacturaCompra(?,?,?,?,?,?,?)}",
                            ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                              /* Parametros IN */
                              cstmt.setString(1, Numero);
                              cstmt.setString(2, Fecha_ingreso);
                              cstmt.setString(3, Fecha_pago);
                              cstmt.setString(4, Proveedor);
                              cstmt.setString(5, Id_proveedor);
                              cstmt.setString(6, Valor_factura);
                              cstmt.setInt(7, 1);/* Estado */
                              
                              ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */

                             while (r.next()) {                                           
                                 result =  r.getString("result");
                              }

                                cstmt.close();
                                sql.getConexion().close();


                    } catch (SQLException e) {
                         System.out.println(e.getMessage());
                    }
            
            
            return result;
    }
     
     public String carga_Captura_factura_compra(){
    
            String json_captura_factura_compra = new String();
            Conexion sql = new Conexion();
        
                    try {
                            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Captura_factura_compra()}",
                            ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                              /* Parametros IN */
                              
                              ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */

                             while (r.next()) {   

                                        if(r.isFirst()){/* Primer registro*/
                                            json_captura_factura_compra = "[";
                                        }
                                            
                                           /* Recibe datos desde bd */
                                              int Id = r.getInt("Id");
                                              String Numero_factura = r.getString("Numero_factura");
                                              String Fecha_ingreso = r.getString("Fecha_ingreso");
                                              String Fecha_pago = r.getString("Fecha_pago");
                                              String Proveedor = r.getString("Proveedor");
                                              int Id_proveedor = r.getInt("Id_proveedor");
                                              String Valor_factura = r.getString("Valor_factura");
                                              int Estado = r.getInt("Estado");

                                           /* Configura datos en forma de json's */
                                            json_captura_factura_compra = json_captura_factura_compra + 
                                                   "{\"Id\":"+Id+
                                                   ",\"Numero_factura\":\""+Numero_factura+
                                                   "\",\"Fecha_ingreso\":\""+Fecha_ingreso+
                                                   "\",\"Fecha_pago\":\""+Fecha_pago+
                                                   "\",\"Proveedor\":\""+Proveedor+
                                                   "\",\"Id_proveedor\":\""+Id_proveedor+
                                                   "\",\"Valor_factura\":\""+Valor_factura+
                                                   "\",\"Estado\":\""+Estado+"\"}";

                                           if(r.isLast()==false){
                                               json_captura_factura_compra = json_captura_factura_compra + ",";
                                           }else{/* Ultimo registro */
                                               json_captura_factura_compra = json_captura_factura_compra +"]";
                                           }
                              }
                                cstmt.close();
                                sql.getConexion().close();

                    } catch (SQLException e) {
                         System.out.println(e.getMessage());
                    }
            
            
            return json_captura_factura_compra;
    
    }
     
     public String cerrar_factura(String id_factura){
    
            String result = new String();
            Conexion sql = new Conexion();
       
                    try {

                            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_CerrarFacturaCompra(?)}",
                            ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                              /* Parametros IN */
                              cstmt.setInt(1, Integer.parseInt(id_factura));
                              
                              ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */

                             while (r.next()) {                                           
                                 result =  r.getString("result");
                              }

                                cstmt.close();
                                sql.getConexion().close();


                    } catch (SQLException e) {
                         System.out.println(e.getMessage());
                    }
            
            
            return result;
    }
     
    public String borrar_factura(String id_factura){

           String result = new String();
           Conexion sql = new Conexion();

                   try {

                           PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_BorrarFacturaCompra(?)}",
                           ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                             /* Parametros IN */
                             cstmt.setInt(1, Integer.parseInt(id_factura));

                             ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */

                            while (r.next()) {                                           
                                result =  r.getString("result");
                             }

                               cstmt.close();
                               sql.getConexion().close();


                   } catch (SQLException e) {
                        System.out.println(e.getMessage());
                   }


           return result;
   }
    
    
      public String buscar_facturas_a_vencer(){
            String json_captura_factura_compra = new String();
            Conexion sql = new Conexion();
        
                    try {
                            PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_facturas_a_vencer_compra()}",
                            ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);

                              /* Parametros IN */
                              
                              ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */

                             while (r.next()) {   

                                        if(r.isFirst()){/* Primer registro*/
                                            json_captura_factura_compra = "[";
                                        }
                                            
                                           /* Recibe datos desde bd */
                                              int Id = r.getInt("Id");
                                              String Numero_factura = r.getString("Numero_factura");
                                              String Fecha_ingreso = r.getString("Fecha_ingreso");
                                              String Fecha_pago = r.getString("Fecha_pago");
                                              String Proveedor = r.getString("Proveedor");
                                              int Id_proveedor = r.getInt("Id_proveedor");
                                              String Valor_factura = r.getString("Valor_factura");
                                              int Estado = r.getInt("Estado");

                                           /* Configura datos en forma de json's */
                                            json_captura_factura_compra = json_captura_factura_compra + 
                                                   "{\"Id\":"+Id+
                                                   ",\"Numero_factura\":\""+Numero_factura+
                                                   "\",\"Fecha_ingreso\":\""+Fecha_ingreso+
                                                   "\",\"Fecha_pago\":\""+Fecha_pago+
                                                   "\",\"Proveedor\":\""+Proveedor+
                                                   "\",\"Id_proveedor\":\""+Id_proveedor+
                                                   "\",\"Valor_factura\":\""+Valor_factura+
                                                   "\",\"Estado\":\""+Estado+"\"}";

                                           if(r.isLast()==false){
                                               json_captura_factura_compra = json_captura_factura_compra + ",";
                                           }else{/* Ultimo registro */
                                               json_captura_factura_compra = json_captura_factura_compra +"]";
                                           }
                              }
                                cstmt.close();
                                sql.getConexion().close();

                    } catch (SQLException e) {
                         System.out.println(e.getMessage());
                    }
            System.out.println(json_captura_factura_compra);
            
            return json_captura_factura_compra;
   }
    
}


package model.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import model.Conexion;
import model.vo.ProveedorVO;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
public class ProveedorDAO {
   
    
    public  ProveedorDAO(){}
    
    public String Registrar(ProveedorVO proveedor){
    
        Conexion sql = new Conexion();
        String respuesta = "";
        
         try {
                       
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Proveedor(?,?,?,?,?,?,?,?,?,?,?,?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                             
                  /* Parametros IN */
                 cstmt.setString(1, proveedor.getRazon_social());
                 cstmt.setString(2, proveedor.getNit());
                 cstmt.setString(3, proveedor.getContacto());
                 cstmt.setString(4, proveedor.getCiudad());
                 cstmt.setString(5, proveedor.getDireccion());
                 cstmt.setString(6, proveedor.getTelefono_1());
                 cstmt.setString(7, proveedor.getTelefono_2());
                 cstmt.setString(8, proveedor.getEmail());
                 cstmt.setString(9, proveedor.getBanco());
                 cstmt.setString(10, proveedor.getTipo_cuenta());
                 cstmt.setString(11, proveedor.getNumero_cuenta());
                 cstmt.setString(12, proveedor.getTitular_cuenta());
                 
             
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
      
     public String read_Proveedores(){

        Conexion sql = new Conexion();
        JSONArray list_proveedores = new JSONArray();/* Lista de proveedores */

        try{
                     PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Proveedores()}",
                     ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                     ResultSet  r = cstmt.executeQuery();

                   while(r.next()){
                        /* Recibe proveedores  */
                         JSONObject proveedor = new JSONObject();
                                    proveedor.put("Id",r.getString("Id"));
                                    proveedor.put("Razon_Social",r.getString("Razon_Social"));
                                    proveedor.put("Nit",r.getString("Nit"));
                                    proveedor.put("Contacto",r.getString("Contacto"));
                                    proveedor.put("Ciudad",r.getString("Ciudad"));
                                    proveedor.put("Direccion",r.getString("Direccion"));
                                    proveedor.put("Telefono_1",r.getString("Telefono_1"));
                                    proveedor.put("Telefono_2",r.getString("Telefono_2"));
                                    proveedor.put("Email",r.getString("Email"));
                                    proveedor.put("Banco",r.getString("Banco"));
                                    proveedor.put("Tipo_Cuenta",r.getString("Tipo_Cuenta"));
                                    proveedor.put("Numero_Cuenta",r.getString("Numero_Cuenta"));
                                    proveedor.put("Titular_Cuenta",r.getString("Titular_Cuenta"));

                            list_proveedores.add(list_proveedores.size(),proveedor);
                   }/* end while */

                   /* Close connection */
                        r.close();
                        cstmt.close();
                        sql.getConexion().close();

        }catch(SQLException e){System.out.println(e.getMessage());}

     return list_proveedores.toJSONString();

  }/* ## read proveedores ##*/
   
   public String get_Historia(int id_proveedor){

        Conexion sql = new Conexion();
        JSONObject historia = new JSONObject();


        try{
                     PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_read_Historia_Proveedor(?)}",
                     ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                     cstmt.setInt(1,id_proveedor);
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
     
}

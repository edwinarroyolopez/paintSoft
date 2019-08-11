/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.dao;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import model.Conexion;
import model.vo.MarcaVO;


public class MarcaDAO {
    
    private LinkedList<MarcaVO> list;
    
    public MarcaDAO(){}
    
     public LinkedList<MarcaVO> getList(){return this.list;}
     public void setList(LinkedList<MarcaVO> list){ this.list = list;}
     
     
     public String getMarcas(){
     
           String listMarcas = "[" ;
             Conexion sql= new Conexion();

             try
             {
                       PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Marcas()}",
                       ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                       ResultSet  r = cstmt.executeQuery();

                               while (r.next()) {   
                                   
                                        String  id = String.valueOf(r.getInt("Id"));
                                        String  marca = r.getString("Marca");

                                        listMarcas = listMarcas + "{\"Id\":"+ id +
                                        ",\"Marca\":\"" + marca  +"\"}";

                                        if(r.isLast()==false){
                                            listMarcas = listMarcas + ",";
                                        }
                               }
                               listMarcas = listMarcas + "]";

                           cstmt.close();
                           sql.getConexion().close();

                   }catch (SQLException e) {
                        System.out.println(e.getMessage());
                   }

             return listMarcas;
     
     }
    
    public String Registrar(MarcaVO marca){
    
        Conexion sql = new Conexion();
        String json_marca = new String();
        
        try {
                        
                PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_S_Marca(?)}",
                ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                             
                  /* Parametros IN */
                 cstmt.setString(1, marca.getMarca());
             
                ResultSet  r = cstmt.executeQuery();/* Ejecuta procedimiento almacenado */
                                
                 while (r.next()) {                    
                     json_marca = "[{\"Marca\":\""+marca.getMarca()+"\",\"Id\":"+r.getString("Id")+"}]";
                }
                       
                    cstmt.close();
                    sql.getConexion().close();
            
            
        } catch (SQLException e) {
             System.out.println(e.getMessage());
        }
        
        return json_marca;
    }
    
    /* Busca todas las marcas */
    public String getMarcas(int pmtId_grupo){
     
                String json_marca = "[" ;
             Conexion sql= new Conexion();

             try
             {
                       PreparedStatement cstmt = sql.getConexion().prepareStatement("{call dbo.spd_F_Marca_por_IdGrupo(?)}",
                       ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_READ_ONLY);
                       /* Parametros IN */
                       cstmt.setInt(1,pmtId_grupo);
                       ResultSet  r = cstmt.executeQuery();
                       
                               while (r.next()) {   
                                   
                                        String  id = String.valueOf(r.getInt("Id"));
                                        String  marca = r.getString("Marca");

                                        json_marca = json_marca + "{\"Id\":"+ id +
                                        ",\"Marca\":\"" + marca  +"\"}";

                                        if(r.isLast()==false){
                                            json_marca = json_marca + ",";
                                        }
                                        
                                        
                               }
                               json_marca = json_marca + "]";

                           cstmt.close();
                           sql.getConexion().close();

                   }catch (SQLException e) {
                        System.out.println(e.getMessage());
                   }

             return json_marca;
     }
    
}

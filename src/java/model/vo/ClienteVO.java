/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.vo;

/**
 *
 * @author Zero
 */
public class ClienteVO {
    
    
    private int id;
    private String nombre;
    private String documento;
    private String telefono;
    private String direccion;
    private String ciudad;
    private String email;

    public ClienteVO() {
    }

    
    public ClienteVO(int id, String nombre, String documento, String telefono, String direccion, String ciudad, String email) {
        this.id = id;
        this.nombre = nombre;
        this.documento = documento;
        this.telefono = telefono;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.email = email;
    }

    
    public int getId() {return id;}
    public void setId(int id) {this.id = id;}

    public String getNombre() {return nombre;}
    public void setNombre(String nombre) { this.nombre = nombre;}

    public String getDocumento() {return documento;}
    public void setDocumento(String documento) {this.documento = documento;}
    
    public String getTelefono() {return telefono;}
    public void setTelefono(String telefono) {this.telefono = telefono;}

    public String getDireccion() {return direccion;}
    public void setDireccion(String direccion) {this.direccion = direccion;}

    public String getCiudad() {return ciudad;}
    public void setCiudad(String ciudad) {this.ciudad = ciudad;}

    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}
    
    
    
}

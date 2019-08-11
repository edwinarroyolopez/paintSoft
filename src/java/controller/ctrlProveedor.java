/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.dao.ProveedorDAO;
import model.vo.ProveedorVO;


public class ctrlProveedor extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
         response.setContentType("text/pain;charset=UTF-8");
         PrintWriter out = response.getWriter();
        
         ProveedorDAO opProveedor = new ProveedorDAO();
         int pmtId_proveedor;
         int pmtAction = Integer.parseInt(request.getParameter("Action"));
         
         String respuesta = "";
        
        switch(pmtAction){
            case 1:/* Save */
                
                /* Parámetros: Proveedor */
                    String pmtRazon_social = request.getParameter("Razon_social");
                    String pmtNit = request.getParameter("Nit");
                    String pmtContacto = request.getParameter("Contacto");
                    String pmtCiudad = request.getParameter("Ciudad");
                    String pmtDireccion = request.getParameter("Direccion");
                    String pmtTelefono_1 = request.getParameter("Telefono_1");
                    String pmtTelefono_2 = request.getParameter("Telefono_2");
                    String pmtEmail = request.getParameter("Email");
                    String pmtBanco = request.getParameter("Banco");
                    String pmtTipo_cuenta = request.getParameter("Tipo_cuenta");
                    String pmtNumero_cuenta = request.getParameter("Numero_cuenta");
                    String pmtTitular_cuenta = request.getParameter("Titular_cuenta");
                    
                    respuesta =  Registrar(pmtRazon_social, pmtNit, pmtContacto, pmtCiudad, pmtDireccion,pmtTelefono_1,
                                 pmtTelefono_2, pmtEmail, pmtBanco,pmtTipo_cuenta,pmtNumero_cuenta,pmtTitular_cuenta);
                    
                    response.getWriter().write(respuesta);
                break;
            case 2:/* Buscar todos los proveedores  */
                   response.getWriter().write(opProveedor.read_Proveedores());
                break;
            case 3:/* Buscar historia  */
                    pmtId_proveedor = Integer.parseInt(request.getParameter("Id_proveedor"));
                    response.getWriter().write(opProveedor.get_Historia(pmtId_proveedor));
                break;    
            default:
                break;
        
        }
    }
        public String Registrar(String pmtRazon_social, String pmtNit, String pmtContacto,String pmtCiudad,String pmtDireccion,
                                String pmtTelefono_1, String pmtTelefono_2,String pmtEmail,String pmtBanco, String pmtTipo_cuenta,
                                String pmtNumero_cuenta, String pmtTitular_cuenta){
        
        ProveedorVO proveedor = new ProveedorVO(0,pmtRazon_social, pmtNit, pmtContacto, pmtCiudad, pmtDireccion,pmtTelefono_1,
                                 pmtTelefono_2, pmtEmail, pmtBanco,pmtTipo_cuenta,pmtNumero_cuenta,pmtTitular_cuenta);
        ProveedorDAO opProveedor = new ProveedorDAO();
        return  opProveedor.Registrar(proveedor);
    }
    
    
    

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

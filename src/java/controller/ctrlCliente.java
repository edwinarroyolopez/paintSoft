/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.dao.ClienteDAO;
import model.vo.ClienteVO;

/**
 *
 * @author Zero
 */
public class ctrlCliente extends HttpServlet {

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
        
         ClienteDAO opCliente = new ClienteDAO();
         int pmtAction = Integer.parseInt(request.getParameter("Action"));
         int pmtId_cliente;
         String respuesta = "";
        
        switch(pmtAction){
            case 1:/* Save */
                /* Parámetros: Cliente */
                    pmtId_cliente = Integer.parseInt(request.getParameter("Id_cliente"));
                    String pmtNombre = request.getParameter("Nombre");
                    String pmtDocumento = request.getParameter("Documento");
                    String pmtTelefono = request.getParameter("Telefono");
                    String pmtDireccion = request.getParameter("Direccion");
                    String pmtCiudad = request.getParameter("Ciudad");
                    String pmtEmail = request.getParameter("Email");
                    
                    ClienteVO cliente = new ClienteVO(pmtId_cliente,pmtNombre, pmtDocumento, pmtTelefono,pmtDireccion, pmtCiudad, pmtEmail);
                    
                    respuesta = opCliente.Registrar(cliente);
                    response.getWriter().write(respuesta);
                    
                break;
            case 2:/* Buscar todos los clientes */
                    response.getWriter().write(opCliente.read_Clientes());
                break;
            case 3:/* Buscar historia  */
                    pmtId_cliente = Integer.parseInt(request.getParameter("Id_cliente"));
                    response.getWriter().write(opCliente.get_Historia(pmtId_cliente));
                break;    
            case 4:/* Facturas cerradas  */
                   pmtId_cliente = Integer.parseInt(request.getParameter("Id_cliente"));
                   response.getWriter().write(opCliente.get_Facturas_cerradas(pmtId_cliente));
               break;   
            case 5:/* Facturas pendientes */
                  pmtId_cliente = Integer.parseInt(request.getParameter("Id_cliente"));
                  response.getWriter().write(opCliente.get_Facturas_pendientes(pmtId_cliente));
              break;   
            default:
                break;
        
        }
                       
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

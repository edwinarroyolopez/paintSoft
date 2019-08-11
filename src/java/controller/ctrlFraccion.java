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
import model.dao.FraccionDAO;

/**
 *
 * @author Zero
 */
public class ctrlFraccion extends HttpServlet {

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
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
       
        /* Acceso a Datos del Objeto */
        FraccionDAO opFraccion = new FraccionDAO();
        
        /* Parámetros */
        int pmtAction = Integer.parseInt(request.getParameter("A"));
        int pmtId_unidad_medida;
        int pmtId_fraccion;
        
        switch(pmtAction){
            
            case 1:/* Eliminar fraccion */
                    pmtId_unidad_medida = Integer.parseInt(request.getParameter("Id_unidad_medida"));
                    pmtId_fraccion = Integer.parseInt(request.getParameter("Id_fraccion"));
                    
                    String r = opFraccion.Delete_Fraccion(pmtId_unidad_medida,pmtId_fraccion);
                    response.getWriter().write(r);
                    
                break;
                
             case 2:/* Buscar fracción */
                    pmtId_fraccion = Integer.parseInt(request.getParameter("Id_fraccion"));
                    
                    String fraccion = opFraccion.Buscar_fraccion(pmtId_fraccion);
                    response.getWriter().write(fraccion);
                    
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

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
import model.dao.SaldoDAO;

/**
 *
 * @author Pinturas Julian
 */
public class ctrlSaldo extends HttpServlet {

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

             int pmtAction = Integer.parseInt(request.getParameter("A"));
             int Id_cliente, Saldo, Estado;
             String Responsable;
             SaldoDAO opSaldo = new SaldoDAO();

            switch(pmtAction){
                case 1:/* Insertar saldo */
                       Id_cliente = Integer.parseInt(request.getParameter("Id_cliente"));
                       Saldo = Integer.parseInt(request.getParameter("Saldo_cliente"));
                       Estado = Integer.parseInt(request.getParameter("Estado"));
                       Responsable = request.getParameter("Responsable");

                       String id_saldo = opSaldo.setSaldo(Id_cliente,Saldo,Estado,Responsable);
                       response.getWriter().write(id_saldo);
                    break;
                case 2:/* Buscar saldos de un cliente */
                         Id_cliente = Integer.parseInt(request.getParameter("Id_cliente"));
                         String saldo = opSaldo.read_Saldo(Id_cliente);
                         response.getWriter().write(saldo);
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

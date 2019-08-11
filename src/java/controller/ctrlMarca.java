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
import model.dao.GrupoMarcaDAO;
import model.dao.MarcaDAO;
import model.vo.GrupoMarcaVO;
import model.vo.MarcaVO;

/**
 *
 * @author Zero
 */
public class ctrlMarca extends HttpServlet {

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
        
             MarcaDAO OpMarca = new MarcaDAO();
             
         int pmtAction = Integer.parseInt(request.getParameter("Action"));
          int pmtId_Grupo;
          String listMarcas;
          String respuesta = "";
        
        switch(pmtAction){
            case 1:/* Save */
                
                    /* Parámetros: Marca */
                     String pmtMarca = request.getParameter("Marca");
                    
                   /* Resgistra  Marcas */
                    MarcaVO  marca  = new MarcaVO(0,pmtMarca);
                    String json_marca =OpMarca.Registrar(marca);
                    response.getWriter().write(json_marca);  
                    
                break;
            case 2:/* Marca Grupo */
               
                    pmtId_Grupo = Integer.parseInt(request.getParameter("Id_grupo"));
                int pmtId_marca = Integer.parseInt(request.getParameter("Id_marca"));
                    GrupoMarcaDAO opGrupoMarca = new GrupoMarcaDAO();
                    GrupoMarcaVO grupo_marca = new GrupoMarcaVO(0, pmtId_Grupo, pmtId_marca);
                    respuesta =opGrupoMarca.Registrar(grupo_marca);
                    response.getWriter().write("\n"+respuesta);  
                break;
                case 3: /* Buscar marcas filtradas por Id grupo */
                        pmtId_Grupo = Integer.parseInt(request.getParameter("Id_grupo"));
                        json_marca = OpMarca.getMarcas(pmtId_Grupo);
                        response.getWriter().write(json_marca);
                    break;
                 case 4:/* Buscar marcas para DataGrid */
                        listMarcas = OpMarca.getMarcas();
                        response.getWriter().write(listMarcas);
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

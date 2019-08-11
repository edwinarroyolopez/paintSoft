
package controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.LinkedList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.dao.ProductoDAO;
import model.vo.ProductoVO;


public class ctrlProducto extends HttpServlet {

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


         ProductoDAO OpProducto = new ProductoDAO();

         int pmtAction =  Integer.parseInt(request.getParameter("Action"));
         int  pmtId_producto, pmtId_grupo, pmtId_marca;
         String listProductos = new String();


        switch(pmtAction){
            case 1:/* Save */

                /* Parámetros: Producto */
                     pmtId_grupo = Integer.parseInt(request.getParameter("Id_grupo"));
                     pmtId_marca = Integer.parseInt(request.getParameter("Id_marca"));
                     String pmtMarca = request.getParameter("Marca");
                     String pmtGrupo = request.getParameter("Grupo");
                     String pmtCodigo = request.getParameter("Codigo");
                     String pmtDescripcion = request.getParameter("Descripcion");

                  /* Resgistra  Productos */
                    ProductoVO  producto  = new ProductoVO(0 ,pmtId_grupo,pmtId_marca,pmtCodigo,pmtDescripcion,pmtMarca,pmtGrupo);
                    String json_producto = OpProducto.Registrar(producto);
                    response.getWriter().write(json_producto);
                    /*  END *** Resgistra  Productos  *** END  */

                break;
            case 2:/* Buscar todos los productos */
                    response.getWriter().write( OpProducto.read_Productos());
                break;
            case 3:/* Busca todas las presentaciones de un producto */
                  pmtId_producto = Integer.parseInt(request.getParameter("Id_producto"));
                  response.getWriter().write( OpProducto.read_Presentaciones(pmtId_producto));
                break;
            case 4:/* Buscar maximo codigo de producto con: Id grupo y Id marca */

                  pmtId_grupo =  Integer.parseInt(request.getParameter("Id_grupo"));
                  pmtId_marca =  Integer.parseInt(request.getParameter("Id_marca"));

                  String Codigo = OpProducto.getMax_codigo_producto(pmtId_grupo, pmtId_marca);
                   response.getWriter().write(Codigo);

                break;

                 case 5:/* Buscar maximo codigo de producto con: Id grupo y Id marca */

                     pmtId_grupo =  Integer.parseInt(request.getParameter("Id_grupo"));
                     pmtId_marca =  Integer.parseInt(request.getParameter("Id_marca"));

                     listProductos = OpProducto.getProductos_by_IdGrupoIdMarca(pmtId_grupo, pmtId_marca);
                     response.getWriter().write(listProductos);

                break;

                 case 6:/* Eliminar un producto  */

                     pmtId_producto =  Integer.parseInt(request.getParameter("Id_producto"));

                     String r = OpProducto.Eliminar_producto(pmtId_producto);
                     response.getWriter().write(listProductos);

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

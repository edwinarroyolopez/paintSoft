<%--
    Document   : cliente
    Created on : 08-jul-2016, 4:04:36
    Author     : Zero
--%>
 
<%@page import = "model.vo.ClienteVO"
        import = "model.dao.ClienteDAO"
        import = "java.util.LinkedList"
       %>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Cliente</title>
        <!-- Estilos -->
        <link rel="stylesheet" href="css/menu.css" title="Style">
        <link rel="stylesheet" href="css/standar.css" title="Style">
        <link rel="stylesheet" href="css/cliente.css" title="Style">
        <!-- Estilos -->
        <!-- Js -->
        <script language="JavaScript" type="text/javascript" src="js/jquery-1.9.1.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/cliente.js"></script>
        <!-- Js -->
    </head>
    <body>

        <div id="universe">

                <!-- START  *** MENU ***  *** MENU *** *** MENU *** *** MENU *** *** MENU *** START -->
               <section id="left">
                    <ul id="navigationMenu">
                       <li> <a class="client" href="#"><span>Clientes</span></a></li>
                       <li><a class="provider" href="proveedor.jsp"><span>Proveedores</span></a></li>
                       <li><a class="formula" href="formulas.jsp"><span>Fórmulas</span></a></li>
                       <li><a class="product" href="producto.jsp"><span>Productos</span></a></li>
                       <li><a class="formula" href="#"><span>Fórmulas</span></a></li>
                       <li><a class="shopping" href="compra.jsp"><span>Compras</span></a></li>
                       <li><a class="sale" href="venta.jsp"><span>Ventas</span></a></li>
                       <li><a class="sale" href="gastos.jsp"><span>Gastos</span></a></li>
                       <li><a class="formula" href="estadistica.jsp"><span>Estadística</span></a></li>
                   </ul>
               </section>
                <!-- END *** MENU ***  *** MENU *** *** MENU *** *** MENU *** *** MENU *** END -->



                  <!-- START *** CONTENEDOR ***  *** CONTENEDOR *** START *** CONTENEDOR *** *** CONTENEDOR *** *** START -->
               <section id="center">
                   <div class="title">
                       <div class="label">Clientes</div>
                   </div>
                   <br>
                   <div class="container">
                       <div class="tabMenu">
                           <div class="tab isSelect" id="tabRegistro">Registrar</div>
                           <div class="tab" id="tabBusqueda">Buscar</div>
                           <div class="tab" id="tabDescripcion">Descripcion</div>
                           <div class="tab">Mejores</div>
                       </div>
                       <div class="frame isVisible" id="frmRegistro">
                           <div class="box">
                               <div class="searcher_cliente">
                                   <div class="searcher">
                                       <div class="label">Buscar cliente</div>
                                       <div class="textbox"><input type="text" id="txtBuscador_cliente" data-id_cliente="0" placeholder="Cédula - Nombre"></div>
                                       <div id="listClientes" class="hidden"></div>
                                   </div>
                               </div>

                                   <div class="segment">
                                       <br>
                                       <div class="field">
                                           <div class="label"><label for="txtNombre">Nombre</label></div>
                                           <div class="textbox"><input type="text" id="txtNombre" placeholder="Albert Einstein"></div>
                                       </div>
                                       <div class="field">
                                           <div class="label"><label for="txtDocumento">Documento</label></div>
                                           <div class="textbox"><input type="text" id="txtDocumento" placeholder="1038115788"></div>
                                       </div>
                                        <div class="field">
                                           <div class="label"><label for="txtTelefono">Teléfono</label></div>
                                           <div class="textbox"><input type="text" id="txtTelefono" placeholder="3017752393"></div>
                                       </div>
                                   </div>
                                   <!-- Segmento 2 -->
                                   <div class="segment">
                                       <br>
                                       <div class="field">
                                           <div class="label"><label for="txtDireccion">Dirección</label></div>
                                           <div class="textbox"><input type="text" id="txtDireccion" placeholder="Cll 8 # 1G - 12"></div>
                                       </div>
                                       <div class="field">
                                           <div class="label"><label for="txtCiudad">Ciudad</label></div>
                                           <div class="textbox"><input type="text" id="txtCiudad" placeholder="Caucasia"></div>
                                       </div>
                                       <div class="field">
                                           <div class="label"><label for="txtEmail">Email</label></div>
                                           <div class="textbox"><input type="text" id="txtEmail" placeholder="zeroed@gmail.com"></div>
                                       </div>
                                   </div>

                                   <!-- Botón almacenar  -->
                                    <div class="content_button">
                                        <div class="button" id="btnAlmacenar">
                                            <div class="label">Almacenar</div>
                                        </div>
                                    </div>

                           </div>

                       </div>
                       <!-- -- Buscar  -->
                       <div class="frame" id="frmBusqueda">

                           <div class="search">
                               <div class="textbox">
                                   <input type="text" placeholder="Busca a tus clientes" id="txtSearch">
                               </div>
                           </div>


                       <!-- frmDescripcion -->
                       <div class="frame" id="frmDescripcion">

                           <div class="descripcion">
                               <div class="cliente">
                                   <div id="infoNombre">
                                       Ed
                                   </div>
                                   <div class="info">
                                       <div class="label">Documento</div>
                                       <div class="value" id="infoDocumento">1038115788</div>
                                   </div>
                                   <div class="info">
                                       <div class="label">Teléfono</div>
                                       <div class="value" id="infoTelefono">30175 2393</div>
                                   </div>
                                   <div class="info">
                                       <div class="label">Dirección</div>
                                       <div class="value" id="infoDireccion">Cra 16 # 10-23</div>
                                   </div>
                                   <div class="info">
                                       <div class="label">Ciudad</div>
                                       <div class="value" id="infoCiudad">Caucasia</div>
                                   </div>
                                   <div class="info">
                                       <div class="label">Email</div>
                                       <div class="value" id="infoEmail">zeroedprogrammer@gmail.com</div>
                                   </div>
                               </div>
                               <div class="movimientos">
                                   <p> Estadisticas: </p>
                                   <p> Producto más comprado.</p>
                                   <p> Última factura</p>
                                   <p> Fecha de ingreso</p>
                                   <p> Promedio de visita </p>
                                   <p> Promedio por factura </p>
                                   <p> Valor de todas las facturas </p>
                               </div>
                           </div>

                       </div>


                   </div>

               </section>
                <!-- END *** CONTENEDOR ***  *** CONTENEDOR *** END *** CONTENEDOR *** *** CONTENEDOR *** *** END -->











        </div>







    </body>
</html>

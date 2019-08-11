<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>JSP Page</title>
      <!-- JS -->
      <!-- 1. React -->
      <script src="js/new/jsx/react.min.js"></script>
      <script src="js/new/jsx/JSXTransformer.js"></script>
      <!-- 2. Jquery  -->
      <script type="text/javascript" src="js/new/administrador/jquery-3.1.1.min.js"></script>
      <script type="text/javascript" src="js/new/jquery-1.9.1.js"></script>
      <!-- 3. Client modules -->
      <script type="text/javascript" src="js/new/administrador/client-modules.js"></script>
      <!-- 4. Notify -->
      <script type="text/javascript" src="js/new/notify.js"></script>
      <!-- 5. Generals -->
      <script type="text/javascript" src="js/new/administrador/generals.js"></script>
      <!-- 6. Venta -->


      <!-- 7. Ingresar Venta -->
      <%-- <script type="text/javascript" src="js/new/venta/ingresar_venta.js"></script> --%>
      <script type="text/javascript" src="js/inventario/producto.js"></script>
      <script type="text/javascript" src="js/venta/general.js"></script>


      <!-- datepicker -->
      <link rel="stylesheet" href="js/new/libraries/datepicker/jquery-ui.css">
      <link rel="stylesheet" href="js/new/libraries/datepicker/style.css">
      <script src="js/new/libraries/datepicker/jquery-1.12.4.js"></script>
      <script src="js/new/libraries/datepicker/jquery-ui.js"></script>
      <!-- ## JS ## -->

      <!-- Jsx -->
      <!-- 1. Ingresar venta -->
      <%-- <script src="js/new/jsx/venta/ingresar_venta.jsx" type="text/jsx"></script> --%>
      <!-- ## Jsx  ## -->

      <!-- CSS -->
      <link type="text/css" rel="stylesheet" href="css/new/generals.css" title="Style">
        <link type="text/css" rel="stylesheet" href="css/new/producto.css" title="Style">
          <link type="text/css" rel="stylesheet" href="css/new/cliente.css" title="Style">
            <link type="text/css" rel="stylesheet" href="css/new/proveedor.css" title="Style">
              <link type="text/css" rel="stylesheet" href="css/new/compra.css" title="Style">
                <link type="text/css" rel="stylesheet" href="css/new/factura.css" title="Style">
                  <link type="text/css" rel="stylesheet" href="css/new/controllers.css" title="Style">

                    <link type="text/css" rel="stylesheet" href="css/venta/ingresar_venta/cliente.css" title="Style">
                    <link type="text/css" rel="stylesheet" href="css/venta/ingresar_venta/factura.css" title="Style">
                    <link type="text/css" rel="stylesheet" href="css/venta/ingresar_venta/producto.css" title="Style">
                    <!-- ## CSS ## -->
                  </head>
                  <body>

                    <!-- 1. Header -->
                    <section id="header">
                      <div class="label">Ventas</div>
                    </section>

                    <!-- 2. Contenedor unirversal -->
                    <div id="universe" spellcheck="false">

                      <!-- 2.1 Navegador izquierdo -->
                      <nav id="left">
                        <ul>
                          <li>
                            <a id="nav_Productos" href="cliente.jsp">
                              <div class="text">
                                <div class="circle"></div>
                                <div class="label">Clientes</div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a id="nav_Productos" href="proveedor.jsp">
                              <div class="text">
                                <div class="circle"></div>
                                <div class="label">Proveedores</div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a id="nav_Clientes" href="formulas.jsp">
                              <div class="text">
                                <div class="circle"></div>
                                <div class="label">Formulas</div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a id="nav_Proveedores" href="producto.jsp">
                              <div class="text">
                                <div class="circle"></div>
                                <div class="label">Productos</div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a id="nav_Compras" href="compra.jsp">
                              <div class="text">
                                <div class="circle"></div>
                                <div class="label">Compras</div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a id="nav_Facturas" href="venta.jsp">
                              <div class="text">
                                <div class="circle"></div>
                                <div class="label">Ventas</div>
                              </div>
                            </a>
                          </li>
                          <%-- <li>
                            <a id="nav_Informe_ventas" href="informe_ventas.jsp">
                              <div class="text">
                                <div class="circle"></div>
                                <div class="label">Informe Ventas</div>
                              </div>
                            </a>
                          </li>
                          <li>
                            <a id="nav_Informe_ventas" href="informe_creditos.jsp">
                              <div class="text">
                                <div class="circle"></div>
                                <div class="label">Informe Creditos</div>
                              </div>
                            </a>
                          </li> --%>
                        </ul>
                      </nav>

                      <!-- Contenedor central -->
                      <div id="center">

                        <!-- Content tab -->
                        <div class="content_tab">
                          <div class="tab"  id="tab_ingresar_venta" style="border-left: 1px solid #e9eaed;">
                            <span class="text">Ingresar venta</span>
                          </div>
                          <div class="tab" id="tab_factura">
                            <span class="text">Factura</span>
                          </div>
                          <div class="tab" id="tab_configuracion">
                            <span class="text">Configuracion</span>
                          </div>
                          <div class="tab" id="tab_ventas_realizadas">
                            <span class="text">Ventas realizadas</span>
                          </div>
                        </div>

                        <!-- Container -->
                        <div id="frame">

                          <div class="content" id="content_factura">

                            <div class="content_search" id="content_search_producto">
                              <div class="searcher">
                                <div class="fieldSearch">
                                    <input type="text" name="" id="txt_search_producto" value="" placeholder="..." />
                                    <div class="label" id="selectedProducto" data-id="0">Buscar producto</div>
                                </div>
                                <div class="list hidden" id="listProducto"></div>
                              </div>
                            </div>

                            <div  id="detalle_producto">
                                <div class="info" id="info_grupo">
                                   <div class="value" id="info_value_grupo">...</div>
                                   <div class="label">Grupo</div>
                                </div>
                                <div class="info" id="info_marca" >
                                    <div class="value" id="info_value_marca">...</div>
                                    <div class="label">Marca</div>

                                </div>
                                <div class="info" id="info_presentacion">
                                    <input type="text" id="txt_presentacion" name="" value=""  placeholder="..."/>
                                    <div class="label" id="info_value_disponible">Presentacion</div>
                                    <div class="list hidden" id="list_presentaciones"></div>
                                </div>
                                <div class="info" id="info_fraccion">
                                    <input type="text" id="txt_fraccion"  placeholder="..."/>
                                    <div class="label">Fraccion</div>
                                    <div class="list hidden" id="list_fracciones"></div>
                                </div>
                                <div class="info" id="info_cantidad">
                                    <input type="text" id="txt_cantidad"  placeholder="..."/>
                                    <div class="label">Cantidad</div>
                                </div>
                                <div class="info" id="info_precio">
                                    <input type="text" id="txt_precio"  placeholder="..."/>
                                    <div class="label">Precio</div>
                                </div>
                                <div id="Item_empezado" >
                                    <div class="label hidden">Empezados</div>
                                </div>

                                <div class="content_button">
                                    <div class="button" id="btnAddItem">
                                        <div class="label">add Item</div>
                                    </div>
                                 </div>

                            </div>
                            <br/>
                        </div>



                        <div class="content_button" id="content_button_finalizar">
                          <div class="msg_error" id="message_error_venta"></div>
                            <div class="button" id="btn_facturar">
                              <div class="label">Facturar</div>
                            </div>
                            <div class="button" id="btn_cotizar">
                              <div class="label">Cotizar</div>
                            </div>
                        </div>


                      </div><!-- ## Contenedor central ## -->
                    </div><!-- ## Universal ## -->



                  </body>
                </html>

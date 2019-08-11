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


      <script type="text/javascript" src="js/informes/informe_creditos/filtro.js"></script>
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

                    <link type="text/css" rel="stylesheet" href="css/informes/informe_ventas/filtro.css" title="Style">
                    <!-- ## CSS ## -->
                  </head>
                  <body>

                    <!-- 1. Header -->
                    <section id="header">
                      <div class="label">Informe de faturas de crédito</div>
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
                          <li>
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
                          </li>
                        </ul>
                      </nav>

                      <!-- Contenedor central -->
                      <div id="center">

                        <!-- Content tab -->
                        <div class="content_tab">
                          <div class="tab"  id="tab_ingresar_venta" style="border-left: 1px solid #e9eaed;">
                            <span class="text">...</span>
                          </div>
                          <div class="tab" id="tab_factura">
                            <span class="text">...</span>
                          </div>
                          <div class="tab" id="tab_configuracion">
                            <span class="text">...</span>
                          </div>
                          <div class="tab" id="tab_ventas_realizadas">
                            <span class="text">...</span>
                          </div>
                        </div>

                        <!-- Container -->
                        <div id="frame">

                          <div class="content" id="content_filtro">
                              <div class="head">Filtro</div>

                              <div class="field">
                                   <div class="label">Fecha inicial</div>
                                   <div class="textbox">
                                       <input id="txtFecha_inicial" type="text" placeholder="31/12/2016" />
                                   </div>
                               </div>
                               <div class="field">
                                    <div class="label">Fecha final</div>
                                    <div class="textbox">
                                        <input id="txtFecha_final" type="text" placeholder="31/12/2016" />
                                    </div>
                                </div>
                                <div class="content_button" id="content_button_filtro">
                                  <div class="button" id="button_filtrar_creditos">
                                    <div class="label">Filtrar</div>
                                  </div>
                                </div>
                        </div> <!-- ## content filtro ## -->

                        <div class="content" id="content_ventas">
                              <div class="head">Facturas de pendientes</div>
                                <div class="info">
                                    <div class="label"># Facturas</div>
                                    <div class="value" id="info_numero_credito">0</div>
                                </div>
                                <div class="info">
                                    <div class="label">Valor</div>
                                    <div class="value" id="info_valor_credito">0</div>
                                </div>
                                <div class="info">
                                    <div class="label">Saldo</div>
                                    <div class="value" id="info_saldo_credito">0</div>
                                </div>
                                <div class="info">
                                    <div class="label">Ganancia</div>
                                    <div class="value" id="info_ganancia_credito">0</div>
                                </div>
                        </div>

                        <div class="content" id="content_detalle_creditos">
                              <div class="datagrid" id="dataCreditos">
                                <div class="header">
                                  <div class="cell fecha">Fecha</div>
                                  <div class="cell valor">Valor</div>
                                  <div class="cell saldo">Saldo</div>
                                  <div class="cell numero"># Factura</div>
                                  <div class="cell cliente">Cliente</div>
                                  <div class="cell abonos">Abonos</div>
                                  <div class="cell ultimo_abono">Ultimo abono</div>
                                  <div class="cell valor_ultimo_abono">$ Ultimo abono</div>
                                  <div class="cell estado">Estado</div>
                                </div>
                              </div>
                        </div>

                      </div><!-- ## Contenedor central ## -->

                    </div><!-- ## Universal ## -->



                  </body>
                </html>

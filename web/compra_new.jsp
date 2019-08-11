<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <!-- JS -->
            <!-- 1. React -->
              <script src="js/jsx/react.min.js"></script>
              <script src="js/jsx/JSXTransformer.js"></script>
            <!-- 2. Jquery  -->
            <script type="text/javascript" src="js/new/administrador/jquery-3.1.1.min.js"></script>
            <script type="text/javascript" src="js/new/jquery-1.9.1.js"></script>
            <!-- 3. Client modules -->
            <script type="text/javascript" src="js/new/administrador/client-modules.js"></script>
            <!-- 4. Notify -->
            <script type="text/javascript" src="js/new/notify.js"></script>
            <!-- 5. Generals -->
            <script type="text/javascript" src="js/new/administrador/generals.js"></script>
            <!-- 6. Compras -->
          
      <!-- 7. Ingresar Compra -->
      <script type="text/javascript" src="js/compra/compra_proveedor.js"></script>
      <script type="text/javascript" src="js/compra/ingresar_compra.js"></script>


      <!-- datepicker -->
      <link rel="stylesheet" href="js/new/libraries/datepicker/jquery-ui.css">
      <link rel="stylesheet" href="js/new/libraries/datepicker/style.css">
      <script src="js/new/libraries/datepicker/jquery-1.12.4.js"></script>
      <script src="js/new/libraries/datepicker/jquery-ui.js"></script>
            
        <!-- ## JS ## -->

        <!-- CSS -->
            <link type="text/css" rel="stylesheet" href="css/new/administrador.css" title="Style">
            <link type="text/css" rel="stylesheet" href="css/new/generals.css" title="Style">
            <link type="text/css" rel="stylesheet" href="css/new/producto.css" title="Style">
            <link type="text/css" rel="stylesheet" href="css/new/cliente.css" title="Style">
            <link type="text/css" rel="stylesheet" href="css/new/proveedor.css" title="Style">
            <link type="text/css" rel="stylesheet" href="css/new/compra.css" title="Style">
            <link type="text/css" rel="stylesheet" href="css/new/factura.css" title="Style">
            <link type="text/css" rel="stylesheet" href="css/new/controllers.css" title="Style">
            
              <link type="text/css" rel="stylesheet" href="css/compra/proveedor.css" title="Style">
              <link type="text/css" rel="stylesheet" href="css/compra/factura.css" title="Style">
              <link type="text/css" rel="stylesheet" href="css/compra/producto.css" title="Style">
        <!-- ## CSS ## -->
    </head>
    <body>

        <!-- 1. Header -->
        <section id="header">
            <div class="label">Compra</div>
        </section>

        <!-- 2. Contenedor unirversal -->
        <div id="universe" spellcheck="false">

          <!-- 2.1 Navegador izquierdo -->
            <nav id="left">
                    <ul>
                          <li>
                                <a id="nav_Productos" href="producto_new.jsp">
                                      <div class="text">
                                        <div class="circle"></div>
                                        <div class="label">Productos</div>
                                      </div>
                                  </a>
                          </li>
                          <li>
                            <a id="nav_Proveedores" href="cliente_new.jsp">
                                  <div class="text">
                                            <div class="circle"></div>
                                            <div class="label">Proveedores</div>
                                  </div>
                              </a>
                          </li>
                          <li>
                            <a id="nav_Proveedores" href="proveedor_new.jsp">
                                  <div class="text">
                                            <div class="circle"></div>
                                            <div class="label">Proveedores</div>
                                  </div>
                              </a>
                          </li>
                          <li>
                            <a id="nav_Compras" href="compra_new.jsp">
                                  <div class="text">
                                      <div class="circle"></div>
                                      <div class="label">Compras</div>
                                  </div>
                              </a>
                          </li>
                          <li>
                            <a id="nav_Facturas" href="factura_new.jsp">
                                  <div class="text">
                                      <div class="circle"></div>
                                      <div class="label">Facturas</div>
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

                          <div class="content" id="content_factura">
                              <div class="head">Factura</div>
                              <div class="field">
                                   <div class="label"># Factura</div>
                                   <div class="textbox">
                                       <input id="txtFactura" type="text" placeholder="546372" />
                                   </div>
                               </div>
                              <div class="field">
                                   <div class="label">Fecha de Ingreso</div>
                                   <div class="textbox">
                                       <input id="txtFecha" type="text" placeholder="31/12/2016" />
                                   </div>
                               </div>
                               <div id="fieldForma_pago" class="field">
                                   <div class="label">Forma de pago</div>
                                   <div class="" id="fmPago" data-value="-1">- seleccione -</div>
                               </div>
                        </div> <!-- ## content factura ## -->

                        <div class="content" id="content_proveedor">
                            <div class="content_search" id="content_search_proveedor">
                              <div class="hidden" id="frm_add_proveedor">
                                <div class="content_button" id="content_button_close">
                                    <div class="button" id="button_close_frm_proveedor">
                                      <div class="label">x</div>
                                    </div>
                                </div>
                                <div class="">
                                  <div class="field" id="field_add_nombre">
                                       <div class="label">Nombre</div>
                                       <div class="textbox">
                                           <input id="txt_add_nombre" type="text" placeholder="..." />
                                       </div>
                                   </div>
                                   <div class="field">
                                        <div class="label">Documento</div>
                                        <div class="textbox">
                                            <input id="txt_add_documento" type="text" placeholder="..." />
                                        </div>
                                    </div>
                                    <div class="field">
                                         <div class="label">Telefono</div>
                                         <div class="textbox">
                                             <input id="txt_add_telefono" type="text" placeholder="..." />
                                         </div>
                                     </div>
                                     <div class="field">
                                          <div class="label">Ciudad</div>
                                          <div class="textbox">
                                              <input id="txt_add_ciudad" type="text" placeholder="..." />
                                          </div>
                                      </div>
                                </div>
                                <div class="content_button">
                                    <div class="button" id="button_add_Proveedor">
                                      <div class="label">add Proveedor</div>
                                    </div>
                                </div>
                              </div>
                              <div class="searcher">
                                <div class="content_button" id="content_button_add_proveedor">
                                  <div class="button" id="button_open_frm_add_proveedor">
                                      <div class="label">+</div>
                                  </div>
                                </div>
                                <div class="fieldSearch">
                                    <input type="text" name="" id="txt_search_proveedor" value="" placeholder="..." />
                                    <div class="label" id="selectedProveedor" data-id="0">Buscar proveedor</div>
                                </div>
                                <div class="list hidden" id="listProveedores"></div>
                              </div>
                            </div>
                            <div  id="detalle_proveedor">
                                <div class="info" id="info_nit">
                                    <div class="label">Nit</div>
                                    <div class="value" id="info_value_nit">...</div>
                                </div>
                                <div class="info" id="info_ciudad" >
                                    <div class="label">Ciudad</div>
                                    <div class="value" id="info_value_ciudad">...</div>
                                </div>
                                <div class="info" id="info_telefono">
                                    <div class="label">Teléfono</div>
                                    <div class="value" id="info_value_telefono">...</div>
                                </div>
                            </div>
                            <!-- Historico -->
                            <div class="head">Historico</div>
                            <div id="historico" >
                              <div class="info">
                                  <div class="label">Cerradas</div>
                                  <div class="value" id="info_value_cerradas">0</div>
                                  <div class="list hidden" id="list_facturas_cerradas"></div>
                              </div>
                              <div class="info">
                                  <div class="label">Pendientes</div>
                                  <div class="value" id="info_value_pendientes">0</div>
                                  <div class="list hidden" id="list_facturas_pendientes"></div>
                              </div>
                              <div class="info">
                                  <div class="label">Deuda</div>
                                  <div class="value" id="info_value_deuda">0</div>
                              </div>
                              <div class="info">
                                  <div class="label">Saldo</div>
                                  <div class="value" id="info_value_saldo">0</div>
                              </div>
                            </div>

                         
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

                        <div class="content_data">
                            <div class="datagrid" id="dataProducto">
                                <div class="head">
                                    <div class="cell codigo">Cdigo</div>
                                    <div class="cell descripcion">Descripcn</div>
                                    <div class="cell unidad">Unidad</div>
                                    <div class="cell precio_unidad">$ Unidad</div>
                                    <div class="cell cantidad">Cantidad</div>
                                    <div class="cell precio">Precio</div>
                                </div>
                            </div>
                        </div>

                        <div class="content" id="content_resumen_factura">
                            <div class="head">Resumen de Factura</div>
                            <div id="detalle_resumen">
                                <div class="info">
                                    <div class="value" id="info_subtotal">0</div>
                                    <div class="label">Subtotal</div>
                                </div>
                                <div class="info">
                                    <div class="value" id="info_iva">0</div>
                                    <div class="label">Iva</div>
                                </div>
                                <div class="info">
                                    <div class="value" id="info_total">0</div>
                                    <div class="label">Total</div>
                                </div>
                            </div>
                        </div>

                        <div class="content" id="content_devolucion">
                            <div class="field devolucion">
                                <div class="label">VALOR EN BILLETES</div>
                                <div class="textbox"><input type="text" id="txtValor_billetes" placeholder="500.000"></div>
                            </div>
                            <div class="field devolucion">
                                <div class="label">VALOR DEVOLUCION</div>
                                <div class="info" id="info_devolucion" data-set=""></div>
                            </div>
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
                  
                  
              </div>


        </div><!-- Universal -->



    </body>
</html>

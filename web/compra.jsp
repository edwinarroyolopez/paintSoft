
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Compra</title>
         <!-- Estilos -->
        <link rel="stylesheet" href="css/menu.css" title="Style"> 
        <link rel="stylesheet" href="css/standar.css" title="Style">
        <link rel="stylesheet" href="css/compra.css" title="Style"> 
        <link rel="stylesheet" href="css/compra_factura.css" title="Style"> 
        <!-- Estilos  -->
         <!-- Js -->
        <script language="JavaScript" type="text/javascript" src="js/jquery-1.9.1.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/compra.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/compra_facturas.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/compra_proveedor.js"></script>
        <!-- Js -->
    </head>
    <body>
        
         <div id="universe">
        
           <!-- START  *** MENU ***  *** MENU *** *** MENU *** *** MENU *** *** MENU *** START -->
        <section id="left">
             <ul id="navigationMenu">
                <li> <a class="client" href="cliente.jsp"><span>Clientes</span></a></li>
                <li><a class="provider" href="proveedor.jsp"><span>Proveedores</span></a></li>
                <li><a class="formula" href="formulas.jsp"><span>Fórmulas</span></a></li>
                <li><a class="product" href="producto.jsp"><span>Productos</span></a></li>
                <li><a class="formula" href="inventario.jsp"><span>Inventario</span></a></li>
                <li><a class="shopping" href="compra.jsp"><span>Compras</span></a></li>
                <li><a class="sale" href="venta.jsp"><span>Ventas</span></a></li>
                <li><a class="shopping" href="gastos.jsp"><span>Gastos</span></a></li>
                <li><a class="formula" href="estadistica.jsp"><span>Estadística</span></a></li>
            </ul>
        </section>
         <!-- END *** MENU ***  *** MENU *** *** MENU *** *** MENU *** *** MENU *** END -->
        
           <!-- *** START *** CONTENEDOR PRINCIPAL *** START *** -->
         <section id="center">
             <!-- TITULO DE PAGINA -->
             <div class="title">
                <div class="label">Compras</div>
            </div>
             <br>
             <!-- CONTAINER DE NAVEGACIÓN -->
             <div class="container">
                 
                 <!-- TABS DE NAVEGACIÓN -->    
                 <div class="tabMenu">
                    <div class="tab isSelect" id="tabIngresarCompra">Ingresar Compra</div>
                    <div class="tab" id="tabBusqueda">Estado de factura</div>
                    <div class="tab" id="tabDescripcion">Descripcion</div>
                    <div class="tab">Mejores</div>
                </div>
                 <!-- END *** TABS DE NAVEGACIÓN  *** END -->
                 
                 <!-- FORMULARIO DE REGISTRO DE FACTURA  --> 
                 
                 
                 <div class="S1">
                 <div class="frame isVisible" id="frmIngresarCompra">
                     <div class="lienzo">
                                        <!-- Sector: Factura -->
                               <div class="sector" id="sFactura">
                                   <div class="encabezado_sector">Factura</div>
                                   <div class="fila_sector">
                                       <div class="field">
                                           <div class="label">Número</div>
                                           <div class="textbox"><input type="text" id="txtNumero" placeholder="81908"></div>
                                       </div>
                                       <div class="field">
                                           <div class="label">Fecha ingreso</div>
                                           <div class="textbox"><input type="datetime" id="txtFecha_ingreso" placeholder="19/08/2016"></div>
                                       </div>
                                       <div class="field">
                                           <div class="label">Fecha pago</div>
                                           <div class="textbox"><input type="datetime" id="txtFecha_pago" placeholder="19/08/2016"></div>
                                       </div>
                                   </div> 
                               </div>

                               <!-- Sector: Proveedor -->
                               <div class="sector" id="sProveedor">
                                   <div class="encabezado_sector">
                                       <div class="label">Proveedor</div>
                                       <div class="textbox"><input type="text" id="txtProveedor" placeholder="Seleccione proveedor..."></div>
                                       <div class="combobox" id="cbProveedor"></div>
                                   </div>
                                   <div class="fila_sector">
                                       <div class="field">
                                           <div class="label">Nit</div>
                                           <div class="info" id="info_proveedor_nit" data-set="">seleccione</div>
                                       </div>
                                       <div class="field">
                                           <div class="label">Telefono</div>
                                           <div class="info" id="info_proveedor_telefono" data-set="">seleccione</div>
                                       </div>
                                       <div class="field">
                                           <div class="label">Ciudad</div>
                                           <div class="info" id="info_proveedor_ciudad" data-set="">seleccione</div>
                                       </div>
                                   </div> 
                               </div>

                               <!-- Sector: Producto -->
                               <div class="sector" id="sProducto">
                                   <div class="fila_sector">
                                       <div class="cell_sector">
                                              <!-- Interfaz para saber cuantas unidades fisicas tiene un producto 
                                                   que no contiene unidades de medida -->
                                              <div class="field" style="padding: 5px 0 0 20px;">
                                                 <div class="label">Valor de la factura</div>
                                                 <div class="textbox"><input type="text" id="txt_valor_factura" placeholder="100.000"></div>
                                              </div>
                                       </div>
                                   </div> 
                               </div>
                               <div class="field" id="contentBtn">
                                    <div class="button" id="btnAlmacenar">
                                        <div class="label">Almacenar</div>
                                    </div>
                                </div>

                               <!-- Data grid -->
                               
                         
                         
                     </div>
                   
                     
                 
                 </div>
                  
                     <!-- Estado factura-->
                 
                     <div class="frame " id="frmEstado_factura">
                     <div class="lienzo">
                                        
                               <div class="sector info_captura" id="sProveedor">
                                   <div class="fila_sector">
                                       <div class="field" id="field_proveedor">
                                           <div class="label">Proveedor</div>
                                           <div class="info" id="info_proveedor" data-set="">seleccione</div>
                                       </div><hr>
                                       <div class="field">
                                           <div class="label"># Factura</div>
                                           <div class="info" id="info_numero_factura" data-set="">seleccione</div>
                                       </div>
                                       <div class="field">
                                           <div class="label">Valor</div>
                                           <div class="info" id="info_valor_factura" data-set="">seleccione</div>
                                       </div>
                                       <div class="field">
                                           <div class="label">Fecha de pago</div>
                                           <div class="info" id="info_fecha_pago" data-set="">seleccione</div>
                                       </div>
                                       <div class="field">
                                           <div class="label">Estado</div>
                                           <div class="info" id="info_estado" data-set="">seleccione</div>
                                       </div>
                                   </div> 
                               </div>
                         <br>
                         <br>
                         <div id="content_button">
                                <!-- Button Almacenar -->
                                <div class="button" id="btnCerrar">
                                    <div class="label">Cerrar</div>
                                </div>
                                <!-- Button Almacenar -->
                                <!-- Button Cotización -->
                                <div class="button" id="btnBorrar">
                                    <div class="label">Borrar</div>
                                </div>
                                <!-- Button Cotización -->
                            </div>
                         
                               <!-- Data grid -->
                               <div id="datagrid_detalle_factura">
                                    <div class="encabezado">
                                        <div class="numero_factura"># Factura</div>
                                        <div class="proveedor">Proveedor</div>
                                        <div class="valor_factura">Valor</div>
                                        <div class="fecha_pago">Fecha de pago</div>
                                        <div class="estado">Estado</div>
                                    </div>
                                </div>
                         
                     </div>
                   
                     
                 
                 </div>
                  
                   
                     
                 
                 </div>
                     
                 </div><!-- FIN S1 -->
                 
                 <!-- END *** FORMULARIO DE REGISTRO DE FACTURA  *** END  --> 
                 
                 
                 <!-- FORMULARIO BUSQUEDA DE FACTURAS  -->
                 
                 <div class="frame hidden" id="frmFacturas">
                     
                     <div id="sector_frmFactura">
                                <!-- Buscador  -->
                                <div id="contenedor_buscador_facturas">
                                    <div id="subcontenedor_buscador_facturas">
                                        <!-- Button facturas pendientes -->
                                            <div id="btnFacturas_pendientes">
                                                <div class="label">Facturas pendientes</div>
                                            </div>
                                        <!-- Buscador de facturas de compra -->
                                        <div id="buscador_facturas">
                                            <div class="field">
                                                <div class="textbox">
                                                   <input type="text" id="txt_buscador_factura" placeholder="Ingrese el número de la factura o el proveedor">
                                                </div>
                                                <div id="listFacturas" class="hidden"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="marco_factura">
                                          <div id="contenido_factura">
                                                               <!-- Factura detalle -->
                                                               <div id="f_Proveedor">
                                                                       <!-- Encabezado proveedor  -->
                                                                       <div class="encabezado">
                                                                           <div id="proveedor_descripcion">Apple </div>
                                                                           <div id="proveedor_detalle">
                                                                               <div id="proveedor_documento">10101010</div>
                                                                               <div id="proveedor_saldo">$500.000</div>
                                                                           </div>
                                                                       </div>
                                                                       <!-- Facturas del proveedor -->
                                                                       <div id="facturas_proveedor"></div>
                                                               </div>    

                                                               <!-- Factura detalle -->
                                                               <div id="f_Factura_detalle">
                                                                   
                                                            <!-- Agregar un producto a la factura -->
                                                            <div id="content_add_producto_factura" class="hidden">
                                                                <div class="frame_add_producto">
                                                                    <div id="search_producto_factura">
                                                                            <input type="text" id="txt_search_producto_factura" placeholder="Ingrese el producto que desea buscar!">
                                                                            <div id="list_producto_factura"></div>
                                                                    </div>
                                                                    <div class="content_detalle_producto">
                                                                        <div id="list_unidad_medida_factura"></div>
                                                                        <div id="list_fracciones_factura">Fracciones!</div>
                                                                        <div id=""></div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <!-- Abonar a la factura  --> 
                                                            <div id="content_add_abono_factura" class="hidden">
                                                                <div class="frame_add_abono">
                                                                    <div class="head_abono">
                                                                       <div id="btnClose_abono">
                                                                            <div class="label">x</div>
                                                                       </div> 
                                                                            <div class="content_head_item" id="content_saldo_factura">
                                                                                <div class="label">Saldo</div>
                                                                                <div class="value">0000</div>
                                                                            </div>
                                                                            <div class="content_head_item" id="content_proveedor_factura">
                                                                                <div class="label">Proveedor</div>
                                                                                <div class="value">Steve Jobs</div>
                                                                            </div>
                                                                    </div>
                                                                    <!-- Abonos! -->
                                                                    <div id="content_abonos_factura">
                                                                        <!--
                                                                        <div id="list_abono">
                                                                            <div id="btnImprime_historial">
                                                                                <div class="label">Imprime comprobante</div>
                                                                            </div>    
                                                                        </div> -->
                                                                        
                                                                            <div id="set_abono">
                                                                                    <div class="content_set_abono">
                                                                                        <div class="row_abono">
                                                                                                <div class="field_abono">
                                                                                                    <div class="label">Valor de abono</div>
                                                                                                    <input type="text" id="txt_valor_abono">
                                                                                                </div>
                                                                                                <div class="field_abono field_persona">
                                                                                                    <div class="label">Receptor</div>
                                                                                                    <input type="text" id="txt_receptor_abono">
                                                                                                </div>
                                                                                        </div>
                                                                                        <div class="row_abono">
                                                                                                <div class="field_abono">
                                                                                                    <div class="label">Medio</div>
                                                                                                    <input type="text" id="txt_medio_abono">
                                                                                                </div>
                                                                                                <div class="field_abono field_persona">
                                                                                                    <div class="label">Responsable</div>
                                                                                                    <input type="text" id="txt_responsable_abono">
                                                                                                </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <!-- Botones ;) -->
                                                                                    <div class="content_button_abono">
                                                                                        <div id="btn_scan_comprobante">
                                                                                            <div class="label">Scan comprobante</div>
                                                                                        </div>
                                                                                        <div id="btn_realizar_abono">
                                                                                            <div class="label">Realizar transaccion</div>
                                                                                        </div>
                                                                                    </div>
                                                                                    
                                                                            </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            
                                                            
                                                        <div class="encabezado">
                                                            <div id="fatura_detalle">032017001</div>
                                                            <div class="descripcion_factura">
                                                                    <!-- Estado -->
                                                                    <div id="fd_Estado" class="field">
                                                                        <div class="label">Estado</div>
                                                                        <div id="estado_factura">Cerrada</div>
                                                                    </div>
                                                                    <!-- Forma de pago -->
                                                                    <div id="fd_Forma_pago" class="field">
                                                                        <div class="label">Forma de pago</div>
                                                                        <div id="forma_pago_factura">Contado</div>
                                                                    </div>
                                                                    <!-- Valor -->
                                                                    <div id="fd_Valor" class="field">
                                                                        <div class="label">Valor</div>
                                                                        <div id="valor_factura">200.000</div>
                                                                    </div>
                                                                    <!-- Saldo -->
                                                                    <div id="fd_Saldo" class="field">
                                                                        <div class="label">Saldo</div>
                                                                        <div id="saldo_factura">0</div>
                                                                    </div>
                                                            </div>
                                                            <div class="descripcion_proveedor">
                                                                <div id="fd_documento">54236589</div>
                                                                <div id="fd_proveedor">Steve Jobs</div>
                                                            </div>
                                                        </div>
                                                        <div id="contenido_detalle_factura">
                                                            <div id="accion_detalle_factura">
                                                                <div class="content_action">
                                                                   <!-- <div id="btnAdd_producto_factura" class="">
                                                                        <div class="label">add Producto</div>
                                                                    </div> -->
                                                                </div>
                                                                 <div class="content_action">
                                                                    <div id="btnEliminar_fila_factura" class="hidden">
                                                                        <div class="label">Eliminar</div>
                                                                    </div>
                                                                      <div id="btnAdd_abono_factura" class="">
                                                                        <div class="label">add Abono</div>
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>
                                                            <div id="datagrid_detalle_factura">
                                                                <div class="encabezado">
                                                                    <div class="codigo">Código</div>
                                                                    <div class="descripcion">Descripción</div>
                                                                    <div class="unidad">Unidad</div>
                                                                    <div class="precio_unidad">$ Unidad</div>
                                                                    <div class="cantidad">Cantidad</div>
                                                                    <div class="descuento">Descuento</div>
                                                                    <div class="precio">Precio</div>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                                   

                                                               </div>
                                                               <!-- Facturas pendientes  -->
                                                               <div id="f_Pendientes">
                                                                   <!-- Encabezado facturas pendientes -->
                                                                   <div class="encabezado">
                                                                       <div id="saldo_facturas_pendientes">Saldo facturas pendientes</div>
                                                                   </div>

                                                                       <!-- Facturas pendientes -->
                                                                       <div id="list_facturas_pendientes"></div>

                                                               </div>
                                                   </div>
                                </div>    
                                      
                                
                                  </div><!-- sector contenedor de facturas -->
                 </div>
                 
                 <!-- END *** FORMULARIO BUSQUEDA DE FACTURAS  *** END -->
                 
                
                 
                 
                 
                 
             </div>
             <!-- *** END  CONTAINER DE NAVEGACIÓN  END *** -->
         </section>
        <!-- *** END *** CONTENEDOR PRINCIPAL *** END *** -->
        
         </div>
        
                
    </body>
</html>

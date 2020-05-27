<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Eliminar facturas</title>
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
        <script type="text/javascript" src="js/eliminar_factura.js"></script>
        <script type="text/javascript" src="js/venta/general.js"></script>
        <script type="text/javascript" src="js/venta/modal.js"></script>

        <!-- datepicker -->
        <link rel="stylesheet" href="js/new/libraries/datepicker/jquery-ui.css">
        <link rel="stylesheet" href="js/new/libraries/datepicker/style.css">
        <script src="js/new/libraries/datepicker/jquery-1.12.4.js"></script>
        <script src="js/new/libraries/datepicker/jquery-ui.js"></script>
        <!-- ## JS ## -->

        <!-- Jsx -->
        <!-- 1. Ingresar venta -->

        <!-- CSS -->
        <link type="text/css" rel="stylesheet" href="css/new/generals.css" title="Style">
        <link type="text/css" rel="stylesheet" href="css/new/producto.css" title="Style">
        <link type="text/css" rel="stylesheet" href="css/new/cliente.css" title="Style">
        <link type="text/css" rel="stylesheet" href="css/new/proveedor.css" title="Style">
        <link type="text/css" rel="stylesheet" href="css/new/compra.css" title="Style">
        <link type="text/css" rel="stylesheet" href="css/new/factura.css" title="Style">
        <link type="text/css" rel="stylesheet" href="css/new/controllers.css" title="Style">
        <link type="text/css" rel="stylesheet" href="css/eliminar_facturas.css" title="Style">

        <link type="text/css" rel="stylesheet" href="css/venta/ingresar_venta/cliente.css" title="Style">
        <link type="text/css" rel="stylesheet" href="css/venta/ingresar_venta/factura.css" title="Style">
        <link type="text/css" rel="stylesheet" href="css/venta/ingresar_venta/producto.css" title="Style">
        <!-- ## CSS ## -->
    </head>
    <body>

        <!-- 1. Header -->
        <section id="header">
            <div class="label">Eliminar facturas</div>
        </section>

        <!-- 2. Contenedor unirversal -->
        <div id="universe" spellcheck="false">
            <!-- 2.1 Navegador izquierdo -->
            <%@include file="components/browser.jsp" %>

            <!-- Contenedor central -->
            <div id="center">

                <!-- Content tab -->
                <div class="content_tab">
                    <div class="tab"  id="tab_ingresar_venta" style="border-left: 1px solid #e9eaed;">
                        <span class="text"></span>
                    </div>
                    <div class="tab" id="tab_factura">
                        <span class="text"></span>
                    </div>
                    <div class="tab" id="tab_configuracion">
                        <span class="text"></span>
                    </div>
                    <div class="tab" id="tab_ventas_realizadas">
                        <span class="text"></span>
                    </div>
                </div>

                <!-- Container -->
                <div id="frame">
                    <br>
                    <br>
                    <!-- test Ed  -->
                    <div class="content" id="content_cliente">
                        <div class="content_search" id="content_search_cliente">
                            <div class="searcher">
                                <div class="fieldSearch">
                                    <input type="text" name="" id="txt_search_cliente" value="" placeholder="..." />
                                    <div class="label" id="selectedCliente" data-id="0">Buscar cliente</div>
                                </div>
                                <div class="list hidden" id="listClientes"></div>
                            </div>
                        </div>
                        <div  id="detalle_cliente">
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
                            <div class="info" id="info_direccion">
                                <div class="value" id="info_value_direccion">...</div>
                            </div>
                        </div>
                    </div>

                    <div class="content_data">
                        <div id="content_valor_facturas">
                            valor faturas: <span id="valor_facturas">0</span>
                        </div>
                        <div class="datagrid" id="dataFacturas">
                            <div class="head">
                                <div class="cell">Seleccionar</div>
                                <div class="cell"># Factura</div>
                                <div class="cell">Fecha</div>
                                <div class="cell">Valor</div>
                                <div class="cell">Estado</div>
                                <div class="cell">Forma de pago</div>
                            </div>
                        </div>

                        <div class="content_button" id="content_button_eliminar">
                            <div class="msg_error" id="message_error_venta"></div>
                            <div class="button" id="btn_eliminar_facturas">
                                <div class="label">Eliminar facturas seleccionadas</div>
                            </div>
                            <div class="button" id="btn_cerrar_facturas">
                                <div class="label">Cerrar facturas seleccionadas</div>
                            </div>
                        </div>
                    </div><!-- ## Contenedor central ## -->
                </div><!-- ## Universal ## -->
            </div><!-- ## Universal ## -->

    </body>
</html>

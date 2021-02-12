<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Ventas</title>
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
  <script type="text/javascript" src="js/new/venta/venta.js"></script>

  <!-- 7. Ingresar Venta -->
  <script type="text/javascript" src="js/venta/ingresar_venta/cliente.js"></script>
  <script type="text/javascript" src="js/venta/ingresar_venta/factura.js"></script>
  <script type="text/javascript" src="js/venta/ingresar_venta/producto.js"></script>
  <script type="text/javascript" src="js/venta/general.js"></script>
  <script type="text/javascript" src="js/venta/modal.js"></script>

  <!-- datepicker 
  <link rel="stylesheet" href="js/new/libraries/datepicker/jquery-ui.css">
  <link rel="stylesheet" href="js/new/libraries/datepicker/style.css">
  <script src="js/new/libraries/datepicker/jquery-1.12.4.js"></script>
  <script src="js/new/libraries/datepicker/jquery-ui.js"></script>
  <!-- ## JS ## -->

  <!-- ## JS EXTERNO ## -->
  <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script> -->
  <!-- ## JS EXTERNO ## -->

  <!-- Jsx -->
  <!-- 1. Ingresar venta -->

  <!-- CSS -->
  <link type="text/css" rel="stylesheet" href="css/new/generals.css" title="Style" />
  <link type="text/css" rel="stylesheet" href="css/new/producto.css" title="Style" />
  <link type="text/css" rel="stylesheet" href="css/new/cliente.css" title="Style" />
  <link type="text/css" rel="stylesheet" href="css/new/proveedor.css" title="Style" />
  <link type="text/css" rel="stylesheet" href="css/new/compra.css" title="Style" />
  <link type="text/css" rel="stylesheet" href="css/new/factura.css" title="Style" />
  <link type="text/css" rel="stylesheet" href="css/new/controllers.css" title="Style" />

  <link type="text/css" rel="stylesheet" href="css/venta/ingresar_venta/factura.css" title="Style" />
  <link type="text/css" rel="stylesheet" href="css/venta/ingresar_venta/cliente.css" title="Style" />
  <link type="text/css" rel="stylesheet" href="css/venta/ingresar_venta/producto.css" title="Style" />
  <!-- ## CSS ## -->
</head>

<body>

  <!-- 1. Header -->
  <section id="header">
    <div class="label">Ventas</div>
  </section>

  <!-- 2. Contenedor unirversal -->
  <div id="universe" spellcheck="false">
    <div class="modal hidden" id="modal">
      <div class="header">
        <div class="title">
          <div class="text_title">
            Facturas pendientes
          </div>
          <div class="content_button">
            <div class="button" id="button_close_modal">
              <div class="label">x</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content_modal">
        <div class="user_data">
          Datos de cliente
        </div>
        <div id="facturas_pendientes">
          <div class="head">
            <div class="state"><input type="checkbox" id="checkbox_state" /></div>
            <div class="numero">Factura</div>
            <div class="fecha">Fecha</div>
            <div class="valor">Valor</div>
            <div class="saldo">Saldo</div>
          </div>
        </div>
      </div>
      Contenido
    </div>
    <!-- 2.1 Navegador izquierdo -->
    <%@include file="components/browser.jsp" %>

    <!-- Contenedor central -->
    <div id="center">

      <!-- Content tab -->
      <div class="content_tab">
        <div class="tab" id="tab_ingresar_venta" style="border-left: 1px solid #e9eaed;">
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
          <div class="head">Factura</div>
          <div class="field">
            <div class="label"># Factura</div>
            <div class="textbox">
              <input id="txtFactura" type="text" placeholder="546372" />
            </div>
          </div>
          <div class="field">
            <div class="label">Fecha</div>
            <div class="textbox">
              <input id="txtFecha" type="text" placeholder="31/12/2016" />
            </div>
          </div>
          <div id="fieldForma_pago" class="field">
            <div class="label">Forma de pago</div>
            <div class="" id="fmPago" data-value="-1">- seleccione -</div>
          </div>
        </div> <!-- ## content factura ## -->

        <%@include file="components/venta/cliente.jsp" %>

        <div class="content" id="content_producto">
          <div class="hidden" id="frm_add_formula">

            <div class="content_button" id="content_button_head_frm_add_formula">
              <div class="sub_content_button" id="sub_content_button_close">
                <div class="button" id="button_close_frm_add_formula">
                  <div class="label">x</div>
                </div>
              </div>
              <div class="sub_content_button" id="sub_content_button_new">
                <div class="button" id="button_new_formula">
                  <div class="label">+</div>
                </div>
              </div>
            </div>

            <div class="setting_formula">
              <div class="content_search" id="content_search_formula">
                <div class="searcher">
                  <div class="fieldSearch">
                    <input type="text" name="" id="txt_search_formula" value="" placeholder="..." />
                    <div class="label" id="selectedFormula" data-id="0">Buscar formula</div>
                  </div>
                  <div class="list hidden" id="listFormula"></div>
                </div>
              </div>
              <br>
              <div class="field" id="field_add_nombre">
                <div class="label">Medida</div>
                <div class="textbox">
                  <input id="txt_add_medida" type="text" placeholder="..." />
                </div>
                <div id="listUnidad_medida_formula" class="list hidden">
                  <div class="row" data-cantidad="1">1/64 Gln</div>
                  <div class="row" data-cantidad="2">1/32 Gln</div>
                  <div class="row" data-cantidad="4">1/16 Gln</div>
                  <div class="row" data-cantidad="8">1/8 Gln</div>
                  <div class="row" data-cantidad="16">1/4 Gln</div>
                  <div class="row" data-cantidad="32">1/2 Gln</div>
                  <div class="row" data-cantidad="64">Gln</div>
                </div>
              </div>
              <div class="field">
                <div class="label">Cantidad</div>
                <div class="textbox">
                  <input id="txt_add_cantidad" value="1" readonly="true" type="text" placeholder="..." />
                </div>
              </div>
              <div class="field">
                <div class="label">Precio</div>
                <div class="textbox">
                  <input id="txt_add_precio" type="text" placeholder="..." />
                </div>
              </div>

            </div>

            <div class="create_formula hidden">
              <div class="setter" id="setterFormula">
                <div class="new">
                  <div class="label">Nueva formula</div>
                </div>
                <!-- Setter formulas -->
                <div class="field">
                  <div class="label">Descripción</div>
                  <div class="textbox">
                    <input type="text" id="txtDescripcion_formula">
                  </div>
                </div>
                <div class="field">
                  <div class="label">Color</div>
                  <div class="textbox">
                    <input type="text" id="txtColor_formula">
                  </div>
                  <div class="list hidden" id="listProducto_formula"></div>
                </div>
                <div class="field">
                  <div class="label">Gramos</div>
                  <div class="textbox">
                    <input type="text" id="txtGramos_formula" placeholder="0.5">
                  </div>
                  <div class="help">presiona enter</div>
                </div>
                <div class="message">
                  <div id="msgFormula"></div>
                </div>
                <div class="content_button">
                  <div id="button_save_formula" class="button">
                    <div class="label">Almacenar</div>
                  </div>
                  <div id="button_formula_rapida" class="button">
                    <div class="label">Rápida</div>
                  </div>
                </div>

              </div>
            </div>

            <div class="view_formula">
              <div id="listColores" data-peso_formula="0" data-id_formula="0">
                <div class="descripcion_formula">
                  <div class="label">Fórmula</div>
                  <div id="formula_seleccionada"></div>
                  <!-- Eliminar formula -->
                  <div class="content_button" id="content_button_eliminar_formula">
                    <div id="button_eliminar_formula" class="button">
                      <div class="label">Eliminar</div>
                    </div>
                  </div>
                  <!-- Eliminar formula -->
                </div>
                <div class="encabezado">
                  <div class="color">Color</div>
                  <div class="peso">Peso</div>
                </div>
              </div>
            </div>

            <div class="content_button">
              <div class="button" id="button_add_Formula_existente">
                <div class="label">add</div>
              </div>
            </div>

          </div><!-- add Formula -->

          <div class="content_button" id="content_button_add_formula">
            <div class="button" id="button_open_frm_add_formula">
              <div class="label">add Formula</div>
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
          <div id="detalle_producto">
            <div class="info" id="info_grupo">
              <div class="value" id="info_value_grupo">...</div>
              <div class="label">Grupo</div>
            </div>
            <div class="info" id="info_marca">
              <div class="value" id="info_value_marca">...</div>
              <div class="label">Marca</div>

            </div>
            <div class="info" id="info_presentacion">
              <input type="text" id="txt_presentacion" name="" value="" placeholder="..." />
              <div class="label" id="info_value_disponible">Presentacion</div>
              <div class="list hidden" id="list_presentaciones"></div>
            </div>
            <div class="info" id="info_fraccion">
              <input type="text" id="txt_fraccion" placeholder="..." />
              <div class="label">Fraccion</div>
              <div class="list hidden" id="list_fracciones"></div>
            </div>
            <div class="info" id="info_cantidad">
              <input type="text" id="txt_cantidad" placeholder="..." />
              <div class="label">Cantidad</div>
            </div>
            <div class="info" id="info_precio">
              <input type="text" id="txt_precio" placeholder="..." />
              <div class="label">Precio</div>
            </div>
            <div id="Item_empezado">
              <div class="label hidden">Empezados</div>
            </div>

            <div class="content_button">
              <div class="button" id="btnAddItem">
                <div class="label">add Item</div>
              </div>
            </div>

          </div>
          <br />
        </div>

        <div class="content_data">
          <div class="datagrid" id="dataProducto">
            <div class="head">
              <div class="cell codigo">Código</div>
              <div class="cell descripcion">Descripción</div>
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
    </div><!-- ## Universal ## -->
  </div><!-- ## Universal ## -->

</body>

</html>
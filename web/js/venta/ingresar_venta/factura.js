/* 1. Cargar fecha de factura */
function fechaFactura() {
  var Hoy = new Date();
  var dd = Hoy.getDate();
  var mm = Hoy.getMonth() + 1; //hoy es 0!
  var yyyy = Hoy.getFullYear();
  /* Dar formato */
  if (dd < 10) { dd = '0' + dd }
  if (mm < 10) { mm = '0' + mm }
  document.getElementById('txtFecha').value = dd + '/' + mm + '/' + yyyy;

  /* datepicker */
  $(function () {
    $("input#txtFecha").datepicker();
  });
}/* ## Fecha factura ## */

/* 2. Cargar consecutivo */
function getConsecutivo() {
  //  document.getElementById('txtFactura').value = consecutivo_Factura;
  fechaFactura();
  /* Buscar si existe... Cuantas facturas se han guardado hoy! ---> El numero + 1 Define el consecutivo */
  var fecha = document.getElementById('txtFecha').value;

  $.post('ctrlfactura', { Action: 0, Fecha: fecha }, function (r) {
    var consecutivo = parseInt(r) + 1;
    if (consecutivo < 10) { consecutivo_Factura = '000' + consecutivo; }
    else if (consecutivo >= 10 && consecutivo < 100) { consecutivo_Factura = '00' + consecutivo; }
    else if (consecutivo >= 100 && consecutivo < 1000) { consecutivo_Factura = '0' + consecutivo; }
    else { consecutivo_Factura = consecutivo; }
    document.getElementById('txtFactura').value = consecutivo_Factura;
  })
}/* ## Consecutivo ## */

/* 3. Encabezado */

function get_json_encabezado() {

  var id_cliente = document.getElementById('selectedCliente').getAttribute('data-id');
  var factura = document.getElementById('txtFactura').value;
  var forma_pago = parseInt(document.getElementById('fmPago').getAttribute('data-value'));
  var vencimiento = document.getElementById('txtFecha').value;
  var saldo = 0;
  var descuento = 0;
  var iva = document.getElementById('info_iva').innerHTML;
  var total = parseInt(document.getElementById('info_total').innerHTML);
  var anticipo = total;
  var fecha = document.getElementById('txtFecha').value;
  var hora = '';
  /* temporal brige for hour configuration */
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var dn = "a.m";
  if (hours > 12) {
    dn = "p.m";
    hours = hours - 12;
  }
  if (minutes <= 9) {
    minutes = "0" + minutes;
  }
  if (seconds <= 9) {
    seconds = "0" + seconds;
  }

  hora = hours + ":" + minutes + " " + dn;

  /* temporal brige for hour configuration */

  if (forma_pago > 0) {
    anticipo = 0;
    saldo = total - anticipo;/* Generar intereses minimos */
  }

  /* Para factura pdf */
  var cliente = document.getElementById('selectedCliente').innerHTML;
  var nit = document.getElementById('info_value_nit').innerHTML;
  var ciudad = document.getElementById('info_value_ciudad').innerHTML;
  var telefono = document.getElementById('info_value_telefono').innerHTML;
  var direccion = document.getElementById('info_value_direccion').innerHTML;

  /* JSON ---> Encabezado */
  var json_encabezado = {
    Id_cliente: id_cliente, Factura: factura,
    Forma_pago: forma_pago, Anticipo: anticipo,
    Vencimiento: vencimiento, Saldo: saldo,
    Descuento: descuento, Iva: iva,
    Total: total, Fecha: fecha, Hora: hora,
    Cliente: cliente, Nit: nit,
    Ciudad: ciudad, Telefono: telefono,
    Direccion: direccion
  };

  return JSON.stringify(json_encabezado);
}
/* 4. Detalle  */
function get_json_detalle_producto() {

  var json_detalle_producto = new Array();
  var j = 0;

  /* Almacenar detalle de factura */
  $("div#dataProducto div.row").each(function () {


    if (typeof $(this).attr('data-id_formula') !== 'undefined') {
      console.log('Definido id_formula: Es una formula');
      return;
    }

    /* if ( typeof x === 'undefined')

     if(id_formula !== void 0){ */

    /* Saca el id de cada item */
    var id = $(this).attr('id');
    var id_producto = $(this).attr('data-idproducto');
    var codigo = $(this).children('div.codigo').html();
    var descripcion = $(this).children('div.descripcion').children('div').html();
    var unidad = $(this).children('div.unidad').html();
    var id_unidad = $(this).attr('data-idunidad');
    var tipo = parseInt($(this).attr('data-tipo'));
    var cantidad = $(this).children('div.cantidad').html();
    var precio_unidad = $(this).children('div.precio_unidad').children('div').html();
    var iva = 0;
    var descuento = 0;
    /* Parámetros de fracciones */
    var restante = 0;
    var resta_inventario = 0;
    var id_fraccion = 0;

    if (tipo > 0) {/* Es fracción */
      restante = $(this).attr('data-restante');
      resta_inventario = $(this).attr('data-resta_inventario');
      id_fraccion = $(this).attr('data-id_fraccion');
    }

    var fila = new Array();

    fila = {
      Codigo: codigo, Id_producto: id_producto, Descripcion: descripcion, Id_unidad: id_unidad,
      Unidad: unidad, Tipo: tipo, Id_fraccion: id_fraccion, Cantidad: cantidad, Precio_unidad: precio_unidad,
      Descuento: descuento, Iva: iva, Estado: 1, Restante: restante, Resta_inventario: resta_inventario
    };
    /* Se agrega producto al json */
    json_detalle_producto[json_detalle_producto.length] = fila;
  });

  return JSON.stringify(json_detalle_producto);
}/* Detalle de factura */


/* Obtiene el json con el que almacenara el detalle de las formulas */
function get_json_detalle_formula() {

  /* La formula se manda en forma de json */
  var json_detalle_formula = new Array();

  /* Almacenar detalle de factura */
  $("div#dataProducto div.row_formula").each(function () {

    /* if ( typeof x === 'undefined')

     if(id_formula !== void 0){ */

    /* Información para el detalle de la fórmula */
    var id_formula = $(this).attr('data-id_formula');
    var codigo = $(this).children('div.codigo').text();
    var descripcion = $(this).children('div.descripcion').children('div').text();

    var unidad = $(this).children('div.unidad').text();
    var id_unidad = $(this).attr('data-medida');
    var cantidad = $(this).children('div.cantidad').text();
    var precio_unidad = $(this).children('div.precio_unidad').children('div').text();
    var iva = 0;
    var descuento = 0;
    /* Parámetros de fracciones */

    var posicion = parseInt($(this).attr('data-posicion'));
    var fila = new Array();

    var json_productos_formula = get_Json_productos_formula();

    var list_colores = json_productos_formula[posicion].listColores;

    fila = {
      Codigo: codigo, Id_formula: id_formula, Descripcion: descripcion, Id_unidad: id_unidad,
      Unidad: unidad, Cantidad: cantidad, Precio_unidad: precio_unidad, Descuento: descuento,
      Iva: iva, List_colores: list_colores
    };


    json_detalle_formula[json_detalle_formula.length] = fila;
  });

  return json_detalle_formula;

}



/* Facturar */
function Facturar(encabezado, detalle_producto, detalle_formula) {

  var response = {};
  var promise = new Promise(function (resolve, reject) {

    $.post('ctrlfactura', {
      Action: 6, JSON_encabezado: encabezado,
      JSON_detalle_producto: detalle_producto,
      JSON_detalle_formula: detalle_formula
    }, function (r) {/* Callback ...   */
      if (r != '') {
        response = r;
   //     $.notify("Factura ingresada correctamente", "success");
      }
      resolve(response)
    });

    if (!response) {
      reject(new Error('No almacena factura!'))
    }
  })/* promise */

  return promise
}/* ## Facturar  ## */

/* 6. Limpiar campos */

function limpiar_campos() {

  /* oculta otros formularios */
  $('div#frm_add_cliente').removeClass('hidden')
  $('div#frm_add_cliente').addClass('hidden')
  $('div#frm_add_formula').removeClass('hidden')
  $('div#frm_add_formula').addClass('hidden')

  /* Limpiar campos */

  /* a. Factura */
  /* Forma de pago */
  document.getElementById('fmPago').setAttribute('data-value', '-1');
  document.getElementById('fmPago').setAttribute('class', '');
  document.getElementById('fmPago').innerHTML = '- seleccione -';

  /* b. Cliente */
  /* Búsqueda de cliente  */
  document.getElementById('txt_search_cliente').value = '';
  document.getElementById('selectedCliente').setAttribute('data-id', 0);
  document.getElementById('txt_search_cliente').removeAttribute('data-id');
  document.getElementById('selectedCliente').innerHTML = 'Buscar cliente';
  /* datos */
  document.getElementById('info_value_nit').innerHTML = '...';
  document.getElementById('info_value_ciudad').innerHTML = '...';
  document.getElementById('info_value_telefono').innerHTML = '...';
  document.getElementById('info_value_direccion').innerHTML = '...';
  /* historico */
  document.getElementById('info_value_cerradas').innerHTML = '0';
  document.getElementById('info_value_pendientes').innerHTML = '0';
  document.getElementById('info_value_deuda').innerHTML = '0';
  document.getElementById('info_value_saldo').innerHTML = '0';

  /* c. producto */

  /* Búsqueda de producto */
  document.getElementById('txt_search_producto').value = '';
  /* Lista de unidades de medida */
  $('div#list_presentaciones div.row').remove();
  $('div#list_fracciones div.row').remove();

  /* datos del producto */
  document.getElementById('selectedProducto').setAttribute('data-id', 0);
  document.getElementById('selectedProducto').innerHTML = 'Buscar producto';

  document.getElementById('info_value_grupo').innerHTML = '...';
  document.getElementById('info_value_marca').innerHTML = '...';
  document.getElementById('info_value_disponible').innerHTML = 'Presentacion';


  document.getElementById('info_value_pendientes').innerHTML = '0';
  document.getElementById('info_value_deuda').innerHTML = '0';
  document.getElementById('info_value_saldo').innerHTML = '0';

  /* Filas de datagrid  */
  $('div#dataProducto div.row').remove();
  $('div#dataProducto div.row_formula').remove();
  /* Resetea la variable que contiene las fórmulas */
  //         reset_Json_productos_formula();
  /* Resumen de factura */
  document.getElementById('info_subtotal').innerHTML = 0;
  document.getElementById('info_iva').innerHTML = 0;
  document.getElementById('info_total').innerHTML = 0;


  /* Campos Add Item */
  /* Unidad de medida */

  document.getElementById('txt_presentacion').value = '';
  document.getElementById('txt_fraccion').value = '';
  document.getElementById('txt_fraccion').removeAttribute('data-id_fraccion');
  document.getElementById('txt_fraccion').removeAttribute('data-id');
  document.getElementById('txt_fraccion').removeAttribute('data-tipo');

  document.getElementById('txt_cantidad').value = '';
  document.getElementById('txt_precio').value = '';
  $('div#Item_empezado').children('div.label').addClass('hidden');

  /* totalizadores */
  Iva = 0
  Total = 0
}

$(document).on('ready', function () {
  /* 1. Cargar fecha de factura */
  fechaFactura();
  /* 2. Cargar consecutivo */
  getConsecutivo();

  $('div#fmPago').on('click', function () {

    $('div#fmPago').removeClass('fm_pago_error');
    document.getElementById('message_error_venta').innerHTML = '';

    var opcion = $(this).attr('data-value');

    switch (opcion) {
      case '-1':
        $(this).html('Contado');
        $(this).attr('data-value', 0);
        $(this).removeClass('credito');
        $(this).addClass('contado');
        break;
      case '0':
        $(this).html('8 Días');
        $(this).attr('data-value', 1);
        $(this).removeClass('contado');
        $(this).addClass('credito');
        break;
      case '1':
        $(this).html('15 Días');
        $(this).attr('data-value', 2);
        break;
      case '2':
        $(this).html('30 Días');
        $(this).attr('data-value', 3);
        break;
      case '3':
        $(this).html('Contado');
        $(this).attr('data-value', 0);
        $(this).removeClass('credito');
        $(this).addClass('contado');
    }

    opcion = parseInt(opcion);
    if (opcion < 3) {
      $('div#Contado').addClass('hidden');
      $('div#Credito').removeClass('hidden');
    } else {/* Contado */
      $('div#Credito').addClass('hidden');
      $('div#Contado').removeClass('hidden');
    }
  });/* ## Forma de pago ## */

  $('input#txtValor_billetes').on('keydown', function (e) {

    var valor_billetes = parseInt($(this).val() + e.key);
    var total = parseInt($('div#info_total').html());

    var devolucion = valor_billetes - total;
    $('div#info_devolucion').html(devolucion);

  })


  $('div#content_button_finalizar').on('click', 'div#btn_facturar', function () {

    //$.notify("Ingresando factura, por favor espera un momento", "info");

    /* Validaciones ---> Cliente */
    var id_cliente = document.getElementById('selectedCliente').getAttribute('data-id');

    console.log('Id cliente: ' + id_cliente);

    if (id_cliente == 0) {
      /* Evita que continúe con el proceso de almacenamiento, porque no ha seleccionado
        un cliente */
      document.getElementById('txt_search_cliente').focus();
      return;
    }

    /* Validaciones ---> Productos */
    var cantidad_formulas = $('div#dataProducto div.row_formula').length;
    var cantidad_productos = $('div#dataProducto div.row').length;

    console.log('cantidad_formulas: ' + cantidad_formulas);
    console.log('cantidad_productos: ' + cantidad_productos);

    if ((cantidad_formulas === 0) && (cantidad_productos === 0)) {
      /* Se detiene el proceso de almacenamiento hasta que seleccione un producto */
      document.getElementById('txt_search_producto').focus();
      return;
    }


    /* Validar forma de pago */
    var forma_pago = parseInt(document.getElementById('fmPago').getAttribute('data-value'));

    if ((forma_pago < 0)) {
      /* Se detiene el proceso de almacenamiento hasta que seleccione una forma de pago */
      $('div#fmPago').addClass('fm_pago_error');
      document.getElementById('message_error_venta').innerHTML = 'Seleccione la forma de pago';
      return;
    }

    /* if ( typeof x === 'undefined')
          if(id_formula !== void 0){ */

    /* Crea los json para cada grupo*/
    var encabezado = get_json_encabezado();
    var detalle_producto = get_json_detalle_producto();

    console.log('encabezado: ', encabezado);
    console.log('detalle: ', detalle_producto);


    var detalle_formula = JSON.stringify(get_json_detalle_formula());/* Convierte en Strin al Json */

    // var detalle_formula = new Array();;
    //     detalle_formula = JSON.stringify(detalle_formula)


    Facturar(encabezado, detalle_producto, detalle_formula).then(function (r) {

      var factura = document.getElementById('txtFactura').value;


      limpiar_campos();

      /* Abrir factura en una nueva pestaña */
      setTimeout(function () {

        var a = document.createElement('a');
        a.target = '_blank';
        a.href = '/paintSoft/pdf/set' + factura + '.pdf';
        a.click();
        getConsecutivo();
        fechaFactura();

      }, 3000);

    })

  })

  $('div#content_button_finalizar').on('click', 'div#btn_cotizar', function () {


    var json_encabezado_cotizacion = get_json_encabezado_cotizacion();
    var json_detalle_cotizacion = JSON.stringify(get_json_detalle_producto_cotizacion());

    console.log('Json encabezado: ' + json_encabezado_cotizacion);
    console.log('Json detalle: ' + json_detalle_cotizacion);
    var random = Math.floor((Math.random() * 100000) + 1);
    var archivo = 'Cotizacion' + random + '.pdf';

    console.log('Archivo ' + archivo);

    $.post('ctrlcotizacion', {
      A: 1, JSON_encabezado: json_encabezado_cotizacion,
      JSON_detalle_producto: json_detalle_cotizacion, Archivo: archivo
    }, function (r) { });


    /* Abrir factura en una nueva pestaña */
    setTimeout(function () {
      var a = document.createElement('a');
      a.target = '_blank';
      a.href = '/paintSoft/pdf/' + archivo;
      a.click();

      limpiar_campos();
    }, 3000);
  })


  function get_json_encabezado_cotizacion() {

    var id_cliente = document.getElementById('selectedCliente').getAttribute('data-id');
    var factura = 'Cotización';
    var forma_pago = 'Cotización';
    var descuento = 0//document.getElementById('info_descuento').innerHTML;
    var iva = document.getElementById('info_iva').innerHTML;
    var total = parseInt(document.getElementById('info_total').innerHTML);
    var fecha = document.getElementById('txtFecha').value;
    var hora = '';
    /* temporal brige for hour configuration */
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var dn = "a.m";
    if (hours > 12) {
      dn = "p.m";
      hours = hours - 12;
    }
    if (minutes <= 9) {
      minutes = "0" + minutes;
    }
    if (seconds <= 9) {
      seconds = "0" + seconds;
    }

    hora = hours + ":" + minutes + " " + dn;

    /* temporal brige for hour configuration */
    /* Para factura pdf */
    var cliente = document.getElementById('selectedCliente').innerHTML;
    var nit = document.getElementById('info_value_nit').innerHTML;
    var ciudad = document.getElementById('info_value_ciudad').innerHTML;
    var telefono = document.getElementById('info_value_telefono').innerHTML;
    var direccion = document.getElementById('info_value_direccion').innerHTML;

    /* JSON ---> Encabezado */
    var json_encabezado = '{"Id_cliente":' + id_cliente + ', "Factura":"' + factura +
      '", "Forma_pago":"' + forma_pago +
      '", "Descuento":"' + descuento + '", "Iva":"' + iva +
      '", "Total":"' + total + '", "Fecha":"' + fecha +
      '","Hora":"' + hora + '", "Cliente":"' + cliente + '", "Nit":"' + nit +
      '", "Ciudad":"' + ciudad + '", "Telefono":"' + telefono +
      '", "Direccion":"' + direccion + '"}';

    return json_encabezado;
  }


  /* Obtiene una variable json con la información necesaria de los
     productos para almacenar la factura */
  function get_json_detalle_producto_cotizacion() {


    var json_detalle_producto = new Array();

    $("div#dataProducto div.row").each(function () {

      var id_producto = $(this).attr('data-idproducto');
      var codigo = $(this).children('div.codigo').html();
      var descripcion = $(this).children('div.descripcion').children('div').html();
      var unidad = $(this).children('div.unidad').html();
      var cantidad = $(this).children('div.cantidad').html();
      var precio_unidad = $(this).children('div.precio_unidad').children('div').html();
      var descuento = 0;
      /* Parámetros de fracciones */

      var fila = new Array();

      fila = {
        Codigo: codigo, Id_producto: id_producto, Descripcion: descripcion, Unidad: unidad,
        Cantidad: cantidad, Precio_unidad: precio_unidad, Descuento: descuento
      };
      /* Se agrega producto al json */
      json_detalle_producto[json_detalle_producto.length] = fila;
    });

    return json_detalle_producto;
  }

})






/**/

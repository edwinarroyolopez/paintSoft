$(document).on('ready',function(){
  /* Archivo usado para navegar entre las diferentes tabs de la pagina ventas */
  console.log('Venta.js');

  /* Ingresar venta */
  $('div.content_tab').on('click','div#tab_ingresar_venta',function(){
    console.log('Tab ingresar venta!');
    form_ingresar_venta()
  })
  /* Factura */
  $('div.content_tab').on('click','div#tab_factura',function(){
    form_factura()
  })
  /* Configuracion */
  $('div.content_tab').on('click','div#tab_configuracion',function(){
    form_configuracion()
  })
  /* Ventas realizadas */
  $('div.content_tab').on('click','div#tab_ventas_realizadas',function(){
    form_ventas_realizadas()
  })


  require(['js/new/venta/componentes/ingresar_venta']).then(imports => {
    console.log('imports', imports);
    var ingresar_venta = imports[0];
    ingresar_venta.save();
  }).catch(console.log);

  

})

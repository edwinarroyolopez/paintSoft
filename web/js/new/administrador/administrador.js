
/* In the Dom */
$(document).on('ready',function(){



      /* Click in button */
      $('div#btn_prueba').on('click',function(){
            $(this).html('<div class="label">Has dado click</div>');
      });

      /* Navegador */
        $('nav#left').on('click','a#nav_Productos',function(){

                    console.log('Productos!');
                  inicializar_producto();
                  $('div#header div.label').html('Productos');
        });
        $('nav#left').on('click','a#nav_Clientes',function(){

                  console.log('Clientes!');
                  inicializar_cliente();
                  $('div#header div.label').html('Clientes');
        });
        $('nav#left').on('click','a#nav_Proveedores',function(){

                  console.log('Proveedores!');
                  inicializar_proveedor();
                  $('div#header div.label').html('Proveedores');
        });
        $('nav#left').on('click','a#nav_Compras',function(){
                console.log('Compras!');
                  inicializar_compra();
                $('div#header div.label').html('Compras');
        });
        $('nav#left').on('click','a#nav_Facturas',function(){
                console.log('Facturas!');
                  inicializar_factura();
                $('div#header div.label').html('Facturas');
        });


});

/* outs functions ---- Library */

/* Validar campos vacíos */
function validar_textbox_vacios(pmtParent){

                    var control = 0;

                  $('div#'+pmtParent + ' input').each(function(){

                                if(control==0){/* No hay antecedentes de cajas vacías */
                                                if($(this).val()==''){/* Si la caja actual es vacía */
                                                    $(this).focus();
                                                    control = 1;
                                                }
                                }/* control = 0 */
                  });/* Recorre cada textbox */

                  return control; /* 1 ==> Encontró cajas vacías */
}/* function: validar textbox vacios */

function search_in_datagrid(List,Filter,Limit){

                  /* parse string filter to lowercase */
                    Filter = Filter.toLowerCase();
                /* count rows */
                      var count = 0;

                      $(List).each(function(){

                                    /* export text parsing to lowercase */
                                    var text = $(this).text().toLowerCase();

                                    if(text.indexOf(Filter)!==-1){/* filter are in text */

                                            /* Limit of visible rows */
                                                  if(count<Limit){
                                                          $(this).removeClass('hidden');
                                                  }else{
                                                          $(this).addClass('hidden');
                                                  }
                                                      /* row counter */
                                                        count = count + 1;
                                    }else{/* here is no text */
                                         $(this).addClass('hidden');
                                   }/* Filter */

                      });/* each row */

}/* function: searcher in datagrid */


/* 1. Cargar fecha de factura */
  function fechaFactura(){
        var Hoy =   new Date();
        var dd = Hoy.getDate();
        var mm = Hoy.getMonth()+1; //hoy es 0!
        var yyyy = Hoy.getFullYear();
        /* Dar formato */
        if(dd<10) {dd='0'+dd}
        if(mm<10) {mm='0'+mm}
        document.getElementById('txtFecha').value = dd+'/'+mm+'/'+yyyy;

        /* datepicker */
            $( function() {
              $( "input#txtFecha" ).datepicker();
            } );
  }/* ## Fecha factura ## */


  /* 4. get Historico */
  function getHistoria(id_proveedor){

         var response = {};

           var promise = new Promise(function (resolve, reject) {

                       $.post('ctrlproveedor',{Action: 3,Id_proveedor:id_proveedor}, function(r){/* Callback ...   */
                               if(r != ''){
                                 response = r;
                               }
                               resolve(response)
                       });

                       if (!response) {
                         reject(new Error('No trae proveedores!'))
                       }
           })/* promise */
           return promise
   }/* ## get Historico ## */

   /* 5. get Facturas cerradas */
   function get_Facturas_cerradas(id_proveedor){

          var response = {};

            var promise = new Promise(function (resolve, reject) {

                        $.post('ctrlproveedor',{Action: 4,Id_proveedor:id_proveedor}, function(r){/* Callback ...   */
                                if(r != ''){
                                  response = r;
                                }
                                resolve(response)
                        });

                        if (!response) {
                          reject(new Error('No trae facturas cerradas!'))
                        }
            })/* promise */
            return promise
    }/* ## get Facturas cerradas ## */

    /* 6. get Facturas pendientes */
    function get_Facturas_pendientes(id_proveedor){

           var response = {};

             var promise = new Promise(function (resolve, reject) {

                         $.post('ctrlproveedor',{Action: 5,Id_proveedor:id_proveedor}, function(r){/* Callback ...   */
                                 if(r != ''){
                                   response = r;
                                 }
                                 resolve(response)
                         });

                         if (!response) {
                           reject(new Error('No trae facturas pendientes!'))
                         }
             })/* promise */
             return promise
     }/* ## get Facturas pendientes ## */


  /* 7. busqueda en list */
   function busqueda_List(pmtTexto,pmtList){


        pmtTexto = pmtTexto.toLowerCase();/* Transformo el texto a minúsculas */

           /* Recorro cada fila de la lista */
         $('div#'+pmtList+' div.row').each(function(){

            var  row = $(this).text();/* Contiene exto de la fila */
                 row = row.toLowerCase();

                 var i = 0; /* Controla número de filas visibles */

                  if (row.indexOf(pmtTexto)!==-1) {/* Existen resultados*/

                                    i = i + 1;/* Solo puedo hacer visible a 14 Items */

                                    if(i<=15){
                                        $(this).removeClass('hidden');
                                    }else{
                                        $(this).addClass('hidden');
                                    }

                             }else{/* No coincide con texto entrante */
                                    $(this).addClass('hidden');
                             }
         });

    }


$(document).on('ready',function(){
  /* 1. Cargar fecha de factura */
    fechaFactura();


    /* Hacer visible la lista de proveedores */
   $('div#content_search_proveedor').on('focusin','input#txt_search_proveedor',function(){
       $('div#listProveedores').removeClass('hidden');
   });
   /* Esconder lista de proveedores */
   $('div#content_search_proveedor').on('focusout','input#txt_search_proveedor',function(){
       setTimeout(function(){
           $('div#listProveedores').addClass('hidden');

           /* Resetear lista de proveedores*/
           var i = 0;
             $("div#listProveedores div.row").each(function(){
                 i = i + 1;
                 if(i<=14){$(this).removeClass('hidden')}

             });
       },500);

   });
   /* Buscar dentro de lista */
   $('div#content_search_proveedor').on('keypress','input#txt_search_proveedor',function(e){
          var texto = $(this).val()+e.key;
         /* Evita la acción cuando es la tecla Enter */
         if(e.keyCode==13){e.preventDefault();}

         busqueda_List(texto,'listProveedores');

   });

   

 $('div#fmPago').on('click',function(){

            $('div#fmPago').removeClass('fm_pago_error');

             var opcion = $(this).attr('data-value');

             switch (opcion){
                     case '-1':
                         $(this).html('Contado');
                         $(this).attr('data-value',0);
                         $(this).removeClass('credito');
                         $(this).addClass('contado');
                         break;
                     case '0':
                         $(this).html('8 Días');
                         $(this).attr('data-value',1);
                         $(this).removeClass('contado');
                         $(this).addClass('credito');
                         break;
                     case '1':
                        $(this).html('15 Días');
                        $(this).attr('data-value',2);
                         break;
                     case '2':
                        $(this).html('30 Días');
                        $(this).attr('data-value',3);
                         break;
                     case '3':
                         $(this).html('Contado');
                         $(this).attr('data-value',0);
                         $(this).removeClass('credito');
                         $(this).addClass('contado');
             }

             opcion = parseInt(opcion);
             if(opcion<3){
                 $('div#Contado').addClass('hidden');
                 $('div#Credito').removeClass('hidden');
             }else{/* Contado */
                 $('div#Credito').addClass('hidden');
                 $('div#Contado').removeClass('hidden');
             }
    });/* ## Forma de pago ## */

    /* Control de visibilidad de listas */
    $('body').on('click',function(){
          if(!bool_hidden_list){/* Se hacen invisibles */
              $('div#list_facturas_cerradas').attr('class','list hidden')
              $('div#list_facturas_pendientes').attr('class','list hidden')
          }
    })

    var bool_hidden_list = false

    /* Facturas cerradas */
    $('div#historico').on('click','div#info_value_cerradas',function(){

            $('div#list_facturas_pendientes').attr('class','list hidden')
            bool_hidden_list = true

           var id_proveedor = parseInt(document.getElementById('selectedProveedor').getAttribute('data-id'))
           var cerradas = parseInt($(this).text())

           if( id_proveedor>0 && cerradas>0 ){/* Proveedor seleccionado y hay facturas cerradas */
              get_Facturas_cerradas(id_proveedor).then(function(facturas_cerradas){

                      facturas_cerradas = JSON.parse(facturas_cerradas)
                      $('div#list_facturas_cerradas').removeClass('hidden')
                      $('div#list_facturas_cerradas div.row').remove()

                      for(i in facturas_cerradas){
                            //facturas_cerradas[i].Numero
                              if(i<=10){
                                var row = document.createElement('div')
                                    row.setAttribute('class','row')
                                    row.innerHTML = facturas_cerradas[i].Numero
                                    document.getElementById('list_facturas_cerradas').appendChild(row);
                              }
                      }

                      setTimeout(function(){bool_hidden_list=false},2000)
              })
           }
    })/* ## Cerradas ## */

    /* Facturas pendientes */
    $('div#historico').on('click','div#info_value_pendientes',function(){

            $('div#list_facturas_cerradas').attr('class','list hidden')
            bool_hidden_list = true

           var id_proveedor = parseInt(document.getElementById('selectedProveedor').getAttribute('data-id'))
           var pendientes = parseInt($(this).text())

           if( id_proveedor>0 && pendientes>0 ){/* Proveedor seleccionado y hay facturas pendientes */


              get_Facturas_pendientes(id_proveedor).then(function(facturas_pendientes){

                  facturas_pendientes = JSON.parse(facturas_pendientes)
                  $('div#list_facturas_pendientes').removeClass('hidden')
                  $('div#list_facturas_pendientes div.row').remove()

                  for(i in facturas_pendientes){

                          if(i<=10){
                              var row = document.createElement('div')
                                  row.setAttribute('class','row')
                                  row.innerHTML = facturas_pendientes[i].Numero
                                  document.getElementById('list_facturas_pendientes').appendChild(row);
                          }
                  }

                  setTimeout(function(){bool_hidden_list=false},2000)

              })
           }
   })/* ## Pendientes ## */




})

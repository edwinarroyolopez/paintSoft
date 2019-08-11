
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

/* 2. Cargar consecutivo */
function getConsecutivo(){
  //  document.getElementById('txtFactura').value = consecutivo_Factura;
       fechaFactura();
      /* Buscar si existe... Cuantas facturas se han guardado hoy! ---> El numero + 1 Define el consecutivo */
       var fecha = document.getElementById('txtFecha').value;

      $.post('ctrlfactura',{Action:0,Fecha:fecha},function(r){
              var consecutivo = parseInt(r)+1;
              if(consecutivo<10){consecutivo_Factura = '000'+consecutivo; }
              else if(consecutivo>=10 && consecutivo<100){ consecutivo_Factura = '00'+consecutivo;}
              else if(consecutivo>=100 && consecutivo<1000){ consecutivo_Factura = '0' +consecutivo;}
              else{ consecutivo_Factura = consecutivo; }
              document.getElementById('txtFactura').value = consecutivo_Factura;
      })
}/* ## Consecutivo ## */

/* 3. Cargar clientes */
function carga_Clientes(){

          var response = {};

          var promise = new Promise(function (resolve, reject) {

                      $.post('ctrlcliente',{Action: 2}, function(r){/* Callback ...   */
                              if(r != ''){
                                response = r;
                              }
                              resolve(response)
                      });

                      if (!response) {
                        reject(new Error('No trae clientes!'))
                      }
          })/* promise */

          return promise

  }/* ## Cargar clientes ## */

  /* 4. get Historico */
  function getHistoria(id_cliente){

         var response = {};

           var promise = new Promise(function (resolve, reject) {

                       $.post('ctrlcliente',{Action: 3,Id_cliente:id_cliente}, function(r){/* Callback ...   */
                               if(r != ''){
                                 response = r;
                               }
                               resolve(response)
                       });

                       if (!response) {
                         reject(new Error('No trae clientes!'))
                       }
           })/* promise */
           return promise
   }/* ## get Historico ## */

   /* 5. get Facturas cerradas */
   function get_Facturas_cerradas(id_cliente){

          var response = {};

            var promise = new Promise(function (resolve, reject) {

                        $.post('ctrlcliente',{Action: 4,Id_cliente:id_cliente}, function(r){/* Callback ...   */
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
    function get_Facturas_pendientes(id_cliente){

           var response = {};

             var promise = new Promise(function (resolve, reject) {

                         $.post('ctrlcliente',{Action: 5,Id_cliente:id_cliente}, function(r){/* Callback ...   */
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
  /* 2. Cargar consecutivo */
    getConsecutivo();
 /* 3. Cargar clientes */
    carga_Clientes().then(function(clientes){

              clientes =   jQuery.parseJSON(clientes);

              /* Limpiar lista */
              $('div#listClientes div.row').remove();

              for (i in clientes){

                     var row = document.createElement('div');
                     row.setAttribute('class','row');
                     row.setAttribute('data-id',clientes[i].Id);
                     row.setAttribute('data-telefono',clientes[i].Telefono);
                     row.setAttribute('data-direccion',clientes[i].Direccion);
                     row.setAttribute('data-ciudad',clientes[i].Ciudad);
                     row.setAttribute('data-email',clientes[i].Email);
                     var nombre = document.createElement('div');
                     nombre.setAttribute('class','nombre');
                     nombre.innerHTML = clientes[i].Nombre;
                     var documento = document.createElement('div');
                     documento.setAttribute('class','documento');
                     documento.innerHTML = clientes[i].Documento;
                     row.appendChild(nombre);
                     row.appendChild(documento);

                     if(i>=14){
                         row.setAttribute('class','row hidden');
                     }else{/* Cantidad de items visibles */
                         document.getElementById('listClientes').setAttribute('data-items',i);
                     }
                     document.getElementById('listClientes').appendChild(row);
               }

    });/* ## get Clientes ## */


    /* Hacer visible la lista de clientes */
   $('div#content_search_cliente').on('focusin','input#txt_search_cliente',function(){
       $('div#listClientes').removeClass('hidden');
   });
   /* Esconder lista de clientes */
   $('div#content_search_cliente').on('focusout','input#txt_search_cliente',function(){
       setTimeout(function(){
           $('div#listClientes').addClass('hidden');

           /* Resetear lista de clientes*/
           var i = 0;
             $("div#listClientes div.row").each(function(){
                 i = i + 1;
                 if(i<=14){$(this).removeClass('hidden')}

             });
       },500);

   });
   /* Buscar dentro de lista */
   $('div#content_search_cliente').on('keypress','input#txt_search_cliente',function(e){
          var texto = $(this).val()+e.key;
         /* Evita la acción cuando es la tecla Enter */
         if(e.keyCode==13){e.preventDefault();}

         busqueda_List(texto,'listClientes');

   });

   $('div#listClientes').on('click','div.row', function(){
     /* Getter */
                  var nombre = $(this).children('div.nombre').html();
                  var id_cliente = $(this).attr('data-id');
                  var documento = $(this).children('div.documento').html();
                  var telefono = $(this).attr('data-telefono');
                  var direccion = $(this).attr('data-direccion');
                  var ciudad = $(this).attr('data-ciudad');
                  var email = $(this).attr('data-email');

                  /* Setter */
                  document.getElementById('selectedCliente').setAttribute('data-id',id_cliente)
                  document.getElementById('selectedCliente').innerHTML = nombre
                  document.getElementById('info_value_nit').innerHTML=documento
                  document.getElementById('info_value_ciudad').innerHTML= ciudad
                  document.getElementById('info_value_telefono').innerHTML=telefono
                  document.getElementById('info_value_direccion').innerHTML=direccion

                  /* Esconder lista */
                  $('div#listClientes').addClass('hidden');

                  /* Historia  */
                  getHistoria(id_cliente).then(function(historia){

                      historia = JSON.parse(historia)
                      document.getElementById('info_value_cerradas').innerHTML=historia.Cerradas
                      document.getElementById('info_value_pendientes').innerHTML= historia.Pendientes
                      document.getElementById('info_value_deuda').innerHTML=historia.Deuda
                      document.getElementById('info_value_saldo').innerHTML=historia.Saldo
                  })

   })/* ## selecciona cliente ## */

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

           var id_cliente = parseInt(document.getElementById('selectedCliente').getAttribute('data-id'))
           var cerradas = parseInt($(this).text())

           if( id_cliente>0 && cerradas>0 ){/* Cliente seleccionado y hay facturas cerradas */
              get_Facturas_cerradas(id_cliente).then(function(facturas_cerradas){

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

           var id_cliente = parseInt(document.getElementById('selectedCliente').getAttribute('data-id'))
           var pendientes = parseInt($(this).text())

           if( id_cliente>0 && pendientes>0 ){/* Cliente seleccionado y hay facturas pendientes */


              get_Facturas_pendientes(id_cliente).then(function(facturas_pendientes){

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

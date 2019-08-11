/* 1. Cargar clientes */
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

     /* 7. Almacena cliente */
     function create_Cliente(nombre,documento,telefono,ciudad){

            var response = {};

              var promise = new Promise(function (resolve, reject) {

                      $.post('ctrlcliente',{Action:1,Nombre:nombre,Documento:documento,Telefono:telefono,Ciudad:ciudad,
                                            Id_cliente:0,Direccion:'N/A',Email:'N/A'}, function(r){/* Callback ...   */
                              if(r != ''){
                                response = r;
                              }
                              resolve(response)
                      });

                      if (!response) {
                        reject(new Error('Cliente no almacenado!'))
                      }
              })/* promise */
              return promise
      }/* ##   Almacena cliente ## */


$(document).on('ready',function(){
 /* 1. Cargar clientes */
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
                                      document.getElementById('list_facturas_pendientes').appendChild(row)
                                }
                        }
                        setTimeout(function(){bool_hidden_list=false},2000)
                })
           }
   })/* ## Pendientes ## */

/* Open frm add cliente */
$('div#content_button_add_cliente').on('click','div#button_open_frm_add_cliente',function(){

  /* Limpia campos */
    $('div#frm_add_cliente input').val('')
    $('div#frm_add_cliente').removeClass('hidden')

    /* oculta otros formularios */
    $('div#frm_add_formula').removeClass('hidden')
    $('div#frm_add_formula').addClass('hidden')

})
/* Close frm add cliente */
$('div#frm_add_cliente').on('click','div#button_close_frm_cliente',function(){
    $('div#frm_add_cliente').addClass('hidden')
})

/* almacena cliente */
$('div#frm_add_cliente').on('click','div#button_add_Cliente',function(){


                             var control = 0;
                             /* Valida campos vacios */
                             $('div#frm_add_cliente input').each(function(){

                                   if($(this).val()==''){
                                     control = 1;
                                      $(this).focus()
                                      return false;
                                   }

                             })

                             if(control>0){return;}


                             /* Parámetros */
                             var nombre = document.getElementById('txt_add_nombre').value;
                             var documento = document.getElementById('txt_add_documento').value;
                             var telefono = document.getElementById('txt_add_telefono').value;
                             var ciudad = document.getElementById('txt_add_ciudad').value;

                             create_Cliente(nombre,documento,telefono,ciudad).then(function(id_cliente){
                                     /* Item para la lista de clientes */
                                     var row = document.createElement('div');
                                         row.setAttribute('class','row');
                                         row.setAttribute('data-id',id_cliente);
                                         row.setAttribute('data-telefono',telefono);
                                         row.setAttribute('data-direccion','N/A');
                                         row.setAttribute('data-ciudad',ciudad);
                                         row.setAttribute('data-email','N/A');

                                     var div_nombre = document.createElement('div');
                                         div_nombre.setAttribute('class','nombre');
                                         div_nombre.innerHTML = nombre;

                                     var div_documento = document.createElement('div');
                                         div_documento.setAttribute('class','documento');
                                         div_documento.innerHTML = documento;

                                         row.appendChild(div_nombre);
                                         row.appendChild(div_documento);

                                         /* Agregar al principio */

                                          var primera_fila = document.getElementById('listClientes').getElementsByTagName('div')[0];
                                              document.getElementById('listClientes').insertBefore(row,primera_fila);

                                         /* Hace invisible al contenedor */
                                              $('div#frm_add_cliente').addClass('hidden')
                                             /* Hace visible a la lista de clientes */
                                             document.getElementById('txt_search_cliente').focus();
                             })



                                /* Limpia */
                                       document.getElementById('txt_add_nombre').value = '';
                                       document.getElementById('txt_add_documento').value = '';
                                       document.getElementById('txt_add_telefono').value = '';
                                       document.getElementById('txt_add_ciudad').value = '';


                                     })/* add cliente */

})

/* 1. Cargar proveedores */
function carga_Proveedores(){

          var response = {};

          var promise = new Promise(function (resolve, reject) {

                      $.post('ctrlproveedor',{Action: 2}, function(r){/* Callback ...   */
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

  }/* ## Cargar proveedores ## */

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

     /* 7. Almacena proveedor */
     function create_Proveedor(nombre,documento,telefono,ciudad){

            var response = {};

              var promise = new Promise(function (resolve, reject) {
        
                      $.post('ctrlproveedor',{Action:1,Razon_social:razon_social,Nit:nit,Contacto:'N/A',Ciudad:ciudad,Direccion:'N/A',
                                              Telefono_1:telefono_1,Telefono_2:'N/A',Email:'N/A',Banco:'N/A',Tipo_cuenta:'N/A',
                                              Numero_cuenta:'N/A',Titular_cuenta:'N/A'}, function(r){/* Callback ...   */
                              if(r != ''){
                                response = r;
                              }
                              resolve(response)
                      });

                      if (!response) {
                        reject(new Error('Proveedor no almacenado!'))
                      }
              })/* promise */
              return promise
      }/* ##   Almacena proveedor ## */


$(document).on('ready',function(){
 /* 1. Cargar proveedores */
    carga_Proveedores().then(function(proveedores){

              proveedores =   jQuery.parseJSON(proveedores);

              /* Limpiar lista */
              $('div#listProveedores div.row').remove();

              for (i in proveedores){

                     var row = document.createElement('div');
                     row.setAttribute('class','row');
                     row.setAttribute('data-id',proveedores[i].Id);
                     row.setAttribute('data-telefono',proveedores[i].Telefono);
                     row.setAttribute('data-direccion',proveedores[i].Direccion);
                     row.setAttribute('data-ciudad',proveedores[i].Ciudad);
                     row.setAttribute('data-email',proveedores[i].Email);
                     var nombre = document.createElement('div');
                     nombre.setAttribute('class','nombre');
                     nombre.innerHTML = proveedores[i].Nombre;
                     var documento = document.createElement('div');
                     documento.setAttribute('class','documento');
                     documento.innerHTML = proveedores[i].Documento;
                     row.appendChild(nombre);
                     row.appendChild(documento);

                     if(i>=14){
                         row.setAttribute('class','row hidden');
                     }else{/* Cantidad de items visibles */
                         document.getElementById('listProveedores').setAttribute('data-items',i);
                     }
                     document.getElementById('listProveedores').appendChild(row);
               }

    });/* ## get Proveedores ## */

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

   $('div#listProveedores').on('click','div.row', function(){
                  /* Getter */
                  var nombre = $(this).children('div.nombre').html();
                  var id_proveedor = $(this).attr('data-id');
                  var documento = $(this).children('div.documento').html();
                  var telefono = $(this).attr('data-telefono');
                  var direccion = $(this).attr('data-direccion');
                  var ciudad = $(this).attr('data-ciudad');
                  var email = $(this).attr('data-email');

                  /* Setter */
                  document.getElementById('selectedProveedor').setAttribute('data-id',id_proveedor)
                  document.getElementById('selectedProveedor').innerHTML = nombre
                  document.getElementById('info_value_nit').innerHTML=documento
                  document.getElementById('info_value_ciudad').innerHTML= ciudad
                  document.getElementById('info_value_telefono').innerHTML=telefono
                  document.getElementById('info_value_direccion').innerHTML=direccion

                  /* Esconder lista */
                  $('div#listProveedores').addClass('hidden');

                  /* Historia  */
                  getHistoria(id_proveedor).then(function(historia){

                      historia = JSON.parse(historia)
                      document.getElementById('info_value_cerradas').innerHTML=historia.Cerradas
                      document.getElementById('info_value_pendientes').innerHTML= historia.Pendientes
                      document.getElementById('info_value_deuda').innerHTML=historia.Deuda
                      document.getElementById('info_value_saldo').innerHTML=historia.Saldo
                  })

   })/* ## selecciona proveedor ## */

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
                                      document.getElementById('list_facturas_pendientes').appendChild(row)
                                }
                        }
                        setTimeout(function(){bool_hidden_list=false},2000)
                })
           }
   })/* ## Pendientes ## */

/* Open frm add proveedor */
$('div#content_button_add_proveedor').on('click','div#button_open_frm_add_proveedor',function(){

  /* Limpia campos */
    $('div#frm_add_proveedor input').val('')
    $('div#frm_add_proveedor').removeClass('hidden')

    /* oculta otros formularios */
    $('div#frm_add_formula').removeClass('hidden')
    $('div#frm_add_formula').addClass('hidden')

})
/* Close frm add proveedor */
$('div#frm_add_proveedor').on('click','div#button_close_frm_proveedor',function(){
    $('div#frm_add_proveedor').addClass('hidden')
})

/* almacena proveedor */
$('div#frm_add_proveedor').on('click','div#button_add_Proveedor',function(){


                             var control = 0;
                             /* Valida campos vacios */
                             $('div#frm_add_proveedor input').each(function(){

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

                             create_Proveedor(nombre,documento,telefono,ciudad).then(function(id_proveedor){
                                     /* Item para la lista de proveedores */
                                     var row = document.createElement('div');
                                         row.setAttribute('class','row');
                                         row.setAttribute('data-id',id_proveedor);
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

                                          var primera_fila = document.getElementById('listProveedores').getElementsByTagName('div')[0];
                                              document.getElementById('listProveedores').insertBefore(row,primera_fila);

                                         /* Hace invisible al contenedor */
                                              $('div#frm_add_proveedor').addClass('hidden')
                                             /* Hace visible a la lista de proveedores */
                                             document.getElementById('txt_search_proveedor').focus();
                             })



                                /* Limpia */
                                       document.getElementById('txt_add_nombre').value = '';
                                       document.getElementById('txt_add_documento').value = '';
                                       document.getElementById('txt_add_telefono').value = '';
                                       document.getElementById('txt_add_ciudad').value = '';


                                     })/* add proveedor */

})

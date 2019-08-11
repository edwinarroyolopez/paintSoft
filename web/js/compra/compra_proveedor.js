
 /* Funciona para todas las listas: Formulario ---> Fómulas */
    function busqueda_List(pmtTexto,pmtList,pmtChild){


        pmtTexto = pmtTexto.toLowerCase();/* Transformo el texto a minúsculas */

           /* Recorro cada fila de la lista */
         $('div#'+pmtList+' div.item').each(function(){

            var  row = $(this).children(pmtChild).text();/* Contiene exto de la fila */
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

    var json_proveedores;

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

    }/* Fin carga de proveedores */

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
        
    }
$(document).on('ready', function(){

    
                    carga_Proveedores().then(function(proveedores){
                        
                           proveedores =   jQuery.parseJSON(proveedores);
                           json_proveedores = proveedores;
                           
                           
                              /* Limpiar lista */
                              $('div#listProveedores div.item').remove();

                              for (i in proveedores){

                                    var item = document.createElement('div');
                                        item.setAttribute('class','row');
                                        item.setAttribute('data-id',proveedores[i].Id);
                                        item.setAttribute('data-razon_social',proveedores[i].Razon_Social);
                                        item.setAttribute('data-nit',proveedores[i].Nit);
                                        item.setAttribute('data-contacto',proveedores[i].Contacto);
                                        item.setAttribute('data-ciudad',proveedores[i].Ciudad);
                                        item.setAttribute('data-direccion',proveedores[i].Direccion);
                                        item.setAttribute('data-telefono_1',proveedores[i].Telefono_1);
                                        item.setAttribute('data-telefono_2',proveedores[i].Telefono_2);
                                        item.setAttribute('data-email',proveedores[i].Email);
                                        item.setAttribute('data-banco',proveedores[i].Banco);
                                        item.setAttribute('data-tipo_cuenta',proveedores[i].Tipo_Cuenta);
                                        item.setAttribute('data-numero_cuenta',proveedores[i].Numero_Cuenta);
                                        item.setAttribute('data-titular_cuenta',proveedores[i].Titular_Cuenta);
                                        
                                        var nombre = document.createElement('div');
                                        nombre.setAttribute('class','nombre');
                                        nombre.innerHTML = proveedores[i].Razon_Social;
                                        var documento = document.createElement('div');
                                        documento.setAttribute('class','documento');
                                        documento.innerHTML = proveedores[i].Nit;
                                        item.appendChild(nombre);
                                        item.appendChild(documento);

                                     if(i>=14){
                                         item.setAttribute('class','item hidden');
                                     }else{/* Cantidad de items visibles */
                                         document.getElementById('listProveedores').setAttribute('data-items',i);
                                     }
                                     document.getElementById('listProveedores').appendChild(item);
                               }
                        
                    });/* ## get Proveedores ## */


    /* Seleccionar proveedor */
    $('div#listProveedores').on('click','div.row',function(){
        
                console.log('Click sobre row -> Proveedor!')
                
                    /* Getter */
                        var id = $(this).attr('data-id')
                        var razon_social = $(this).attr('data-razon_social')
                        var nit = $(this).attr('data-nit')
                        var contacto = $(this).attr('data-contacto')
                        var ciudad = $(this).attr('data-ciudad')
                        var direccion = $(this).attr('data-direccion')
                        var telefono_1 = $(this).attr('data-telefono_1')
                        var telefono_2 = $(this).attr('data-telefono_2')
                        var email = $(this).attr('data-email')
                        var banco = $(this).attr('data-banco')
                        var tipo_cuenta = $(this).attr('data-tipo_cuenta')
                        var numero_cuenta = $(this).attr('data-numero_cuenta')
                        var titular_cuenta = $(this).attr('data-titular_cuenta')
                    
                    /* Setter */
                    document.getElementById('selectedProveedor').setAttribute('data-id',id);
                    document.getElementById('selectedProveedor').innerHTML =     razon_social
                    document.getElementById('info_value_nit').innerHTML =     nit
                    document.getElementById('info_value_ciudad').innerHTML =     ciudad
                    document.getElementById('info_value_telefono').innerHTML =   telefono_1
                    
                    /* Esconder lista */
                    $('div#listProveedores').addClass('hidden');
                        
                    /* Historia  */
                    getHistoria(id).then(function(historia){
                      historia = JSON.parse(historia)
                      document.getElementById('info_value_cerradas').innerHTML=historia.Cerradas
                      document.getElementById('info_value_pendientes').innerHTML= historia.Pendientes
                      document.getElementById('info_value_deuda').innerHTML=historia.Deuda
                      document.getElementById('info_value_saldo').innerHTML= '--' //historia.Saldo
                    })
                    

    });/* ## seleccionar proveedor ## */

                   /* Hacer visible la lista de proveedores */
                   $('div#s_busqueda_proveedor').on('focusin','input#txt_search_proveedor',function(){
                       $('div#listProveedores').removeClass('hidden');
                   });
                   /* Esconder lista de proveedores */
                   $('div#s_busqueda_proveedor').on('focusout','input#txt_search_proveedor',function(){
                       setTimeout(function(){
                           $('div#listProveedores').addClass('hidden');
                           $('div#sin_resultados').addClass('hidden');
                           /* Resetear lista de proveedores*/
                           var i = 0;
                             $("div#s_busqueda_proveedor div.item").each(function(){
                                 i = i + 1;
                                 if(i<=14){$(this).removeClass('hidden')}

                             });
                       },500);

                   });

                    /* Búsqueda de proveedores  */
                    $('div#s_busqueda_proveedor').on('keypress','input#txt_search_proveedor',function(e){

                                var texto = $(this).val()+e.key;
                                /* Evita la acción cuando es la tecla Enter */
                                if(e.keyCode==13){e.preventDefault();}

                                busqueda_List(texto,'listProveedores','div.nombre');

                    });

                    $('div#s_busqueda_proveedor').on('keydown','input#txt_search_proveedor',function(e){

                        /* Evita la acción cuando es la tecla Enter */
                //            if(e.keyCode==13){ e.preventDefault();}
                //
                //
                //            /* Retroceso: Se hace búsqueda con un caracter menos */
                //            if(e.keyCode==8){
                //                var texto = $(this).val();
                //                texto = texto.substring(0,texto.length - 1);/* Elimina última letra */
                //                buscar_Proveedores(texto);
                //            }
                    });

                    /* button btn_cerrar_add_Proveedor */
                    $('div#add_Proveedor').on('click','div#btn_cerrar_add_Proveedor',function(){

                            /* Cierra form add CLiente */
                            $('div#add_Proveedor').addClass('hidden');

                    });

                    $('div#s_busqueda_proveedor').on('click','div#btn_open_add_Proveedor',function(){

                            /* Hace visible el form para add Proveedor en ventas */
                             $('div#add_Proveedor').removeClass('hidden');

                    });

                     $('div#add_Proveedor').on('click','div#btn_add_Proveedor',function(){

                             console.log('Has almacenado un proveedor!');
                             /* Parámetros
                                Nombre --> 1
                                Documento ---> 1
                                Telefono  ---> 1
                                Direccion ---> 0
                                Ciudad ---> 1
                                Email ---> 0
                             */
                             var nombre = document.getElementById('txt_Nombre_add_Proveedor').value;
                             var documento = document.getElementById('txt_Documento_add_Proveedor').value;
                             var telefono = document.getElementById('txt_Telefono_add_Proveedor').value;
                             var ciudad = document.getElementById('txt_Ciudad_add_Proveedor').value;



                             $.post('ctrlproveedor',{Action:1,Nombre:nombre,Documento:documento,Telefono:telefono,Ciudad:ciudad,
                                                   Id_proveedor:0,Direccion:'N/A',Email:'N/A'},function(id_proveedor){

                                            console.log('ID proveedor: '+id_proveedor);

                                            /* Item para la lista de proveedores */
                                            var item = document.createElement('div');
                                                item.setAttribute('class','item');
                                                item.setAttribute('data-id',id_proveedor);
                                                item.setAttribute('data-telefono',telefono);
                                                item.setAttribute('data-direccion','N/A');
                                                item.setAttribute('data-ciudad',ciudad);
                                                item.setAttribute('data-email','N/A');

                                            var div_nombre = document.createElement('div');
                                                div_nombre.setAttribute('class','nombre');
                                                div_nombre.innerHTML = nombre;

                                            var div_documento = document.createElement('div');
                                                div_documento.setAttribute('class','documento');
                                                div_documento.innerHTML = documento;

                                                item.appendChild(div_nombre);
                                                item.appendChild(div_documento);

                                                /* Agregar al principio */

                                                 var primera_fila = document.getElementById('listProveedores').getElementsByTagName('div')[1];
                                                     document.getElementById('listProveedores').insertBefore(item,primera_fila);

                                                /* Hace invisible al contenedor */
                                                    $('div#add_Proveedor').addClass('hidden');
                                                    /* Hace visible a la lista de proveedores */
                                                    document.getElementById('txt_search_proveedor').focus();
                             });

                                /* Limpia */
                                       document.getElementById('txt_Nombre_add_Proveedor').value = '';
                                       document.getElementById('txt_Documento_add_Proveedor').value = '';
                                       document.getElementById('txt_Telefono_add_Proveedor').value = '';
                                       document.getElementById('txt_Ciudad_add_Proveedor').value = '';



                     });

});

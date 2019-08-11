
$(document).on('ready', function(){
                  
                  /* Carga clientes */
                        getClientes();
                  
                  
/*** START  *** NAVEGACION *** *** NAVEGACION *** START *** NAVEGACION *** *** NAVEGACION *** START ***/                  
                  
        $('div.tabMenu').on('click','div.tab',function(e){

                   /* Tab Select*/                 
                   $("div.tab").removeClass('isSelect');
                   $(this).addClass('isSelect');
                   /* Frame Select*/
                   $("div.frame").removeClass('isVisible');
                   
                   var Opcion = $(this).text();
                   
                   switch(Opcion){
                       case 'Buscar': 
                                $('div#frmBusqueda').addClass('isVisible');
                           break;
                        case 'Registrar': 
                                 $('div#frmRegistro').addClass('isVisible');
                           break;
                       case 'Descripcion': 
                                 $('div#frmDescripcion').addClass('isVisible');
                           break;
                   }
                   
        });
/*** END  *** NAVEGACION *** *** NAVEGACION *** END *** NAVEGACION *** *** NAVEGACION *** END ***/     
        
/*** START  *** frmREGISTRO *** *** frmREGISTRO *** START *** frmREGISTRO *** *** frmREGISTRO *** START ***/             
        $('div#btnAlmacenar').on('click',function(e){
             
                    var id_cliente = document.getElementById('txtBuscador_cliente').getAttribute('data-id_cliente');
                    var txtNombre = document.getElementById('txtNombre').value;
                    var txtDocumento = document.getElementById('txtDocumento').value;
                    var txtTelefono = document.getElementById('txtTelefono').value;
                    var txtDireccion = document.getElementById('txtDireccion').value;
                    var txtCiudad = document.getElementById('txtCiudad').value;
                    var txtEmail = document.getElementById('txtEmail').value;
                    
                    /* Validación */
                            var control = 0;
                            /* Validar ampos vacíos  */
                            $("div#frmRegistro input").each(function(e){
                                
                                    if($(this).val()==='' && $(this).attr('id')!=='txtBuscador_cliente'){
                                        control = 1;
                                        $(this).focus();
                                        return;
                                    }
                            });

                            if(control>0){
                                return;
                            }
                            
                            

                     $.post('ctrlcliente',{
                         Id_cliente: id_cliente,
                         Nombre: txtNombre,
                         Documento: txtDocumento,
                         Telefono: txtTelefono,
                         Direccion: txtDireccion,
                         Ciudad: txtCiudad,
                         Email: txtEmail,
                         Action: 1
                     }, function(r){
                         
                  /*  Crear mensaje con la respuesta... Con retardo ...   */
                  
                       /* Limpiar Cajas */
                            document.getElementById('txtNombre').value = "";
                            document.getElementById('txtDocumento').value = "";
                            document.getElementById('txtTelefono').value = "";
                            document.getElementById('txtDireccion').value = "";
                            document.getElementById('txtCiudad').value = "";
                            document.getElementById('txtEmail').value = "";
                            
                     });
              
              
          });
/*** END  *** frmREGISTRO *** *** frmREGISTRO *** END *** frmREGISTRO *** *** frmREGISTRO *** END ***/            
          
          
/*** START  *** frmBUSQUEDA *** *** frmBUSQUEDA *** START *** frmBUSQUEDA *** *** frmBUSQUEDA *** START ***/
           $('div#frmBusqueda').on('click','div.btnVenta',function(e){
               
               
              /* Acceso a Item contenedor */
               var id = $(this).parents('div.item').get(0).id;
               
               alert($('#'+id+' span.telefono').text());
               
               var nombre = $('#'+id+' div.nombre').text();
               var documento = id;
               var telefono = $('#'+id+' span.telefono').text();
               var ciudad = $('#'+id+' span.ciudad').text();
               var direccion ='';
               var email ='';
               
               /* Modifica a descripcion */
               document.getElementById('infNombre').textContent = nombre;
               document.getElementById('infDocumento').textContent = documento;
               document.getElementById('infTelefono').textContent = telefono;
               document.getElementById('infDireccion').textContent = direccion;
               document.getElementById('infCiudad').textContent = ciudad;
               document.getElementById('infEmail').textContent = email;
                
           });
           /* Key press */
             $('div#frmBusqueda').on('keypress','input#txtSearch',function(e){
                 
                 var texto = $(this).val()+e.key;
                 
                 if(e.keyCode==13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }
                 
                  buscaCliente(texto);
              
             });
             /* End key press */
               $('div#frmBusqueda').on('keydown','input#txtSearch',function(e){
                  
                 if(e.keyCode==13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }
                  
                   if(e.keyCode==8){/* Retroceso */
                       
                       var texto = $(this).val();
                       texto = texto.substring(0,texto.length - 1);/* Elimina última letra */
                       
                        buscaCliente(texto);
                       
                   }
               });
           
           function buscaCliente(texto){
               
                        $("div#frmBusqueda div.item").each(function(){
                           /* Saca el id de cada item */
                            var id = $(this).attr('id');
                            var nombre = $('div#'+id+' div.nombre').text();/* Extrae el nombre del cliente*/

                            if (nombre.indexOf(texto)!=-1) {
                                    $(this).removeClass('clienteHidden');
                             }else{
                                    $(this).addClass('clienteHidden');
                             }
                        });
           }
           
           
           /* Hace visible la lista de clientes */
            $('div.searcher').on('focusin','input#txtBuscador_cliente',function(e){
                $('div#listClientes').removeClass('hidden');
            });
           /* Hace visible la lista de clientes */
            $('div.searcher').on('focusout','input#txtBuscador_cliente',function(e){
                setTimeout(function(){
                    $('div#listClientes').addClass('hidden');
                },500);
            });
           
           /* Busca clientes en la lista */
           $('div.searcher').on('keypress','input#txtBuscador_cliente',function(e){
               
                        var filtro = $(this).val()+e.key;

                        if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                            e.preventDefault();
                        }
                           /*Busca filtro en cada fila de la lista */
                         buscar_texto_list('div#listClientes div.item',filtro,20);
           });
           
           
           /* Transición entre búsqueda - descripción */
           $('div#frmBusqueda').on('click','div.nombre',function(){
               
                            var nombre =$(this).html();
                            var id = $(this).parent('.id').parent('.item').attr('id');
                            var documento = id; 
                            var telefono = $('div#'+id + ' span.telefono').text();
                            var direccion = $('div#'+id + ' span.direccion').text();
                            var ciudad = $('div#'+id + ' span.ciudad').text();
                            var email = $('div#'+id + ' span.email').text();

                            /* Configurar campos */
                            document.getElementById('infoNombre').innerHTML = nombre;
                            document.getElementById('infoDocumento').innerHTML = documento;
                            document.getElementById('infoTelefono').innerHTML = telefono;
                            document.getElementById('infoDireccion').innerHTML =  direccion;
                            document.getElementById('infoCiudad').innerHTML = ciudad;
                            document.getElementById('infoEmail').innerHTML = email;

                            /* Configuracion de tabs */
                            $("div.tab").removeClass('isSelect');
                            $('div#tabDescripcion').addClass('isSelect');
                            $('div#frmBusqueda').removeClass('isVisible');
                            $('div#frmDescripcion').addClass('isVisible');
               
               
           });
           
           /* Selecciona cliente de la lista */
           $('div#listClientes').on('click','div.item',function(){
                    
                   /* Getter */ 
                    var id_cliente = $(this).attr('data-id');                    
                    var nombre = $(this).text();
                    var documento = $(this).attr('data-documento');
                    var telefono = $(this).attr('data-telefono');
                    var direccion = $(this).attr('data-direccion');
                    var ciudad = $(this).attr('data-ciudad');
                    var email = $(this).attr('data-email');
                    
                   /* Setter */
                        document.getElementById('txtBuscador_cliente').setAttribute('data-id_cliente',id_cliente);
                        document.getElementById('txtBuscador_cliente').value = nombre;
                        document.getElementById('txtNombre').value = nombre;
                        document.getElementById('txtDocumento').value = documento;
                        document.getElementById('txtTelefono').value = telefono;
                        document.getElementById('txtDireccion').value = direccion;
                        document.getElementById('txtCiudad').value = ciudad;
                        document.getElementById('txtEmail').value = email;
           });
           
           
/*** END  *** frmBUSQUEDA *** *** frmBUSQUEDA *** END *** frmBUSQUEDA *** *** frmBUSQUEDA *** END ***/
                  
});/* End document */


/* Carga clientes */
function getClientes(){
    
                  $.post('ctrlcliente',{Action: 2 }, function(json){
                                      
                                        console.log(json);
                                        
                                    var jSon =   jQuery.parseJSON($.trim(json));
                                        json_clientes = jSon;

                                    /* Limpiar lista */
                                    $('div#listClientes div.item').remove();

                                    for (i in jSon){

                                           var item = document.createElement('div');
                                           item.setAttribute('class','item');
                                           item.setAttribute('data-id',jSon[i].Id);
                                           item.setAttribute('data-documento',jSon[i].Documento);
                                           item.setAttribute('data-telefono',jSon[i].Telefono);
                                           item.setAttribute('data-direccion',jSon[i].Direccion);
                                           item.setAttribute('data-ciudad',jSon[i].Ciudad);
                                           item.setAttribute('data-email',jSon[i].Email);
                                           var nombre = document.createElement('div');
                                           nombre.setAttribute('class','nombre');
                                           nombre.innerHTML = jSon[i].Nombre;
                                           item.appendChild(nombre);

                                           if(i>=20){
                                               item.setAttribute('class','item hidden');
                                           }else{/* Cantidad de items visibles */
                                               document.getElementById('listClientes').setAttribute('data-items',i);
                                           }
                                           document.getElementById('listClientes').appendChild(item);
                                     }
                        });
}


   function buscar_texto_list(list,filtro,limit){
                    
                      /* Manejar cómo minusculas */
                        filtro = filtro.toLowerCase();
                        var i = 0;
                        /* Recorre cada fila de la lista */
                        $(list).each(function(){
                                /* Saca el id de cada item */
                                 var texto = $(this).text().toLowerCase();/* Contiene el texto de la fila */
                                 
                                 if (texto.indexOf(filtro)!==-1) {/* Filtro está contenido en el texto */
                                         /* Controla el limite de items visibles */
                                        if(i<limit){
                                            $(this).removeClass('hidden'); 
                                         }else{
                                              $(this).addClass('hidden');
                                         }
                                         i = i + 1;
                                         
                                 }else{
                                         $(this).addClass('hidden');
                                 }
                        });
    }
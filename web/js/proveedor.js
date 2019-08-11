$(document).on('ready', function(){
    
    
     /* Loading proveedores */
        carga_Proveedores();
    
    /* Búsqueda de proveedores */
    function carga_Proveedores(){
      
      $('div#cbProveedor div.iProveedor').remove();
        $.post('ctrlproveedor',{Action:2},function(response){
            
            var jSon = jQuery.parseJSON($.trim(response));
            
            console.log('proveedores: ',jSon);
            
            for(i in jSon){
                /* Crear objeto */
                var iProveedor = document.createElement('div');
                    iProveedor.setAttribute('class','iProveedor');
                    iProveedor.setAttribute('data-id',jSon[i].Id);
                    iProveedor.setAttribute('data-nit',jSon[i].Nit);
                    iProveedor.setAttribute('data-contacto',jSon[i].Contacto);
                    iProveedor.setAttribute('data-ciudad',jSon[i].Ciudad);
                    iProveedor.setAttribute('data-direccion',jSon[i].Direccion);
                    iProveedor.setAttribute('data-telefono_1',jSon[i].Telefono_1);
                    iProveedor.setAttribute('data-telefono_2',jSon[i].Telefono_2);
                    iProveedor.setAttribute('data-email',jSon[i].Email);
                    iProveedor.setAttribute('data-banco',jSon[i].Banco);
                    iProveedor.setAttribute('data-tipo_cuenta',jSon[i].Tipo_cuenta);
                    iProveedor.setAttribute('data-numero_cuenta',jSon[i].Numero_cuenta);
                    iProveedor.setAttribute('data-titular_cuenta',jSon[i].Titular_cuenta);
                    iProveedor.innerHTML=jSon[i].Razon_Social;
                    
                    document.getElementById('cbProveedor').appendChild(iProveedor);
            }
            
            
        });
    }
    
     /* Focus In: Aparece */
    $('div.searchProveedor').on('focusin','input#txtSearchProveedor',function(){
        $('div#cbProveedor').removeClass('hidden');
    });
    /* Focus Out: Desaparece */
     $('div.searchProveedor').on('focusout','input#txtSearchProveedor',function(){
        setTimeout(function(){$('div#cbProveedor').addClass('hidden');},200);
    });
    
    
     $('div#cbProveedor').on('click','div.iProveedor',function(){
        
         var proveedor = $(this).text();
         var id_proveedor = $(this).attr('data-id');
         var nit = $(this).attr('data-nit');
         var contacto = $(this).attr('data-contacto');
         var ciudad = $(this).attr('data-ciudad');
         var direccion = $(this).attr('data-direccion');
         var telefono_1 = $(this).attr('data-telefono_1');
         var telefono_2 = $(this).attr('data-telefono_2');
         var email = $(this).attr('data-email');
         var banco = $(this).attr('data-banco');
         var tipo_cuenta = $(this).attr('data-tipo_cuenta');
         var numero_cuenta = $(this).attr('data-numero_cuenta');
         var titular_cuenta = $(this).attr('data-titular_cuenta');
         
         document.getElementById('txtSearchProveedor').value = proveedor;
         
         /* Cargar datos de proveedor para actualizar */
         
         document.getElementById('txtRazon_social').value = proveedor;
         document.getElementById('txtNit').value = nit;
         document.getElementById('txtContacto').value = contacto;
         document.getElementById('txtCiudad').value = ciudad;
         document.getElementById('txtDireccion').value = direccion;
         document.getElementById('txtTelefono_1').value = telefono_1;
         document.getElementById('txtTelefono_2').value = telefono_2;
         document.getElementById('txtEmail').value = email;
         document.getElementById('txtBanco').value = banco;
         document.getElementById('txtTipo_cuenta').value = tipo_cuenta;
         document.getElementById('txtNumero_cuenta').value = numero_cuenta;
         document.getElementById('txtTitular_cuenta').value = titular_cuenta;
         
         
        
     });
    
    
    /*  TABS NAVEGACION  */
        $('div.tabMenu').on('click','div.tab',function(){


                   /* Tab Select*/                 
                   $("div.tab").removeClass('isSelect');/* Quita la selección en las tabs*/
                   $(this).addClass('isSelect');/* Selecciona esta tab */
                   /* Frame Select*/
                   $("div.frame").removeClass('isVisible');
                   
                   
                   var Opcion = $(this).text();
            
            /* DETERMINAR CUAL DE LOS FORMULARIOS SE HARÁ VISIBLE SEGUN LA TAB SELECCIONADA */
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
            
            var id = $(this).attr('id');


        });
     /* END ***  TABS NAVEGACION  *** END */
     
     /* ALMACENAR PROVEEDOR */
     
            $('div#btnAlmacenar').on('click',function(e){
                
                /* Parámetros de proveedor */
                    var txtRazon_social = document.getElementById('txtRazon_social').value;
                    var txtNit = document.getElementById('txtNit').value;
                    var txtContacto = document.getElementById('txtContacto').value;
                    var txtCiudad = document.getElementById('txtCiudad').value;
                    var txtDireccion = document.getElementById('txtDireccion').value;
                    var txtTelefono_1 = document.getElementById('txtTelefono_1').value;
                    var txtTelefono_2 = document.getElementById('txtTelefono_2').value;
                    var txtEmail = document.getElementById('txtEmail').value;
                    var txtBanco = document.getElementById('txtBanco').value;
                    var txtTipo_cuenta = document.getElementById('txtTipo_cuenta').value;
                    var txtNumero_cuenta = document.getElementById('txtNumero_cuenta').value;
                    var txtTitular_cuenta = document.getElementById('txtTitular_cuenta').value;
                    
                    
                    /* Validar ampos vacíos  */
                    $("div#frmRegistro input").each(function(e){
                            if($(this).val()=='' && $(this).attr('id')!='txtSearchProveedor'){
                                $(this).focus();
                                e.preventDefault();
                            }
                    });
                    
                    
                  
                    /* Ajax para enviar a controlador */
                    $.post('ctrlproveedor',{
                         Razon_social: txtRazon_social,
                         Nit: txtNit,
                         Contacto: txtContacto,
                         Ciudad: txtCiudad,
                         Direccion: txtDireccion,
                         Telefono_1: txtTelefono_1,
                         Telefono_2: txtTelefono_2,
                         Email: txtEmail,
                         Banco: txtBanco,
                         Tipo_cuenta: txtTipo_cuenta,
                         Numero_cuenta: txtNumero_cuenta,
                         Titular_cuenta: txtTitular_cuenta,
                         Action: 1
                     }, function(response){
                     /*    alert(response); */
                         
                         /* Limpiar campos */
                            $("div#frmRegistro input").each(function(e){
                                    $(this).val('');
                            });
                         
                     });
                     carga_Proveedores();
                                     
            });
     
     /* END *** ALMACENAR PROVEEDOR  *** END */


    /*   BUSQUEDA CON CAJA DE TEXTO   */
        
        /* Key press */
              $('div#frmBusqueda').on('keypress','input#txtSearch',function(e){
                 
                 var texto = $(this).val()+e.key;
                 
                 if(e.keyCode==13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }
                 
                  buscaProveedor(texto);
              
             });
             
         /* Key down */
         $('div#frmBusqueda').on('keydown','input#txtSearch',function(e){
                  
                 if(e.keyCode==13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }
                  
                if(e.keyCode==8){/* Retroceso */
                    var texto = $(this).val();
                    texto = texto.substring(0,texto.length - 1);/* Elimina última letra */
                    buscaProveedor(texto);
                }
               });
               
               /* Búsqueda proveedor */
               $('div.searchProveedor').on('keypress','input#txtSearchProveedor',function(e){
                   
                            var filtro = $(this).val()+e.key;

                            if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                                e.preventDefault();
                            }
                               /*Busca filtro en cada fila de la lista */
                             buscar_texto_list('div#cbProveedor div.iProveedor',filtro,20);
               });
               
         /* Busca proveedor */
         function buscaProveedor(texto){
               
                        $("div#frmBusqueda div.item").each(function(){
                           /* Saca el id de cada item */
                            var id = $(this).attr('id');
                            var razon_social = $('div#'+id+' div.razon_social').text();/* Extrae la razon social*/

                            if (razon_social.indexOf(texto)!=-1) {
                                    $(this).removeClass('proveedorHidden');
                             }else{
                                    $(this).addClass('proveedorHidden');
                             }
                        });
           }
        
    /* END ***  BUSQUEDA CON CAJA DE TEXTO *** END  */
   
    /* FORMULARIO DESCRIPCIÓN */
    
    $('div#frmBusqueda').on('click','div.razon_social',function(){
           
               var razon_social =$(this).html();
               var id = $(this).parent('.id').parent('.item').attr('id');
               var nit = id;
               var contacto = $('div#'+id + ' span.direccion').text();
               var ciudad = $('div#'+id + ' span.ciudad').text();
               var direccion = $('div#'+id + ' span.direccion').text();
               var telefono_1 = $('div#'+id + ' span.telefono_1').text();
               var telefono_2 = $('div#'+id + ' span.telefono_2').text();
               var email = $('div#'+id + ' span.email').text();
               var banco = $('div#'+id + ' span.banco').text();
               var tipo_cuenta = $('div#'+id + ' span.tipo_cuenta').text();
               var numero_cuenta = $('div#'+id + ' span.numero_cuenta').text();
               var titular_cuenta = $('div#'+id + ' span.titular_cuenta').text();
               
               /* Configurar campos */
               document.getElementById('infoRazon_social').innerHTML = razon_social;
               document.getElementById('infoNit').innerHTML = nit;
               document.getElementById('infoContacto').innerHTML = contacto;
               document.getElementById('infoDireccion').innerHTML =  direccion;
               document.getElementById('infoCiudad').innerHTML = ciudad;
               document.getElementById('infoTelefono_1').innerHTML = telefono_1;
               document.getElementById('infoTelefono_2').innerHTML = telefono_2;
               document.getElementById('infoEmail').innerHTML = email;
               document.getElementById('infoBanco').innerHTML = banco;
               document.getElementById('infoTipo_cuenta').innerHTML = tipo_cuenta;
               document.getElementById('infoNumero_cuenta').innerHTML = numero_cuenta;
               document.getElementById('infoTitular_cuenta').innerHTML = titular_cuenta;
               
               
               
               /* Configuracion de tabs */
               $("div.tab").removeClass('isSelect');
               $('div#tabDescripcion').addClass('isSelect');
               $('div#frmBusqueda').removeClass('isVisible');
               $('div#frmDescripcion').addClass('isVisible');
               
               
           });
    
    /* END *** FORMULARIO DESCRIPCIÓN *** END */



});


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
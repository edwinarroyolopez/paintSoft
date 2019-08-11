
/* Funciones externas --> Vienen de producto _ grupo */
  function create_dataGrid_products_by_marca_and_grupo(marca,grupo,id_grupo,id_marca){
               
                    /* Se asignan ids y valores de la marca seleccionada */
                  document.getElementById('txtSMarca').value = marca;
                  document.getElementById('txtSMarca').setAttribute('data-id',id_marca);
                  
                  /* Busca el último codigo creado */
                  Ultimo_codigo(id_grupo,id_marca);
                  $('input#txtCodigo').focus();
               
                     /* Datagrid ---> */
                                            /* Grupo */
                    document.getElementById('info_grupo_selected').innerHTML = grupo;
                    document.getElementById('info_grupo_selected').setAttribute('data-id',id_grupo);
                                            /* Marca */
                    document.getElementById('info_marca_selected').innerHTML = marca;
                    document.getElementById('info_marca_selected').setAttribute('data-id',id_marca);
                    
                    
                    $('div#dataProducto div.fila').remove();
                    
                    /* Buscar todos los productos: Id grupo --- Id marca */
                    $.post('ctrlproducto',{Action:5,Id_grupo:id_grupo,Id_marca:id_marca,Marca:marca,Grupo:grupo},function(r){
                       
                       console.log('productos: ', r);
                       
                                var jSon = jQuery.parseJSON($.trim(r));

                                for(i in jSon){

                                    var id_fila = 'p'+jSon[i].Id+'g'+jSon[i].Id_grupo+'m'+jSon[i].Id_marca;

                                     var fila = document.createElement('div');
                                         fila.setAttribute('id',id_fila);
                                         fila.setAttribute('class','fila');
                                         fila.setAttribute('data-id',jSon[i].Id);
                                         fila.setAttribute('data-id_grupo',jSon[i].Id_grupo);
                                         fila.setAttribute('data-id_marca',jSon[i].Id_marca);
                                         fila.setAttribute('data-marca',jSon[i].Marca);
                                         fila.setAttribute('data-grupo',jSon[i].Grupo);
                                         /* Codigo */
                                     var codigo = document.createElement('div');
                                         codigo.setAttribute('class','codigo');
                                         codigo.innerHTML = jSon[i].Codigo;
                                         /* Descripción */
                                     var descripcion = document.createElement('div');
                                         descripcion.setAttribute('class','descripcion');
                                         descripcion.innerHTML = jSon[i].Descripcion;    

                                         fila.appendChild(codigo);
                                         fila.appendChild(descripcion);
                                         document.getElementById('dataProducto').appendChild(fila);

                                }
                        
                    });
                
            }
            
            function Ultimo_codigo(pmtId_grupo,pmtId_marca){
                
                    $.post('ctrlproducto',{Action:4,Id_grupo:pmtId_grupo,Id_marca:pmtId_marca},function(r){
                            if(r=='0'){
                                r='';
                            }
                            document.getElementById('Ultimo_codigo').innerHTML = r;
                        });
            }





$(document).on('ready',function(){

   
   
cargaMarcas();


/* Buscar marcas: dataMarca */
            function cargaMarcas(){
                 $.post('ctrlmarca',{Action: 4}, function(r){
                               
                                var jSon =   jQuery.parseJSON($.trim(r));
                                
                                for(i in jSon){
                                    
                                    var row = document.createElement('div');
                                        row.setAttribute('class','row');
                                    var codigo = document.createElement('div');
                                        codigo.setAttribute('class','codigo');
                                        codigo.innerHTML = jSon[i].Id;
                                    var marca = document.createElement('div');
                                        marca.setAttribute('class','marca');
                                        marca.innerHTML = jSon[i].Marca;
                                        
                                        row.appendChild(codigo);
                                        row.appendChild(marca);
                                        document.getElementById('dataMarca').appendChild(row);
                                
                                        
                                }
                               
                            });
            }
            
            
            /* Cb Grupo marcas */
            
     /* Combobox grupo para la marca */
     $('div#frmConfiguracion').on('focusin','input#txtGrupoMarca',function(){
         $('div#cbGrupoMarca').removeClass('hidden');
         
            /* Reset --->*/
                    listPosicion = [];
                    pos_anterior = pos_actual = 0;
                    cantidad_items = 0;
                var i = 0; 
                
                
                /* Recorrerá todos los items, pero solo me interesan los visibles */
                $('div#cbGrupoMarca div.item').each(function(){

                        var Class = $(this).attr('class');
                       

                            if(Class.indexOf('hidden')===-1){/* Verifica si el  item contiene la clase hidden */
                               /* No la contiene: Puedo sumar item a la cantidad de elementos */
                                cantidad_items = cantidad_items + 1;
                                listPosicion.push(i);
                              }
                              i = i + 1;/* Variable usada para definir las posiciones visibles de la lista */ 
                });
                  
                  console.log('List ' + listPosicion.toString());
        
         
         
         
     });
    $('div#frmConfiguracion').on('focusout','input#txtGrupoMarca',function(){
         setTimeout(function(){$('div#cbGrupoMarca').addClass('hidden');},100);
     });
     
     
     
     
    /* KEY PRESS */
    $('div#frmConfiguracion').on('keypress','input#txtGrupoMarca',function(e){
    });
    /* KEY DOWN */
    $('div#frmConfiguracion').on('keydown','input#txtGrupoMarca',function(e){
        /* Uso de teclas de dirección */
        updown_List(e,'cbGrupoMarca','div','txtGrupoMarca');
        
        if(e.keyCode===13){
            
            var item = document.getElementById('txtGrupoMarca').value;
            var id_grupo = document.getElementById('txtGrupoMarca').getAttribute('data-id');
            var id_marca = document.getElementById('selectedMarca').getAttribute('data-id');
            relationated_with_marca(item,id_grupo,id_marca);
            
             document.getElementById('txtGrupoMarca').value = '';
             document.getElementById('txtGrupoMarca').focus();
        }
        
     });
    
     
     $('div#frmConfiguracion').on('click','div#cbGrupoMarca div.item',function(){
         
         $(this).addClass('hidden');
         
         /* Debe agregarse a datagrid grupo marca: "Eliminarse" de combobox */
                            var item = $(this).html();
                            var id_grupo = $(this).attr('data-id');
                            var id_marca = document.getElementById('selectedMarca').getAttribute('data-id');
                            
                             relationated_with_marca(item,id_grupo,id_marca);
            
         
     });
            
            
            function relationated_with_marca(pmtItem,pmtId_grupo,pmtId_marca){
                
                            /* Hacer que se cree el item */
                            var row = document.createElement('div');
                                row.setAttribute('class','row');
                                row.setAttribute('data-id_grupo',pmtId_grupo);
                                row.setAttribute('data-id_marca',pmtId_marca);
                            var grupo = document.createElement('div');
                                grupo.setAttribute('class','grupo');
                                grupo.innerHTML = pmtItem;
                                row.appendChild(grupo);
//                            var primera_fila = document.getElementById('dataGrupoMarca').getElementsByTagName('div')[0];
//                                document.getElementById('dataGrupoMarca').insertBefore(row,primera_fila);
                                document.getElementById('dataGrupoMarca').appendChild(row);
                                       
                        /* Guardarla dentro de la tabla Grupo - Marca */
                        $.post('ctrlmarca',{ Id_grupo: pmtId_grupo, Id_marca: pmtId_marca, Action: 2}, function(r){});
                
                
                
                
            }
            
            /* Almacenar marca */
    $('div#frmConfiguracion').on('keypress','input#txtMarca',function(e){
        /* Almacenar marca */
       
                 if(e.keyCode==13){/* Evita la acción cuando es la tecla Enter */
                                         
                     /* Validaciones */
                        var txtMarca = document.getElementById('txtMarca').value;
                                 
                                $.post('ctrlmarca',{Marca: txtMarca, Action: 1}, function(r){
                                          
                                    var jSon = $.parseJSON($.trim(r));
                                    
                                           /* dataMarcas */
                                         var row = document.createElement('div');
                                             row.setAttribute('class','row');
                                         var codigo = document.createElement('div');
                                             codigo.setAttribute('class','codigo');
                                             codigo.innerHTML = jSon[0].Id;
                                         var marca = document.createElement('div');
                                             marca.setAttribute('class','marca');
                                             marca.innerHTML = jSon[0].Marca;
                                             row.appendChild(codigo);
                                             row.appendChild(marca);
                                         var primera_fila = document.getElementById('dataMarca').getElementsByTagName('div')[5];
                                         document.getElementById('dataMarca').insertBefore(row,primera_fila);
                                                 
                                        /* Cargar otras listas */         
                                        /* Combobox marcas */
                                 /*          var item = document.createElement('div');
                                           item.setAttribute('class','item');
                                           item.setAttribute('data-id',jSon[0].Id);
                                           item.innerHTML = jSon[0].Marca;
                                           var primera_fila = document.getElementById('cbMarca').getElementsByTagName('div')[0];
                                           document.getElementById('cbMarca').insertBefore(item,primera_fila);    */
                                                 
                                           /* Limpiar caja de texto */
                                           document.getElementById('txtMarca').value = '';
                                       });
                                 $("div#dataMarca div.row").removeClass('hidden');
                }
        
    });
            
            $('div#frmConfiguracion').on('keydown','input#txtMarca',function(e){
       
                /* Búsqueda de marcas de producto */
                 var texto = $(this).val()+e.key;/* Asigno el texto que hay dentro de la caja */

                  if(e.keyCode==8){
                        texto = texto.substring(0,texto.length - 1);/* Elimina última letra */
                    }

                    if(e.keyCode!==37  && e.keyCode!==38 && e.keyCode!==39 && e.keyCode!==40){
                        buscar_Marcas_configuracion(texto);
                    }
       
       
        });
            
            /* Buscar marcas */
       function buscar_Marcas_configuracion(valor){
        
        valor = valor.toLowerCase();
        
        /* Hago visible e invisibles a los items */
//         $("div#cbGrupoProducto div.item").remnoveClass('hidden');
//         $("div#cbGrupoProducto div.item").addClass('hidden'); 
//         
          var i = 0;
           $("div#dataMarca div.row").each(function(){
               
               
                            var valor_item = $(this).html()
                            
                            valor_item = valor_item.toLowerCase();
                            
                            if (valor_item.indexOf(valor)!==-1) {/* Existen resultados*/
                                      $(this).removeClass('hidden');
                                    //$('div#sin_resultados').addClass('hidden');
                                    
                                    /* Solo puedo hacer visible a 14 Items */
                             /*       i = i + 1;
                                    if(i<=25){
                                        $(this).removeClass('hidden');
                                    }else{
                                        $(this).addClass('hidden');
                                    } */
                                    
                             }else{
                                 
                                   if(document.getElementById('txtMarca').value===''){/* Todas visibles */
                                        $(this).removeClass('hidden');
                                    }else{
                                        $(this).addClass('hidden');
                                    }
                                 
                                    
                                    /* Control: No exiten resultados*/
                                    if(i==0){
                                      //  $('div#sin_resultados').removeClass('hidden');
                                    }
                                    
                             }
            });        
    }/* Fin método búsqueda productos */
            
            
    
    
    
});

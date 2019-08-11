$(document).on('ready', function(){
    carga_Unidad_medida();
  
    
    /*  TABS NAVEGACION  */
        $('div.tabMenu').on('click','div.tab',function(){


                   /* Tab Select*/                 
                   $("div.tab").removeClass('isSelect');/* Quita la selección en las tabs*/
                   $(this).addClass('isSelect');/* Selecciona esta tab */
                   /* Frame Select*/
                   $("div.frame").removeClass('isVisible');
                   
                   
                   var Opcion = $(this).attr('id');
                   
            
            /* DETERMINAR CUAL DE LOS FORMULARIOS SE HARÁ VISIBLE SEGUN LA TAB SELECCIONADA */
                   switch(Opcion){
                       case 'tabBuscar': 
                                $('div#frmBusqueda').addClass('isVisible');
                           break;
                        case 'tabRegistro': 
                                 $('div#frmRegistro').addClass('isVisible');
                           break;
                       case 'tabProducto': 
                                 $('div#frmProducto').addClass('isVisible');
                           break;
                       case 'tabConfiguracion': 
                                 $('div#frmConfiguracion').addClass('isVisible');
                           break;
                   }
            
          //  var id = $(this).attr('id');


        });
     /* END ***  TABS NAVEGACION  *** END */
    
    
    
    
    /* CONFIGURACION: NAVEGACION EN SUB MENUS */
        $('div#frmConfiguracion').on('click','div.subItem',function(){
            
                    /* Hace invisible las areas de trabajo*/
                   $("div.Work").removeClass('isInLineBlok');
               
               
               $('div.subItem').removeClass('submenu_selected');
               $(this).addClass('submenu_selected');
            
            var Opcion = $(this).attr('id');

            /* Hace visible el area de trabajo seleccionada */
              switch(Opcion){
                         case 'subproductoGrupo': 
                                  $('div#wproductoGrupo').addClass('isInLineBlok');
                             break;
                          case 'subMarca': 
                                  $('div#wMarca').addClass('isInLineBlok');
                             break;
                          case 'subMedida': 
                                  $('div#wMedida').addClass('isInLineBlok');
                             break;
                         case 'subtipoPintura': 
                                   $('div#wtipoPintura').addClass('isInLineBlok');
                             break;
                         case 'subFraccionamiento': 
                                   $('div#wFraccionamiento').addClass('isInLineBlok');
                             break;     
                         
                     }
            
        });
        
    
    /* END *** CONFIGURACION: NAVEGACION EN SUB MENUS *** END */
    
    
     /* CONFIGURACION: BOTÓN ADD  */
     $('div#frmConfiguracion').on('click','div.btnAlmacenar',function(){
         
          var Opcion = $(this).attr('id');

            /* Hace visible el area de trabajo seleccionada */
                switch(Opcion){
                         case 'addproductoGrupo': 
                             
                             /* Almacena grupo de productos */ 
                                  
                                     var Grupo = document.getElementById('txtproductoGrupo').value;
                                     var Medida = document.getElementById('txtId_medida').value;
                                     var Id_medida = document.getElementById('txtId_medida').getAttribute('data-id');
                                     
                                    /* Validar ampos vacíos  */

                                       $.post('ctrlproductogrupo',{productoGrupo: Grupo,Id_medida: Id_medida,Medida:Medida,Action: 1},
                                            function(r){
                                           
                                           /* Retorna: Json */
                                           
                                           var jSon = $.parseJSON($.trim(r));
                                           
                                         /* Data grupos */  
                                            var row = document.createElement('div');
                                                row.setAttribute('class','row');
                                            var codigo = document.createElement('div');
                                                codigo.setAttribute('class','codigo');
                                                codigo.innerHTML = jSon[0].Id;
                                            var grupo = document.createElement('div');
                                                grupo.setAttribute('class','grupo');
                                                grupo.setAttribute('data-id',jSon[0].Id);
                                                grupo.innerHTML = Grupo;
                                            var medida = document.createElement('div');
                                                medida.setAttribute('class','medida');
                                                medida.setAttribute('data-id',jSon[0].Id_medida);
                                                medida.innerHTML = Medida;

                                                row.appendChild(codigo);
                                                row.appendChild(grupo);
                                                row.appendChild(medida);
                                                
                                                var primera_fila = document.getElementById('dataGrupo').getElementsByTagName('div')[4];
                                                document.getElementById('dataGrupo').insertBefore(row,primera_fila);

                                              
                                            /* Actualizar combobox's que contengan grupos 
                                               cbGrupoProducto ---> Lista de creación de productos */
                                            var item = document.createElement('div');
                                                item.setAttribute('class','item');
                                                item.setAttribute('data-id',jSon[0].Id);
                                                item.innerHTML = Grupo;
                                                document.getElementById('cbGrupoProducto').appendChild(item);
                                                var primera_fila = document.getElementById('cbGrupoProducto').getElementsByTagName('div')[0];
                                                document.getElementById('cbGrupoProducto').insertBefore(item,primera_fila);
                                                
                                            /* cbGrupoMarca ---> Asociación grupo con marcas  */    
                                            var item_ = document.createElement('div');
                                                item_.setAttribute('class','item');
                                                item_.setAttribute('id','G'+jSon[0].Id);
                                                item_.setAttribute('data-id',jSon[0].Id);
                                                item_.innerHTML = Grupo;
                                                var primera_fila = document.getElementById('cbGrupoMarca').getElementsByTagName('div')[0];
                                                document.getElementById('cbGrupoMarca').insertBefore(item_,primera_fila);
                                                
                                                
                                                
                                           /* Limpiar caja de texto */
                                           document.getElementById('txtproductoGrupo').value= '';
                                           document.getElementById('txtId_medida').value= '';
                                           
                                           
                                       });
                                       
                             
                                
                             break;
                          case 'addMarca': 
                              /*  Almacena marcas  */
                                 
                                 var IdproductoGrupo =  document.getElementById('txtSPGMarca').getAttribute('data-id');
                                 var txtMarca = document.getElementById('txtMarca').value;
                                 
                                $.post('ctrlmarca',{
                                           IdproductoGrupo: IdproductoGrupo,
                                           Marca: txtMarca,
                                           Action: 1
                                       }, function(response){
                                           /* Limpiar caja de texto */
                                           document.getElementById('txtMarca').value = '';
                                           document.getElementById('txtSPGMarca').value = '';
                                           document.getElementById('txtSPGMarca').setAttribute('data-id','');
                                       });
                                
                                 
                              /* END *** Almacena marcas  *** END */   
                             break;
                             case 'addMedida': 
                              /*  Almacena medidas  */
                                 
                              
                                 
                              /* END *** Almacena Medidas  *** END */   
                             break;
                         case 'addtipoPintura': 
                            /*  Almacena los tipos de pintura  */      
                                  
                                  var txttipoPintura = document.getElementById('txttipoPintura').value;

                                    /* Validar ampos vacíos  */

                                       $.post('ctrltipopintura',{
                                           tipoPintura: txttipoPintura,
                                           Action: 1
                                       }, function(response){
                                           
                                           /* Hacer que se cree el item */
                                           var Item = document.createElement('div');
                                               Item.setAttribute('class','lItem');
                                           var Code = document.createElement('div');
                                               Code.setAttribute('class','code');
                                               Code.innerHTML='nuevo code';
                                           var Value = document.createElement('div')
                                               Value.setAttribute('class','value');
                                               Value.innerHTML = txttipoPintura;
                                               Item.appendChild(Code);
                                               Item.appendChild(Value);
                                               document.getElementById('rtp').appendChild(Item);
                                           
                                           
                                           /* Limpiar caja de texto */
                                           document.getElementById('txttipoPintura').value= '';
                                       });
                                       
                                  
                                  
                             /* END *** Almacena los tipos de pintura *** END */        
                             break;
                         
                     }
         
         
     });
    
     /* END *** CONFIGURACION: BOTÓN ADD  *** END */
     
     
     /* SEARCH Grupo de productos para crear marca  */
     
     
     /* FOCUS: Combobox se hace visible */
       $('div#frmConfiguracion').on('focusin','input.txtSPGrupo',function(){
           
           
              var Opcion = $(this).attr('id');

            /* Hace visible el area de trabajo seleccionada */
              switch(Opcion){
                         case 'txtSPGMarca': 
                                $('div#cbPGMarca').css('display','block');
                                
                                /* Llenar lista */
                                $("div.iproductoGrupo").each(function(e){
                                        $('div#cbPGMarca').append($(this));
                                });
                                
                             break;
                          case 'txtSPGMedida': 
                                $('div#cbPGMedida').css('display','block');
                                
                                 /* Llenar lista */
                                $("div.iproductoGrupo").each(function(e){
                                       $('div#cbPGMedida').append($(this));
                                });
                             break;
                     }
           
           
           
       });
       /* OUT FOCUS: Combobox se hace invisible */
        $('div#frmConfiguracion').on('focusout','input.txtSPGrupo',function(){
            
            setTimeout(function(){$('div#cbPGMarca').css('display','none');},500);
            setTimeout(function(){$('div#cbPGMedida').css('display','none');},500);
            
       });
       
       
                 /* FOCUS: Combobox se hace visible */
                        $('div#frmProducto').on('focusin','input#txtSearchMedida',function(){
                            $('div#cbMedida').css('display','block');
                        });
           
                      
                      /* Button Delete List */
                            $('div#frmProducto').on('click','div.btnDelete',function(){
                                
                                var id = $(this).attr('data-id');
                                $('div#'+id).css('display','block');
                                $(this).parent().remove();
                                
                            });
                        
                      /* END *** Button Delete List  *** END */    
                      
                      /* btn Almacenar */
                            $('div#frmProducto').on('click','div.btnAlmacenar',function(){
                                                          
                                /* Hacer invisible button delete */
                                 $('div#btnDelete_producto').addClass('hidden');
                                 
                                                          
                                var id_grupo = document.getElementById('txtSGrupoProducto').getAttribute('data-id');
                                var id_marca = document.getElementById('txtSMarca').getAttribute('data-id');
                                var grupo = document.getElementById('txtSGrupoProducto').value;
                                var marca = document.getElementById('txtSMarca').value;
                                var codigo = document.getElementById('txtCodigo').value;
                                var descripcion = document.getElementById('txtDescripcion').value;
                                
                                 $.post('ctrlproducto',{
                                           Id_grupo: id_grupo,Grupo:grupo,
                                           Id_marca: id_marca,Marca:marca,
                                           Codigo: codigo,
                                           Descripcion: descripcion,
                                           Action: 1
                                       }, function(r){
                                           
                                       
                                           
                                           var jSon = $.parseJSON($.trim(r));
                                           
                                           var id_fila = 'p'+jSon[0].Id+'g'+jSon[0].Id_grupo+'m'+jSon[0].Id_marca;
                                           
                                           
                                           if ($("div#"+id_fila).length) {/* Existe un item  ---  Actualizar fila */
                                               
                                                    var descripcion = $('div#'+id_fila).children('div.descripcion');
                                                        descripcion.html(jSon[0].Descripcion);   
                                                        
                                                        /* Último id */
                                                     setTimeout(function(){ 
                                                             Ultimo_codigo(id_grupo,id_marca);
                                                            $('input#txtCodigo').focus();
                                                    },500);  
                                               
                                           }else{
                                                            /* add Producto al dataGrid */
                                                    var fila = document.createElement('div');
                                                        fila.setAttribute('id',id_fila);
                                                        fila.setAttribute('class','fila');
                                                        fila.setAttribute('data-id',jSon[0].Id);
                                                        fila.setAttribute('data-id_grupo',jSon[0].Id_grupo);
                                                        fila.setAttribute('data-grupo',jSon[0].Grupo);
                                                        fila.setAttribute('data-id_marca',jSon[0].Id_marca);
                                                        fila.setAttribute('data-grupo',jSon[0].Marca);
                                                        /* Codigo */
                                                    var codigo = document.createElement('div');
                                                        codigo.setAttribute('class','codigo');
                                                        codigo.innerHTML = jSon[0].Codigo;
                                                        /* Descripción */
                                                    var descripcion = document.createElement('div');
                                                        descripcion.setAttribute('class','descripcion');
                                                        descripcion.innerHTML = jSon[0].Descripcion;    

                                                        fila.appendChild(codigo);
                                                        fila.appendChild(descripcion);
                                                        document.getElementById('dataProducto').appendChild(fila);
                                                        
                                                        /* Último código */
                                                         document.getElementById('Ultimo_codigo').innerHTML = jSon[0].Codigo;
                                                         document.getElementById('txtCodigo').focus();
                                           }
                                           
                                           document.getElementById('txtCodigo').value = "";
                                           document.getElementById('txtDescripcion').value = "";
                                           
                                       });
                                       
                                       /* Ampliar tiempo para ejecutar funcion 
                                         de búsqueda del último código */
//                                     setTimeout(function(){

                                     
                            });
                            
                             function Ultimo_codigo(pmtId_grupo,pmtId_marca){
                
                                $.post('ctrlproducto',{Action:4,Id_grupo:pmtId_grupo,Id_marca:pmtId_marca},function(r){
                                        if(r=='0'){
                                            r='';
                                        }
                                        document.getElementById('Ultimo_codigo').innerHTML = r;
                                    });
                            }
                            
                            
                      /* END *** btn Almacenar *** END  */
                      


     /*  Alamacenar unidad de medida */
    $('div#frmConfiguracion').on('keypress','#txtSUnidad',function(e){
        
                 if(e.keyCode==13){/* Evita la acción cuando es la tecla Enter */
                 
                     /* Validaciones */
                     var Unidad_medida = document.getElementById('txtSUnidad').value;
                     var Id_medida = document.getElementById('selectedMedida').getAttribute('data-id');
                     var Id_grupo = document.getElementById('selectedGrupo').getAttribute('data-id');
                                 
                                 
                                $.post('ctrlmedida',{
                                           Unidad_medida: Unidad_medida,
                                           Id_medida: Id_medida,
                                           Id_grupo: Id_grupo,
                                           Action: 2
                                       }, function(r){
                                  
                                           /* Hacer que se cree el item */
                                         var item = document.createElement('div');
                                             item.setAttribute('class','item');
                                             item.setAttribute('data-id',Id_medida);
                                             item.innerHTML = Unidad_medida;
                                   
                                         var pRow = document.getElementById('dataUnidad').getElementsByTagName('div')[0];
                                            document.getElementById('dataUnidad').insertBefore(item,pRow);
                                           /* Limpiar caja de texto */
                                           document.getElementById('txtSUnidad').value = '';
                                       });
                                
                     
                }
        
    });
    
     /* END *** Alamacenar unidad de medida *** END  */
    
    
    /* END *** Combobox cbgrupoMedida *** END */
    
    
    
    
     /* END *** Alamacenar medida *** END  */
     
     /* Seleccionar marca en datagrid  */
     $('div#dataMarca').on('click','div.row',function(){
         
         
         var marca = $(this).children('div.marca').html();
         var codigo = $(this).children('div.codigo').html();
         
         $('div#dataMarca div.row').removeClass('rowSelected');
         $(this).addClass('rowSelected');
         
         document.getElementById('selectedMarca').innerHTML = marca;
         document.getElementById('selectedMarca').setAttribute('data-id',codigo);
         
         $("div#dataGrupoMarca div#cbGrupoMarca").children('div.item').removeClass('hidden');
         
         /* Me muestra los grupos que pertenecen solo a una marca */
           $("div#dataGrupoMarca div.row").each(function(e){
                   
                   
                   var idMarca = $(this).attr('data-id_marca');
                   
                   if(codigo!=idMarca){
                       $(this).addClass('hidden');
                   }else{
                       $(this).removeClass('hidden');
                       
                        /* Hacer visible a item en el combobox */
                        var idGrupo = $(this).attr('data-id_grupo');
                        $('div#G'+idGrupo).addClass('hidden');
                   }
            });
            
//             setTimeout(function(){
//                 document.getElementById('txtGrupoMarca').focus();
//             },1500);
            
         
     });
     
     
     /* END *** Seleccionar marca en datagrid *** END */
     
     
     
     /* FrmProducto  */
          
            
            
            
            
          
            
           
    /* END *** FrmProducto *** END */
    
    
    $('div#frmConfiguracion').on('focusin','input#txt_search_Unidad_medida',function(){
         $('div#listUnidadMedida').removeClass('hidden');
     });
   
    $('div#frmConfiguracion').on('focusout','input#txt_search_Unidad_medida',function(){
        setTimeout(function(){$('div#listUnidadMedida').addClass('hidden');},300); 
     });
    
    /* Carga unidades de medida */
    
    function carga_Unidad_medida(){
         $.post('ctrlmedida',{
                                Action: 5
                            }, function(r){
                                
                                 var jSon =   jQuery.parseJSON($.trim(r));
                                 
                                 for(i in jSon){
                                     
                                    var item = document.createElement('div');
                                        item.setAttribute('class','item');
                                        item.setAttribute('data-id',jSon[i].Id);
                                        item.setAttribute('data-id_medida',jSon[i].Id_medida);
                                    var unidad_medida = document.createElement('div');
                                        unidad_medida.setAttribute('class','unidad_medida');
                                        unidad_medida.innerHTML = jSon[i].Unidad_medida;
                                    var grupo = document.createElement('div');
                                        grupo.setAttribute('class','grupo');
                                        grupo.innerHTML = jSon[i].Grupo;

                                     
                                     /* Limita el list a 12 item: Evita Scroll vertical */
                                     if(i>20){
                                         item.setAttribute('class','item hidden');
                                     }
                                
                                     item.appendChild(unidad_medida);
                                     item.appendChild(grupo);
                                     document.getElementById('listUnidadMedida').appendChild(item);
                                     
                                 }
                            });
    }
    /* Seleccion de unidad de medida */
    $('div#listUnidadMedida').on('click','div.item',function(){
        
      
        
        /* Diseño */
                        /* Visible */
                $('div#selectUnidadMedida').removeClass('hidden');
                        /* Reset */
                $('div#listFracciones div.fila').remove();
                
        var pmtId_unidad_medida = $(this).attr('data-id');
        var unidad_medida = $(this).children('div.unidad_medida').html();
        var grupo = $(this).children('div.grupo').html();
        
        document.getElementById('txt_search_Unidad_medida').value = grupo;
        document.getElementById('GrupoUnidad').innerHTML = grupo;
        
        document.getElementById('selectUnidadMedida').innerHTML = unidad_medida;
        document.getElementById('selectUnidadMedida').setAttribute('data-id',pmtId_unidad_medida);
        
        
        /* Buscar las fracciones que pertenecen a esta unidad de medida */
          $.post('ctrlmedida',{Action: 6,Id_unidad_medida: pmtId_unidad_medida,Id_producto:0},
          function(r){
                
              /* Crear objeto */
                        var jSon = jQuery.parseJSON($.trim(r));
                        
                        for(i in jSon){
                            
                            var fila = document.createElement('div');
                                fila.setAttribute('class','fila');
                                fila.setAttribute('data-id',jSon[i].Id);
                                
                            var fraccion = document.createElement('div');
                                fraccion.setAttribute('class','fraccion');
                                fraccion.innerHTML = jSon[i].Fraccion;;
                            var proporcion = document.createElement('div');
                                proporcion.setAttribute('class','proporcion');
                                proporcion.innerHTML = jSon[i].Proporcion;
                                
                                fila.appendChild(fraccion);
                                fila.appendChild(proporcion);
                                document.getElementById('listFracciones').appendChild(fila);
                        }                      
          });
        
    });
    /* Key down txtFraccion */
    $('div.search_Fracciones').on('keydown','input#txtProporcion',function(e){
      
        if(e.keyCode==13){/* Presiona tecla Enter */
            
            var pmtId_unidad_medida = document.getElementById('selectUnidadMedida').getAttribute('data-id');
            var pmtFraccion = document.getElementById('txtFraccion').value;
            var pmtProporcion = document.getElementById('txtProporcion').value;
            
            /* Proceso de guardado */
                $.post('ctrlmedida',{Action:7,Fraccion:pmtFraccion,Proporcion:pmtProporcion,Id_unidad_medida:pmtId_unidad_medida},
                function(id){
                       
                        /* Crear objeto */
                            var fila = document.createElement('div');
                                fila.setAttribute('class','fila');
                                fila.setAttribute('data-id',id);
                                
                            var fraccion = document.createElement('div');
                                fraccion.setAttribute('class','fraccion');
                                fraccion.innerHTML = pmtFraccion;
                            var proporcion = document.createElement('div');
                                proporcion.setAttribute('class','proporcion');
                                proporcion.innerHTML = pmtProporcion;
                                
                                fila.appendChild(fraccion);
                                fila.appendChild(proporcion);
                                document.getElementById('listFracciones').appendChild(fila);
                                /* Limpiar caja de texto */
                                document.getElementById('txtFraccion').value = "";
                                document.getElementById('txtProporcion').value = "";
                        
                });
        }
        
    });
    
    $('div#dataProducto').on('click','div.fila',function(){
        
        /* Hacer visible button delete */
        var id_producto = $(this).attr('data-id');
        $('div#btnDelete_producto').removeClass('hidden');
        $('div#btnDelete_producto').attr('data-id_producto',id_producto);
        
        
        var id_grupo = $(this).attr('data-id_grupo');
        var id_marca = $(this).attr('data-id_marca');
        var grupo = $(this).attr('data-grupo');
        var marca = $(this).attr('data-marca');
        var codigo = $(this).children('div.codigo').html();
        var descripcion = $(this).children('div.descripcion').html();
        
        /* Montar fila en campos */
        document.getElementById('txtSGrupoProducto').value = grupo;
        document.getElementById('txtSGrupoProducto').setAttribute('data-id',id_grupo);
        document.getElementById('txtSMarca').value = marca;
         document.getElementById('txtSMarca').setAttribute('data-id',id_marca);
        document.getElementById('txtCodigo').value = codigo;
        document.getElementById('txtDescripcion').value = descripcion;
        document.getElementById('Ultimo_codigo').innerHTML = 'Editando...';/* Limpio ultimo código */
       
    });
    
    /* Button: Eliminar producto */
    $('div#fDescripcion').on('click','div#btnDelete_producto',function(){
        
        var id_producto = $(this).attr('data-id_producto');
      
        $.post('ctrlproducto',{Action:6,Id_producto:id_producto},function(){
            
            /* Actualizar datagrid */
             document.getElementById('txtCodigo').value ='';
             document.getElementById('txtDescripcion').value ='';
             Ultimo_codigo();
            
        });
        
    });
    
    
    /* Forma fisica del producto */
    $('div.contentFieldFraccionamiento').on('click','div#forma_fisica',function(){
       
       /* Cambiarlo de classe ---> */
       var id_unidad_medida = document.getElementById('selectUnidadMedida').getAttribute('data-id');
       var forma_fisica = parseInt($(this).attr('data-estado'));
       
            if(forma_fisica===0){/* Liquido a Solido*/
                $(this).addClass('solido');
                $(this).attr('data-estado',1);
                $(this).children('div').html('Sólido');
                forma_fisica = 1;
            }else{/* Solido a Liquido */
                $(this).removeClass('solido');
                $(this).attr('data-estado',0);
                $(this).children('div').html('Líquido');
                  forma_fisica = 0;
            }
            
            
            $.post('ctrlmedida',{Action:11,Id_unidad_medida:id_unidad_medida,Forma_fisica:forma_fisica},function(r){});
       
        
    });

});
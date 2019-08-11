
/* row - listColores: Santo Grial */

    function add_row_listColores(json_info_color,id_color,peso){
                
                /* row to row */
                               var id_producto = json_info_color.Id_producto;
                               var descripcion = json_info_color.Descripcion;
                               var precio_gramo = json_info_color.Precio_gramo;
                               var peso_medida = json_info_color.Peso_medida;
                               var cantidad_um_inventario = json_info_color.Cantidad_um_inventario;
                               var inventario = json_info_color.Inventario;
                               var id_um_inventario = json_info_color.Id_um_inventario;
                               var empezado = json_info_color.Empezado;
                               var id_um_empezado = json_info_color.Id_um_empezado;
                               var cantidad_um_empezado = json_info_color.Cantidad_um_empezado;
                               
                            /* Peso gramo */
                                var row = document.createElement('div');
                                    row.setAttribute('class','row');
                                    row.setAttribute('data-id',id_color);
                                    row.setAttribute('data-precio_gramo',precio_gramo);
                                    row.setAttribute('data-peso',peso);
                                    /* Otros */
                                    row.setAttribute('data-id_producto',id_producto);
                                    row.setAttribute('data-peso_medida',peso_medida);
                                    row.setAttribute('data-id_um_inventario',id_um_inventario);
                                    row.setAttribute('data-cantidad_inventario',inventario);
                                    row.setAttribute('data-cantidad_um_inventario',cantidad_um_inventario);
                                    row.setAttribute('data-cantidad_empezado',empezado);
                                    row.setAttribute('data-id_um_empezado',id_um_empezado);
                                    row.setAttribute('data-cantidad_um_empezado',cantidad_um_empezado);

                                    /* Validar existencias en inventario --- Empezados */
                                            var inventario = parseInt(inventario);
                                            var empezado = parseInt(empezado);
                                            
                                            /* control de cantidad ---> Quizá los gramos empezados no son suficientes */ 
                                            if(inventario===0 && empezado===0){
                                                row.setAttribute('class','row empty');
                                            }else{
                                                    var peso_salida = parseInt(peso);
                                                
                                                       /* Tabla de salida: Tabla de la que se descuenta */
                                                    if(empezado>peso_salida){/* Es suficiente con el valor empezado? */                                                        
                                                        
                                                                var restante_empezado = empezado - peso_salida;

                                                                row.setAttribute('data-tabla_salida',1); /* Tabla empezado */
                                                                row.setAttribute('data-salida_empezada',peso_salida);
                                                                row.setAttribute('data-restante_empezada',restante_empezado);
                                                                row.setAttribute('data-salida_entera',0); 
                                                                row.setAttribute('data-restante_entera',0); 

                                                    }else{
                                                        
                                                        if(inventario>0){/* Cálculos para saber cuanto queda al restar */
                                                            
                                                              var peso_medida = parseInt(peso_medida);
                                                              /* Recoge el peso en las unidades selladas y 
                                                                las unidades empezadas */
                                                              var peso_total = peso_medida*inventario + empezado;

                                                              if(peso_total>peso_salida){/* Hay suficiente para la fórmula */

                                                                        /* Cómo saber cuantas unidades selladas descontar*/

                                                                        var diferencia = peso_total - peso_salida;
                                                                        /* Peso que tiene la unidad que quedará empezada */
                                                                        var restante_empezado = diferencia%peso_medida;
                                                                        /* Unidades enteras resultantes  */
                                                                        var restante_entero = parseInt(diferencia/peso_medida);
                                                                        /* Unidades que se gastaron en la fórmula */
                                                                        var unidades_gastadas = inventario - restante_entero;

                                                                        row.setAttribute('data-tabla_salida',2); 
                                                                        row.setAttribute('data-salida_entera',unidades_gastadas); 
                                                                        row.setAttribute('data-salida_empezada',peso_salida); 
                                                                        row.setAttribute('data-restante_entera',restante_entero); 
                                                                        row.setAttribute('data-restante_empezada',restante_empezado); 
                                                                    
                                                                }else{/* No hay en inventario */
                                                                    row.setAttribute('class','row empty');
                                                                }
                                                        
                                                                row.setAttribute('data-tabla_salida',2);/* Tabla inventario */
                                                        }else{
                                                            row.setAttribute('class','row empty');
                                                        }
                                            }
                              }
                                        /* objetos de  la fila */
                                        var color = document.createElement('div');
                                            color.setAttribute('class','color');
                                            color.innerHTML = descripcion;
                                        var peso_ = document.createElement('div');
                                            peso_.setAttribute('class','peso');
                                            peso_.innerHTML = peso;
                                            row.appendChild(color);
                                            row.appendChild(peso_);
                                            document.getElementById('listColores').appendChild(row);
                                            /* Recalcula precio */
                                         var precio = parseInt(precio_gramo)*parseInt(peso);
                              
                              return precio;/* será sumado a un acumulador de precio */
    }

/* row - listColores */



var json_productos_formula = new Array();

function get_Json_productos_formula(){
    return json_productos_formula;
}

function reset_Json_productos_formula(){
    json_productos_formula = new Array();
    console.log("Se hizo reset de productos en formula!");
}

 carga_Poliuretano_Bicapa();

function carga_Poliuretano_Bicapa(){
 
        $.post('ctrlformula',{A:1},function(r){
           
            var json_pol_bic = $.parseJSON($.trim(r));
            
            for(i in json_pol_bic){
                /* Creación de list */
                var row = document.createElement('div');
                    row.setAttribute('class','row');
                    row.setAttribute('data-id',json_pol_bic[i].Id);
                    row.setAttribute('data-id_grupo',json_pol_bic[i].Id_grupo);
                    row.setAttribute('data-id_marca',json_pol_bic[i].Id_marca);
                var descripcion = document.createElement('div');
                    descripcion.setAttribute('class','descripcion');
                    descripcion.innerHTML = json_pol_bic[i].Descripcion;
                var codigo = document.createElement('div');
                    codigo.setAttribute('class','codigo');
                    codigo.innerHTML = json_pol_bic[i].Codigo;
                    
                    row.appendChild(descripcion);
                    row.appendChild(codigo);
                    document.getElementById('listProducto_formula').appendChild(row);
            }
           
        });
}

/* limpíar listColores */
function clean_Formula(){
        /* */
        $('div#listColores div.row').remove();
        document.getElementById('listColores').setAttribute('data-id_formula',0);
        document.getElementById('formula_seleccionada').innerHTML = '';
        document.getElementById('txt_buscador_formula').value = '';
        document.getElementById('txtDescripcion_formula').value = '';
        document.getElementById('txtColor_formula').value = '';
        document.getElementById('txtGramos_formula').value = '';
        /* valores */
        document.getElementById('txtMedida_formula').value = '1/64 Gln';
        document.getElementById('txtPrecio_formula').value = 0;
        
}

$(document).on('ready',function(){
     
     /* Bajar formula a data grid */
     function add_Formula(){

                   var pmtId_formula = document.getElementById('listColores').getAttribute('data-id_formula');
                   var pmtFormula = document.getElementById('formula_seleccionada').innerText;
                   var pmtMedida = document.getElementById('txtMedida_formula').value;
                   var pmtCantidad = document.getElementById('txtCantidad_formula').value;
                   var pmtPrecio = document.getElementById('txtPrecio_formula').value;
                   var pmtDescuento = 0;

                   /* addRow(id_fila,id_producto,id_unidad,tipo,descripcion,codigo,unidad,cantidad,precio_unidad,iva,descuento,precio); */
                       set_valor_formula(pmtPrecio,pmtCantidad,pmtDescuento,0);


                              var fila = document.createElement('div');
                                  fila.setAttribute('class','row_formula');
                                  fila.setAttribute('data-id_formula',pmtId_formula);
                                  fila.setAttribute('data-id_formula',pmtId_formula);
                                  fila.setAttribute('id','f'+pmtId_formula);
                                  fila.setAttribute('data-medida',$('div#listColores').attr('data-medida'));/* Medida en entero: 1/64 -->1 *** 1/4 --->16 */
                                  fila.setAttribute('data-iva','0');
                                  fila.setAttribute('data-descuento','0');


                              /* Codigo */    
                              var codigo = document.createElement('div');    
                                  codigo.setAttribute('class','codigo');
                                  codigo.innerHTML = 'N/A';
                              /* Descripción */
                              var descripcion = document.createElement('div');    
                                  descripcion.setAttribute('class','descripcion');
                              var div_descripcion = document.createElement('div');
                                  div_descripcion.innerHTML = pmtFormula;
                                  descripcion.appendChild(div_descripcion);
                              /* Unidad */    
                              var unidad = document.createElement('div');    
                                  unidad.setAttribute('class','unidad');
                                  unidad.setAttribute('data-id','0');
                                  unidad.innerHTML = pmtMedida;    
                              /* Precio Unidad */
                              var precio_unidad = document.createElement('div');    
                                  precio_unidad.setAttribute('class','precio_unidad');
                              var div_precio_unidad = document.createElement('div');    
                                  div_precio_unidad.innerHTML = pmtPrecio;
                                  precio_unidad.appendChild(div_precio_unidad)
                              /* Cantidad */
                              var cantidad = document.createElement('div');    
                                  cantidad.setAttribute('class','cantidad');
                                  cantidad.innerHTML = pmtCantidad;   
                             /* Descuento */
                              var descuento = document.createElement('div');    
                                  descuento.setAttribute('class','descuento');
                                  descuento.innerHTML = pmtDescuento; 
                            /* Precio */
                              var precio = document.createElement('div');    
                                  precio.setAttribute('class','precio');
                              var div_precio = document.createElement('div');    
                                  div_precio.innerHTML = pmtPrecio;     
                                  precio.appendChild(div_precio);

                                  fila.appendChild(codigo);
                                  fila.appendChild(descripcion);
                                  fila.appendChild(unidad);
                                  fila.appendChild(precio_unidad);
                                  fila.appendChild(cantidad);
                                  fila.appendChild(descuento);
                                  fila.appendChild(precio);

                                  document.getElementById('dataProducto').appendChild(fila);

                   var i = 0;

                    var list_colores = new Array();

                   /* Recorrer cada uno de los colores y asociarlos a la fila */
                   $('div#listColores div.row').each(function(){

                               var id_producto = parseInt($(this).attr('data-id_producto'));
                               var id_um_inventario = parseInt($(this).attr('data-id_um_inventario'));
                               var salida_empezada = parseInt($(this).attr('data-salida_empezada'));
                               var restante_empezada = parseInt($(this).attr('data-restante_empezada'));
                               var salida_entera = parseInt($(this).attr('data-salida_entera'));
                               var restante_entera = parseInt($(this).attr('data-restante_entera'));

                               /* Agrega un color a la lista de colores que componen la fórmula */
                               list_colores[list_colores.length] ={Id_producto:id_producto,Id_unidad_medida:id_um_inventario,
                                                                   Salida_empezada:salida_empezada,Restante_empezada:restante_empezada,
                                                                   Salida_entera:salida_entera,Restante_entera:restante_entera};   
                   });

                           /* Determina posición donde se guardará la lista de colores de esta fórmula */
                           fila.setAttribute('data-posicion',json_productos_formula.length);
                           /* Agrega una nueva fórmula al json */
                           json_productos_formula[json_productos_formula.length] = {Id_formula:pmtId_formula,listColores:list_colores};
                           $('div#frm_buscar_formula').addClass('hidden');

                           setTimeout(function(){clean_Formula();},3000);
         
     }/* add formula */
     
    /* formula rapida */
    $('div#setterFormula').on('click','div#btn_formula_rapida',function(){
            var id_formula = parseInt(document.getElementById('listColores').getAttribute('data-id_formula'));
            
            if(id_formula>0){
                  add_Formula();
                    console.log('After add formula!');
            }
          
    });
    
    /* formula permanente */
    $('div#setterFormula').on('click','div#btn_formula_permanente',function(){
        
          var id_formula = parseInt(document.getElementById('listColores').getAttribute('data-id_formula'));
            
            if(id_formula>0){

                        /* Primero almacena la formula */
                        /* Ingresar fórmula */
                       var descripcion = document.getElementById('txtDescripcion_formula').value;
                       var peso = document.getElementById('listColores').getAttribute('data-peso_formula');
                       var medida = '1/64 Gln';//document.getElementById('txtMedida_formula').value;

                       /* Ingresa fórmula */
                       $.post('ctrlformula',{A:2,Descripcion:descripcion,Peso:peso,Medida:medida},function(r){ });

                            /* Evita que guarde algunos colores en la formula anterior */
                                    setTimeout(function(){
                                            $('div#listColores div.row').each(function(){
                                                
                                                var medida = parseInt(document.getElementById('listColores').getAttribute('data-medida'));
                                                var peso = parseFloat($(this).children('div.peso').text())/medida;

                                                if(peso>0){/* Valores que se ingresarán a la fórmula */

                                                    var id_producto = $(this).attr('data-id_producto');

                                                    /* Ingresa colores a la fórmula */
                                                    $.post('ctrlformula',{A:3,Id_producto:id_producto,Peso:peso},function(r){ });
                                                }
                                            });
                                     },500);


                        /* Baja la formula */
                           add_Formula();
                           setTimeout(function(){
                               getFormulas();
                           },3000);
                           
            }
            
    });
    /* list colors */
    $('div#setterFormula').on('focusin','input#txtColor_formula',function(){
        document.getElementById('listProducto_formula').setAttribute('class','list');
    });
    
    $('div#setterFormula').on('focusout','input#txtColor_formula',function(){
        setTimeout(function(){
            document.getElementById('listProducto_formula').setAttribute('class','list hidden');
        },400);
    });
    
     $('div#setterFormula').on('keypress','input#txtColor_formula',function(e){
         
                 var filtro = $(this).val()+e.key;
                 
                 if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }
                    /*Busca filtro en cada fila de la lista */
                  buscar_texto_list('div#listProducto_formula div.row',filtro,12);
     }); 
     
     $('div#listProducto_formula').on('click','div.row',function(){
         
         
            var color = $(this).children('div.descripcion').text();
            var id_producto = $(this).attr('data-id');
            document.getElementById('txtColor_formula').value = color;
            document.getElementById('txtColor_formula').setAttribute('data-id_producto',id_producto);
            document.getElementById('txtGramos_formula').focus(); 

         
     });
     
     /* Agrega color a formula   */
     $('div#setterFormula').on('keypress','input#txtGramos_formula',function(e){
         
                 var peso = $(this).val();
                 
                 if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                       
                      
                       var id_formula = parseInt(document.getElementById('listColores').getAttribute('data-id_formula'));
                       
                        if(id_formula === 0){
                            var aleatorio =   Math.floor((Math.random() * 100) + 1);
                             document.getElementById('listColores').setAttribute('data-id_formula',aleatorio);
                             id_formula = aleatorio;
                        }
                       
                        var id_producto = document.getElementById('txtColor_formula').getAttribute('data-id_producto');
                        var formula = document.getElementById('txtDescripcion_formula').value;
                        document.getElementById('formula_seleccionada').innerHTML = formula;
                        
                        var precio = parseInt(document.getElementById('txtPrecio_formula').value); 
                        
                       /* debe montarse a la lista de colores !*/
                           $.post('ctrlformula',{A:11,Id_producto:id_producto},function(json_info_color){
                                    
                                        console.log('Info del color: ' + json_info_color);
                                        
                                        if(json_info_color!==''){
                                                
                                                var json_info_color = JSON.parse($.trim(json_info_color));
                                                    
                                                    precio = precio + add_row_listColores(json_info_color,id_formula,peso);
                                                    
                                                    
                                                    /* peso */
                                                var peso_formula = parseInt(document.getElementById('listColores').getAttribute('data-peso_formula'));
                                                    peso_formula = peso_formula + parseInt(peso);
                                                    document.getElementById('listColores').setAttribute('data-peso_formula',peso_formula);
                                                    /* actualiza precio de la formula */
                                                    document.getElementById('txtPrecio_formula').value = precio;
                                                    document.getElementById('txtColor_formula').focus();
                                        }else{
                                            /* peso no definido */
                                            document.getElementById('msgFormula').innerHTML = 'Debes asignarle precio al gramo y/o peso al producto';
                                        }
                                        
                                         /* clean */
                                            document.getElementById('txtGramos_formula').value = '';
                                            document.getElementById('txtColor_formula').value = '';
                                            document.getElementById('txtColor_formula').setAttribute('data-id_producto',0);
                   
                                });
                 }
     }); 
     
    /* master master maste master : Formula */
    
    /* Navegación en  máquinas  ---> Venta fórmulas !*/
   
    /* Marcas */
    $('div#estructura_maquina').on('click','div#marca_maquina',function(){
      
            /* Carga list marcas */
             set_list_Marcas(json_marcas);

           /* Limpia estructura modelo - estructura descripción */
              $('div#modelo_maquina').children('div.value').text('');
              $('div#modelo_maquina').attr('data-id','');
              $('div#descripcion_maquina').children('div.value').text('');
              $('div#descripcion_maquina').attr('data-id','');
    });
    
    /* Modelos */
    $('div#estructura_maquina').on('click','div#modelo_maquina',function(){
    
            /* Carga list modelos */
               set_list_Modelos();

            /* Limpia estructura descripción */
              $('div#descripcion_maquina').children('div.value').text('');
              $('div#descripcion_maquina').attr('data-id','');
    });
    
     /* Descripcion */
    $('div#estructura_maquina').on('click','div#descripcion_maquina',function(){});
    
    
   /* Seleccion en lista */
    $('div#buscador_maquina').on('click','div.listMarca div.row',function(){
        
                var id_marca = $(this).attr('data-id');
                var marca = $(this).text();
                $('div#marca_maquina').children('div.value').text(marca);
                $('div#marca_maquina').attr('data-id',id_marca);

                    /* Trae modelos a la lista maquina */
                   set_list_Modelos();
    });
    
     $('div#buscador_maquina').on('click','div.listModelo div.row',function(){
        
                var id_modelo = $(this).attr('data-id');
                var id_marca =  parseInt($('div#marca_maquina').attr('data-id'));
                var modelo = $.trim($(this).text());

                /* Setea el navegador modelo */
                $('div#modelo_maquina').children('div.value').text(modelo);
                $('div#modelo_maquina').attr('data-id',id_modelo);

                 /* Obtiene las descripciones de las máquinas */
                     getDescripcion_maquina(modelo,id_marca);
        }); /* Selección modelos de máquinas ---> end */
    
     $('div#buscador_maquina').on('click','div.listDescripcion div.row',function(){
         
                /* Carga máquina al navegador */
                   var descripcion = $.trim($(this).text());
                   $('div#descripcion_maquina').children('div.value').text(descripcion);

                    /* Limpia lista */
                    $('div#listFormula div.row').remove();
                    
                    /* Parámetro para buscar todas las fórmulas de una máquina */
                     var id_maquina = parseInt($(this).attr('data-id'));
                    
                    /* Buscar fórmulas asociadas a esta máquina */
                    $.post('ctrlformula',{A:7,Id_maquina:id_maquina},function(json){

                                   var json_formulas = $.parseJSON($.trim(json));

                                   for(i in json_formulas){

                                          /* Montar fórmulas */
                                          var row = document.createElement('div');
                                              row.setAttribute('class','row');
                                              row.setAttribute('data-id',json_formulas[i].Id);
                                              /* Descripcion de la fómula */
                                          var value = document.createElement('div');
                                              value.setAttribute('class','value');
                                              value.innerHTML = json_formulas[i].Descripcion;
                                              /* Agregar a la fila */
                                              row.appendChild(value);
                                              document.getElementById('listFormula').appendChild(row);
                                   }
                    });
                    
                    /* Limpia las clases listMarca --- lisModelo */
                              /* Quita configuraciones anteriores */
                 $('div#listMaquina').removeClass('listMarca');
                 $('div#listMaquina').removeClass('listModelo');
     });
    
    
    
    /* Selección de fórmula */
    $('div#listFormula').on('click','div.row',function(){
                
                
                var id_formula = parseInt($(this).attr('data-id'));
                var descripcion_formula = $(this).text();
                document.getElementById('txt_buscador_formula').value = descripcion_formula;
                document.getElementById('formula_seleccionada').innerHTML = descripcion_formula;
                
                /* Relacionar listColores con la fórmula seleccionada */
                var formula = $.trim($(this).text());
                 $('div#listColores').attr('data-formula',formula);
                 $('div#listColores').attr('data-id_formula',id_formula);
                $('div#listColores').attr('data-medida',1);
                
                    /* Limpia listColores */
                 $('div#listColores div.row').remove();
                
                
                $.post('ctrlformula',{A:8,Id_formula:id_formula},function(json){
                        
                    
                        var json_colores = $.parseJSON($.trim(json));
                        var precio = 0;

                            for(i in json_colores){
                                    /* Peso gramo */
                                    
                                        var id_color = json_colores[i].Id_color;
                                        var peso = json_colores[i].Peso;
                                        
                                            /* Recalcula precio */
                                        precio = precio + add_row_listColores(json_colores[i],id_color,peso);
                              
                    }/* Fin --->  for */
                    
                        /* Aplicar modulo 100 a precio */
                           if(precio>0){
                                precio = parseInt(precio);
                                var mod = 100 - precio%100;
                                precio = precio + mod; 
                            }
                       document.getElementById('txtPrecio_formula').value = precio;
                       document.getElementById('txtMedida_formula').value = '1/64 Gln';
                });        
    });/* listFormula */
    $('div#buscador_formula').on('click','div#btn_eliminar_formula',function(){
            
            var id_formula = parseInt(document.getElementById('listColores').getAttribute('data-id_formula'));
            console.log('Eliminando... formula!');
            
            $.post('ctrlformula',{A:9,Id_formula:id_formula},function(res){
                    
                    console.log('Respuesta: '+res);
                    
                           clean_Formula();
                           getFormulas();
                           setTimeout(function(){
                               document.getElementById('txt_buscador_formula').focus();
                           },1000);
            });
            /* Limpiar todo */
            
            
            
    });/* Eliminar formula */
    
    /* */
    /* Focusin ---> txt_buscador_formula */
    $('div#buscador_formula').on('focusin','input#txt_buscador_formula',function(){
                /* Cargar todas las fórmulas */
                set_list_Formulas(json_formulas);
                document.getElementById('listFormula').setAttribute('class','list');
    });
    
    $('div#buscador_formula').on('focusout','input#txt_buscador_formula',function(){
                /* Cargar todas las fórmulas */
                setTimeout(function(){
                              document.getElementById('listFormula').setAttribute('class','list hidden');
                },400);
    });
    
    /* Key press  ---> txt_buscador_formula  */
     $('div#buscador_formula').on('keypress','input#txt_buscador_formula',function(e){
         
                 var filtro = $(this).val()+e.key;
                 
                 if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }
                    /*Busca filtro en cada fila de la lista */
                  buscar_texto_list('div#listFormula div.row',filtro,7);
     });       
     /* Keydown ---> tct_buscador_formula */
     $('div#buscador_formula').on('keydown','input#txt_buscador_formula',function(e){
         
                   if(e.keyCode===8){/* Retroceso */
                        var filtro = $(this).val();
                            filtro = filtro.substring(0,filtro.length - 1);/* Elimina última letra */
                            buscar_texto_list('div#listFormula div.row',filtro,7);
                   }
     });
    
    /* Key press  ---> txt_buscador_formula  */
     $('div#buscador_maquina').on('keypress','input#txt_buscador_maquina',function(e){
         
                 var filtro = $(this).val()+e.key;
                 
                 if(e.keyCode==13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }
                    /*Busca filtro en cada fila de la lista */
                  buscar_texto_list('div#listMaquina div.row',filtro,3);
     });  
     
      /* Keydown ---> tct_buscador_formula */
     $('div#buscador_maquina').on('keydown','input#txt_buscador_maquina',function(e){
         
                   if(e.keyCode===8){/* Retroceso */
                        var filtro = $(this).val();
                            filtro = filtro.substring(0,filtro.length - 1);/* Elimina última letra */
                            buscar_texto_list('div#listMaquina div.row',filtro,3);
                   }
     });
    
    /* Focusout - Focusin txtCantidad_fórmula */
    
    $('div#cell_setter_formula').on('focusin','input#txtMedida_formula',function(e){
                  $('div#listUnidad_medida_formula').removeClass('hidden');
    });
    $('div#cell_setter_formula').on('focusout','input#txtMedida_formula',function(e){
                setTimeout(function(){
                    $('div#listUnidad_medida_formula').addClass('hidden');
                },400);
      });
    
    $('div#listUnidad_medida_formula').on('click','div.row',function(){
        
                    var cantidad = parseInt($(this).attr('data-cantidad'));
                     $('div#listColores').attr('data-medida',cantidad);

                    var medida = $(this).text();
                    document.getElementById('txtMedida_formula').value = medida;

                    var precio = 0;

                    /* Recorrer colores y multiplicar gramos por "cantidad" */
                    $('div#listColores div.row').each(function(){

                            /* Actualiza peso ---> Aumenta o disminuye */
                            var peso = parseFloat($(this).attr('data-peso'));
                            peso = cantidad*peso;
                            $(this).children('div.peso').text(peso);

                            var precio_gramo = parseInt($(this).attr('data-precio_gramo'));

                            precio = precio + parseInt(precio_gramo*peso);
                            
                            /* Determinar si hay suficiente producto para hacer una fórmula */
                            /* list unidad mediada --- Calcular "Cantidad"*/
                            var cantidad_empezado = parseFloat($(this).attr('data-cantidad_empezado'));
                            var cantidad_inventario = parseFloat($(this).attr('data-cantidad_inventario'));
                            
                        //    console.log(' Antes de la condicion: cantidad_empezado>0 ');
                            
                            if(cantidad_empezado>0){/* Hay alguna unidad del producto empezada?*/
                                
                                            if(peso<cantidad_empezado){/* Es menor el peso necesario que el que hay empezado? */

                                                    var restante_empezado = cantidad_empezado - peso;

                                                    $(this).attr('data-tabla_salida',1);
                                                    $(this).attr('data-salida_empezada',peso);
                                                    $(this).attr('data-restante_empezada',restante_empezado);

                                                    /* Quitar clase empty */
                                                    $(this).removeClass('empty');

                                            }else{/* No es suficiente con el peso empezado */
                                                    /* Revisar existencias en inventario */
                                                    if(cantidad_inventario>0){

                                                              var peso_medida = parseInt($(this).attr('data-peso_medida'));
                                                              /* Recoge el peso en las unidades selladas y 
                                                                las unidades empezadas */
                                                              var peso_total = peso_medida*cantidad_inventario + cantidad_empezado;

                                                              if(peso_total>peso){/* Hay suficiente para la fórmula */

                                                                    /* Cómo saber cuantas unidades selladas descontar*/

                                                                    var diferencia = peso_total - peso;
                                                                    /* Peso que tiene la unidad que quedará empezada */
                                                                    var restante_empezado = diferencia%peso_medida;
                                                                    /* Unidades enteras resultantes  */
                                                                    var restante_entero = parseInt(diferencia/peso_medida);
                                                                    /* Unidades que se gastaron en la fórmula */
                                                                    var unidades_gastadas = cantidad_inventario - restante_entero;


                                                                    $(this).attr('data-tabla_salida',2);
                                                                    $(this).attr('data-salida_entera',unidades_gastadas);
                                                                    $(this).attr('data-salida_empezada',peso);
                                                                    $(this).attr('data-restante_entera',restante_entero);
                                                                    $(this).attr('data-restante_empezada',restante_empezado);

                                                                     /* Quitar clase empty */
                                                                      $(this).removeClass('empty');
                                                              }else{/* No hay suficiente */
                                                                      /* Agregar clase empty */
                                                                      $(this).addClass('empty');
                                                              }

                                                    }else{/* No hay existencias */
                                                         /* Agregar clase empty */
                                                          $(this).addClass('empty');
                                                    }
                                            }
                                
                            }else{/* Determinar si hay unidades selladas en inventario --- No hay unidades empezadas */
                                    
                                        /* Revisar existencias en inventario */
                                                    if(cantidad_inventario>0){

                                                                var peso_medida = parseInt($(this).attr('data-peso_medida'));
                                                                var peso_total = peso_medida*cantidad_inventario;

                                                                if(peso_total>peso){/* Hay suficiente para la fórmula */

                                                                      /* Cómo saber cuantas unidades selladas descontar*/

                                                                      var diferencia = peso_total - peso;
                                                                      /* Peso que tiene la unidad que quedará empezada */
                                                                      var restante_empezado = diferencia%peso_medida;
                                                                      /* Unidades enteras resultantes  */
                                                                      var restante_entero = parseInt(diferencia/peso_medida);
                                                                      /* Unidades que se gastaron en la fórmula */
                                                                      var unidades_gastadas = cantidad_inventario - restante_entero;


                                                                      $(this).attr('data-tabla_salida',2);
                                                                      $(this).attr('data-salida_entera',unidades_gastadas);
                                                                      $(this).attr('data-salida_empezada',peso);
                                                                      $(this).attr('data-restante_entera',restante_entero);
                                                                      $(this).attr('data-restante_empezada',restante_empezado);

                                                                       /* Quitar clase empty */
                                                                        $(this).removeClass('empty');
                                                                }else{/* No hay suficiente */
                                                                        /* Agregar clase empty */
                                                                        $(this).addClass('empty');
                                                                }

                                            }else{/* No hay existencias */
                                                 /* Agregar clase empty */
                                                  $(this).addClass('empty');
                                            }
                            }
                            
                        //    $.position('ctrlpeso',{A:4,Id_producto:id_producto,Peso:peso},function(json){});
                    });
                    
                            /* Condicion que precio sea mayor que cero ---> Aplico modulo 100, para justificar el precio */
                           if(precio>0){
                                precio = parseInt(precio);
                                var mod = 100 - precio%100;
                                precio = precio + mod; 
                            }

                           document.getElementById('txtPrecio_formula').value = precio;
    });/* Click sobre list unidad medida: Cambia peso de la formula  ---> End */
   
    /* Marcas */ 
      getMarcas();
    /* Fórmulas */  
      getFormulas();
    
    /* Click en boton para insertar fórmula al data grid */
    $('div#frm_buscar_formula').on('click','div#btn_insertar_formula_grid',function(){
        
        
    });
    
    
    /* Acceder a la zona donde se pueden seleccionar las fórmulas */
    $('div#cell_search_producto').on('click','div#btnAcces_formula',function(){
        
        $('div#frm_buscar_formula').removeClass('hidden');
        
        document.getElementById('txtPrecio_formula').value = 0;
        document.getElementById('txtMedida_formula').value = '1/64 Gln';
        
      //   getFormulas();
        
    });
    
      /* Cerrar sección de fórmulas  */
    $('div.content_button').on('click','div#btnClose_formula',function(){
        
        $('div#frm_buscar_formula').addClass('hidden');
        
    });
    
});


/* Funciones globales */

/* Maquinas ---> Marcas */
var json_marcas = 0;

function getMarcas(){
        if(json_marcas===0){/* No ha cargado nada */
             $.post('ctrlmaquina',{Action:3},function(json){
                 /* Asigno el array a una variable global */
                json_marcas =  $.parseJSON($.trim(json));;
                set_list_Marcas(json_marcas);
            });
        }
}

/* Llena la lista con todas las fórmulas */
   function set_list_Marcas(pmtJson_marcas){
    
                 document.getElementById('estructura_maquina').setAttribute('data-sector',0);
                /* Cambia entorno a Marca*/
                $('div#listMaquina').addClass('listMarca');
                document.getElementById('lbl_select_maquina').innerHTML = 'Marca';
              
                /* Debe cargar lista de marcas */
                   $('div#listMaquina div.row').remove();
                   
                            for (i in pmtJson_marcas){

                                    /* Aquí debo crear los objetos: list */
                                    var row = document.createElement('div');
                                        row.setAttribute('class','row');
                                        row.setAttribute('data-id',pmtJson_marcas[i].Id);

                                        if(i>2){
                                             row.setAttribute('class','row hidden');
                                        }

                                    var value = document.createElement('div');
                                        value.setAttribute('class','value');
                                        value.innerHTML = pmtJson_marcas[i].Marca;

                                        row.appendChild(value);
                                        document.getElementById('listMaquina').appendChild(row);
                            }
                /* Quita configuraciones anteriores */
                 $('div#listMaquina').removeClass('listModelo');
                 $('div#listMaquina').removeClass('listDescripcion');
    }
    
    /* Trae modelos */
    function getModelos(){
      var json_modelos = [{Id:1,Modelo:2000},{Id:2,Modelo:2001},{Id:3,Modelo:2002},
                          {Id:4,Modelo:2003},{Id:5,Modelo:2004},{Id:6,Modelo:2005},
                          {Id:7,Modelo:2006},{Id:8,Modelo:2007},{Id:9,Modelo:2008},
                          {Id:10,Modelo:2009},{Id:11,Modelo:2010},{Id:12,Modelo:2011},
                          {Id:13,Modelo:2012},{Id:14,Modelo:2013},{Id:14,Modelo:2014},
                          {Id:15,Modelo:2015}];
    
    return json_modelos;
}

function set_list_Modelos(){
    
            document.getElementById('estructura_maquina').setAttribute('data-sector',1);
            /* Transforma el entorno a modelo */
             $('div#listMaquina').addClass('listModelo');
             document.getElementById('lbl_select_maquina').innerHTML = 'Modelo';
              
                /* Debe cargar lista de modelos */
                          
                   var json_modelos = getModelos();
                       $('div#listMaquina div.row').remove();                   
                  
                        for (i in json_modelos){

                                     /* Aquí debo crear los objetos: list */
                                     var row = document.createElement('div');
                                         row.setAttribute('class','row');
                                         row.setAttribute('data-id',json_modelos[i].Id);

                                         if(i>2){
                                              row.setAttribute('class','row hidden');
                                          }

                                     var value = document.createElement('div');
                                         value.setAttribute('class','value');
                                         value.innerHTML = json_modelos[i].Modelo;

                                         row.appendChild(value);
                                         document.getElementById('listMaquina').appendChild(row);
                        }
                /* Quita configuraciones anteriores */
                 $('div#listMaquina').removeClass('listMarca');
                 $('div#listMaquina').removeClass('listDescripcion');
}


/* Trae descripciones: Con el modelo y la marca trae las descripciones de las maquinas */
function getDescripcion_maquina(modelo,id_marca){
    
    /* Limpia la lista */
    $('div#listMaquina div.row').remove();     
     document.getElementById('lbl_select_maquina').innerHTML = 'Descripción';
         
    $.post('ctrlmaquina',{Action:4,Modelo:modelo,Id_marca:id_marca},function(json){
            
             var json_maquinas =  $.parseJSON($.trim(json));//getMaquinas();
             
                        for(i in json_maquinas){
                                /* Máquinas que cumplen con la marca y el modelo seleccionados */

                                      /* Aquí debo crear los objetos: list */
                                   var row = document.createElement('div');
                                       row.setAttribute('class','row');
                                       row.setAttribute('data-id',json_maquinas[i].Id);

                                   var value = document.createElement('div');
                                       value.setAttribute('class','value');
                                       value.innerHTML = json_maquinas[i].Descripcion;

                                       row.appendChild(value);
                                       document.getElementById('listMaquina').appendChild(row);
                         }
        });
        /* Reestructuración */
         $('div#listMaquina').addClass('listDescripcion');
         /* Quita las clases anteriores */
         $('div#listMaquina').removeClass('listModelo');
}


/* Traer Fórmulas */
var json_formulas = 0;

function getFormulas(){
    console.log('Recargaron formulas!');
                $.post('ctrlformula',{A:4},function(json){

                    json_formulas = $.parseJSON($.trim(json));
                    set_list_Formulas(json_formulas);
                    
                });
        
}


/* Llena la lista con todas las fórmulas */
   function set_list_Formulas(pmtJson_formulas){
                    /* Limpia lista */
                   $('div#listFormula div.row').remove();
                 
                   
                   for (i in pmtJson_formulas){
                       
                       /* Aquí debo crear los objetos: list */
                       var row = document.createElement('div');
                           row.setAttribute('class','row');
                           row.setAttribute('data-id',pmtJson_formulas[i].Id);
                           
                       var value = document.createElement('div');
                           value.setAttribute('class','value');
                           value.innerHTML = pmtJson_formulas[i].Descripcion;
                           
                           /* Solo mostrará 7 fómulas */
                           if(i>15){
                                row.setAttribute('class','row hidden');
                           }
                           
                           row.appendChild(value);
                           document.getElementById('listFormula').appendChild(row);
                   }
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

/* 1. Cargar productos */
function carga_Productos(){

    var response = {};
     var promise = new Promise(function (resolve, reject) {

                 $.post('ctrlproducto',{Action: 2 }, function(r){/* Callback ...   */
                       if(r != ''){
                         response = r;
                       }
                       resolve(response)
                 });

                 if (!response) {
                   reject(new Error('No trae productos!'))
                 }
     })/* promise */

     return promise
  }/* ## Cargar productos ## */


  /* 2. Carga Inventario */
  function carga_Inventario(){

      var response = {};
       var promise = new Promise(function (resolve, reject) {

                   $.post('ctrlinventario',{Action:12 }, function(r){/* Callback ...   */
                         if(r != ''){
                           response = r;
                         }
                         resolve(response)
                   });

                   if (!response) {
                     reject(new Error('No trae productos!'))
                   }
       })/* promise */

       return promise
    }/* ## Carga inventario ## */


plataActual();


function plataActual(){


    $.post('ctrlinventario',{Action:6},function(r){

        var jSon = $.parseJSON($.trim(r));

        var valor = 0;
        
        
        for(i in jSon){
            /* Controlar cantidades negativas */
            if(parseInt(jSon[i].Cantidad)>0){
               valor = valor + parseInt(jSon[i].Cantidad)*parseInt(jSon[i].Precio_venta);
            }
            
        }
        document.getElementById('Total').innerHTML = new Intl.NumberFormat("de-DE").format(valor);


    });

}


/* Codigo maestro */
function insert_desde_txt(){
    $.post('ctrlinventario',{Action:7},function(r){  alert(r);});
}


$(document).on('ready',function(){

    cargaProdcutos();
    function cargaProdcutos(){

             $.post('ctrlproducto',{Action: 2}, function(r){


                        var jSon = jQuery.parseJSON($.trim(r));

                        for(i in jSon){

                            var item = document.createElement('div');
                            item.setAttribute('class','item');
                            item.setAttribute('data-id',jSon[i].Id);
                            item.setAttribute('data-marca',jSon[i].Marca);
                            item.setAttribute('data-id_medida',jSon[i].Id_medida);
                            item.setAttribute('data-grupo',jSon[i].Grupo);

                            var descripcion = document.createElement('div');
                            descripcion.setAttribute('class','descripcion');
                            descripcion.innerHTML=jSon[i].Descripcion;

                            var codigo = document.createElement('div');
                            codigo.setAttribute('class','codigo');
                            codigo.innerHTML=jSon[i].Codigo;
                            /*
                            var grupo = document.createElement('div');
                            grupo.setAttribute('class','grupo');
                            grupo.setAttribute('data-id',jSon[i].Id_grupo);
                            grupo.innerHTML=jSon[i].Grupo; */

                            item.appendChild(descripcion);
                      /*    item.appendChild(grupo); */
                            item.appendChild(codigo);

                            if(i>=10){
                                 item.setAttribute('class','item hidden');
                            }

                            document.getElementById('listProducto').appendChild(item);
                        }

             });

       }

       /* Carga Inventario */
       carga_Inventario().then(function(inventario){

          //  console.log('inventario',inventario);

            inventario = JSON.parse(inventario)

            for(i in inventario){
                /* crear data */

                var clase = (inventario[i].Estado==1) ? ' si' : '';
                    clase = (parseInt(inventario[i].Stock)<0) ? ' negativo' : clase;

                var row = document.createElement('div');
                            row.setAttribute('class','row' + clase);
                            row.setAttribute('data-id',inventario[i].Id);
                            row.setAttribute('data-id_producto',inventario[i].Id_producto);
                            row.setAttribute('data-id_unidad_medida',inventario[i].Id_unidad_medida);
                            /* Presentacion */
                            var descripcion = document.createElement('div');
                                descripcion.setAttribute('class','cell descripcion');
                                descripcion.innerHTML = inventario[i].Descripcion;
                        /* Presentacion */
                        var presentacion = document.createElement('div');
                            presentacion.setAttribute('class','cell presentacion');
                            presentacion.innerHTML = inventario[i].Presentacion;
                        /* Stock */
                        var stock = document.createElement('div');
                            stock.setAttribute('class','cell stock');
                            stock.innerHTML = inventario[i].Stock;
                        /* Estado */
                        var estado = document.createElement('div');
                            estado.setAttribute('class','cell estado');
                            estado.innerHTML = (inventario[i].Estado==1) ? 'SI' : 'NO';
                        /* Fecha modificacion */
                        var fecha_modificacion = document.createElement('div');
                            fecha_modificacion.setAttribute('class','cell fecha_modificacion');
                            fecha_modificacion.innerHTML = inventario[i].Fecha_modificacion;
                          /* Precio venta */
                        var precio_venta = document.createElement('div');
                            precio_venta.setAttribute('class','cell precio_venta');
                            precio_venta.innerHTML =  inventario[i].Precio_venta;
                        /* Precio compra */
                        var precio_compra = document.createElement('div');
                            precio_compra.setAttribute('class','cell precio_compra');
                            precio_compra.innerHTML = inventario[i].Precio_compra;

                            row.appendChild(descripcion)
                            row.appendChild(presentacion)
                            row.appendChild(stock);
                            row.appendChild(estado);
                            row.appendChild(fecha_modificacion);
                            row.appendChild(precio_venta);
                            row.appendChild(precio_compra);
                            document.getElementById('dataInventario').appendChild(row);
            }

       })

    /* Focus: Aparece y desaparece lista de productos */
         $('div.container').on('focusin','input#txtSearchProducto',function(){
                 $('div#listProducto').removeClass('hidden');
         });
          $('div.container').on('focusout','input#txtSearchProducto',function(){
             setTimeout(function(){$('div#listProducto').addClass('hidden');},200);
         });


         /* Key press */
             $('div.container').on('keypress','input#txtSearchProducto',function(e){

                 var texto = $(this).val()+e.key;


                 if(e.keyCode==13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }

                  buscaProducto(texto);

             });
     /* end *** key press *** end */
               $('div.container').on('keydown','input#txtSearchProducto',function(e){

                 if(e.keyCode==13){/* Evita la acción cuando es la tecla Enter */
                     e.preventDefault();
                 }

                   if(e.keyCode==8){/* Retroceso */

                       var texto = $(this).val();
                           texto = texto.substring(0,texto.length - 1);/* Elimina última letra */
                           buscaProducto(texto);
                   }
               });


    function buscaProducto(texto){


                        texto = texto.toLowerCase();

                        var i = 0;

                        $("div#listProducto div.item").each(function(e){

                                var producto = $(this).text();/* Extrae: Nombre - Grupo */
                                producto = producto.toLowerCase();


                                if (producto.indexOf(texto)!=-1) {
                                    /* Limitar número de productos visibles */
                                        i = i + 1;
                                        if(i<=10){
                                            $(this).removeClass('hidden');
                                        }else{
                                            $(this).addClass('hidden');
                                        }/* Hace invisibles los productos que se encuentran
                                            en el rango del texto pero fuera de la cantidad */
                                 }else{
                                        $(this).addClass('hidden');
                                 }

                        });
           }

    /* end *** Búsqueda de productos *** end */

         /* Selección de producto */
         $('div#listProducto').on('click','div.item',function(){

                 /* Eliminar filas */
                 $('div.fila_fracciones').remove();

                   /* Hace invisibible el sector de la unidad de medida */
                    $('div#cell_producto').removeClass('hidden');/* Elimina redundancia */
                    $('div#cell_producto').addClass('hidden');


             /* Setter variables */
             var marca = $(this).attr('data-marca');
             var descripcion = $(this).children('div.descripcion').text();
             var id_producto = $(this).attr('data-id');
             var id_medida = $(this).attr('data-id_medida');
             var grupo = $(this).attr('data-grupo');
             var id_grupo = parseInt($(this).children('div.grupo').attr('data-id'));
             var codigo= $(this).children('div.codigo').text();

             /* Muestra información más especifica sobre el producto */
             document.getElementById('info_producto_codigo').innerHTML = codigo;
             document.getElementById('info_producto_marca').innerHTML = marca;
             document.getElementById('info_producto_grupo').innerHTML = grupo;
             document.getElementById('txtSearchProducto').value = descripcion;
             document.getElementById('txtSearchProducto').setAttribute('data-id',id_producto);

             /* Realizar busqueda de unidades de medida */

            $.post('ctrlinventario',{Control:0 ,Id_producto: id_producto,Id_medida:id_medida,Action: 1},
            function(r){/* Colocar valores en existencias */


                        var jSon = $.parseJSON(r);

                         $("div#listUnidadMedida div.item").remove();

                        for(i in jSon){

                                if(jSon[i].Id>0){
                                       $('div#cell_unidad_medida').removeClass('hidden');
                                       $('div#cell_disponible').addClass('hidden');
                                       $('div#cell_disponible').attr('data-estado',0);
                                        document.getElementById('txtPrecioVenta').value ='';
                                        document.getElementById('txtPrecioCompra').value ='';

                                     var item = document.createElement('div');
                                     item.setAttribute('class','item');
                                     item.setAttribute('data-id',jSon[i].Id);
                                     item.setAttribute('data-id_medida',jSon[i].Id_medida);
                                     item.setAttribute('data-precio_venta',jSon[i].Precio_venta)
                                     item.setAttribute('data-precio_compra',jSon[i].Precio_compra)

                                      var unidad_medida = document.createElement('div');
                                      unidad_medida.setAttribute('class','unidad_medida');
                                      unidad_medida.innerHTML = jSon[i].Unidad_medida;

                                      var stock = document.createElement('div');
                                      stock.setAttribute('class','stock');
                                      stock.innerHTML = jSon[i].Stock;

                                      item.appendChild(unidad_medida);
                                      item.appendChild(stock);
                                     document.getElementById('listUnidadMedida').appendChild(item);



                                }else{/* Producto no contiene unidades de medida */
                                       $('div#cell_unidad_medida').addClass('hidden');
                                       $('div#content_fracciones').addClass('hidden');
                                       $('div#cell_disponible').removeClass('hidden');
                                       $('div#cell_disponible').attr('data-estado',1);

                                        document.getElementById('lblSelectedUnidadMedida').setAttribute('data-id',0);
                                        document.getElementById('lblDisponible').innerHTML = jSon[i].Stock;
                                        document.getElementById('txtPrecioVenta').value = jSon[i].Precio_venta;
                                        document.getElementById('txtPrecioCompra').value = jSon[i].Precio_compra;
                                        document.getElementById('txtPrecioVenta').focus();
                                }
                      }

            });
             /* Carga cantidades de unidades de medida relacionadas con el producto seleccionado */
             setTimeout(function(){

                             /* Actualiza Stock */
                                $.post('ctrlinventario',{Control:1,Id_producto: id_producto,Id_medida:id_medida,Action: 1},
                                  function(r){/* Colocar valores en existencias */

                                    var jSon = jQuery.parseJSON($.trim(r));

                                        $("div#listUnidadMedida div.item").each(function(){

                                            for(i in jSon){

                                                var Id_unidad_medida = parseInt($(this).attr('data-id'));

                                                if(Id_unidad_medida===jSon[i].Id){
                                                     $(this).children('div.stock').html(jSon[i].Stock);
                                                     $(this).attr('data-precio_venta',jSon[i].Precio_venta);
                                                     $(this).attr('data-precio_compra',jSon[i].Precio_compra);
                                                }

                                            }
                                       });
                                 });
                        },500);




         });


    $('div#listUnidadMedida').on('click','div.item',function(){


               /* Hace visible el sector de la unidad de medida */
                    $('div#cell_producto').removeClass('hidden');/* Elimina redundancia */


               var id_unidad_medida = $(this).attr('data-id');
               var id_producto = document.getElementById('txtSearchProducto').getAttribute('data-id');
               var precio_venta = $(this).attr('data-precio_venta');
               var precio_compra = $(this).attr('data-precio_compra');


               var unidad_medida = $(this).children('div.unidad_medida').text();
               var stock = $(this).children('div.stock').text();


               $('div#lblSelectedUnidadMedida').children('div.unidad_medida').text(unidad_medida)
               $('div#lblSelectedUnidadMedida').children('div.stock').text(stock)
               document.getElementById('lblSelectedUnidadMedida').setAttribute('data-id',id_unidad_medida);


               document.getElementById('txtPrecioVenta').value = precio_venta;
               document.getElementById('txtPrecioCompra').value = precio_compra;
               $('div#content_fracciones div.fila_fracciones').remove();
               $('div#content_fracciones div.fraccion_peso').remove();


                /* Control de set de inventario */
                        var producto = document.getElementById('txtSearchProducto').value;
                        document.getElementById('select_producto').innerHTML = producto;
                        document.getElementById('select_producto_empezado').innerHTML = producto;
                        document.getElementById('select_producto').setAttribute('data-id',id_producto);
                        document.getElementById('select_medida').innerHTML = unidad_medida;
                        document.getElementById('select_medida_empezado').innerHTML = unidad_medida;
                        document.getElementById('select_medida').setAttribute('data-id',id_unidad_medida);
                        document.getElementById('value_cantidad_actual').innerHTML = stock;
                        $.post('ctrlinventario',{Action:8,Id_producto:id_producto,Id_unidad_medida:id_unidad_medida},function(json){


                                var jSon = $.parseJSON(json);

                                if(jSon[0].Fecha_unidad==='null'){
                                    document.getElementById('value_fecha_inventario').innerHTML = 'No existe fecha!';
                                }else{
                                     document.getElementById('value_fecha_inventario').innerHTML = jSon[0].Fecha_unidad;
                                }

                                 if(jSon[0].Fecha_empezado==='0'){
                                    document.getElementById('value_fecha_empezado').innerHTML = 'No existe fecha!';
                                }else{
                                     document.getElementById('value_fecha_empezado').innerHTML = jSon[0].Fecha_empezado;
                                }

                               document.getElementById('value_cantidad_actual_empezado').innerHTML = jSon[0].Restante;

                        });

                /* Control de set de inventario  --> Fin */



                    /* Trae las fracciones del producto */
                     getFracciones(id_unidad_medida,id_producto);

                 /* Debo identificar si es poliuretano o bicapa --->
                   para eso debo hacer un UPCASE o lowcase */

               var grupo = document.getElementById('info_producto_grupo').innerHTML;
                   grupo = grupo.toLowerCase();

                    if(grupo==='poliuretano' || grupo==='bicapa'){
                        /* El grupo es poliuretano o bicapa --->
                          Hay que verificar que tenga asignado el campo peso ---> tblPeso */
                          /* Colocar txtPeso --->  */
                            $('div#Peso').children('div.child').removeClass('hidden');

                            var precio_gramo = 0;

                            /* Busca peso de unidad medida y producto --> Poliuretano o Bicapa */
                            $.post('ctrlpeso',{A:1,Id_producto:id_producto,Id_unidad_medida:id_unidad_medida},function(r){

                                console.log('peso',r);

                                     var json_peso = JSON.parse(r);
                                     var peso = parseInt(json_peso.Peso);

                                     if(peso>0){
                                        document.getElementById('txtPeso').value = peso;
                                        document.getElementById('txtPeso').setAttribute('data-id',json_peso.Id);
                                        precio_gramo = parseInt(json_peso.Precio_gramo);

                                     }else{/* No se ha seteado el peso */
                                         document.getElementById('txtPeso').value = 0;
                                     }

                                        /* Relay, para que la unidad de media alcance a crearse */
                                        setTimeout(function(){
                                               /* A este punto este input debería estar creado */
                                                    document.getElementById('txtPrecio_gramo').value = precio_gramo;
                                        },500);

                            });




                    }else{
                          /* Hacer invisible el campo peso ---> Elimina redundancia  */
                            $('div#Peso').children('div.child').removeClass('hidden');
                            $('div#Peso').children('div.child').addClass('hidden');
                    }
                            /* Foco */
                             document.getElementById('txtCantidad').focus();
                             document.getElementById('message_peso').innerHTML = ''
           });




            function getFracciones(id_unidad_medida,id_producto){


                        $.post('ctrlmedida',{Id_unidad_medida: id_unidad_medida, Id_producto:id_producto,Action: 6}, function(r){
                               /* Trae las fracciones que corresponden a la unidad de medida */
                                console.log("r: "+r);

                                var jSon = jQuery.parseJSON($.trim(r));

                                if('[]'===r){/* No retorna ningún resultado */
                                       $('div#content_fracciones').addClass('hidden');
                                }else{
                                        $('div#content_fracciones').removeClass('hidden');
                                }

                                for(i in jSon){
                                            /* Setear fracciones */
                                            var fila_fracciones = document.createElement('div');
                                            fila_fracciones.setAttribute('class','fila_fracciones');
                                            fila_fracciones.setAttribute('data-id',jSon[i].Id);
                                            fila_fracciones.setAttribute('data-proporcion',jSon[i].Proporcion);

                                            var fraccion = document.createElement('div');
                                            fraccion.setAttribute('class','fraccion');
                                            fraccion.innerHTML = jSon[i].Fraccion;


                                            //var precio = parseFloat(jSon[i].Proporcion)*parseInt(precio_venta) + 1000;
                                              var precio = parseFloat(jSon[i].Precio_fraccion);


                                           var valor = document.createElement('input');
                                               valor.setAttribute('type','text');
                                               valor.setAttribute('id','V'+jSon[i].Id);
                                               valor.setAttribute('class','valor');
                                               valor.setAttribute('placeholder','5.000');
                                               valor.setAttribute('value',precio);

                                               /* Asigno un Id particular a esta fracción */
                                               if(jSon[i].Fraccion==='gramo'){
                                                   valor.setAttribute('id','txtPrecio_gramo');
                                                   console.log('Fraccion: '+jSon[i].Fraccion);
                                               }

                                            fila_fracciones.appendChild(fraccion);
                                            fila_fracciones.appendChild(valor);
                                            document.getElementById('fracciones').appendChild(fila_fracciones);

                                }
                        });


            }

    $('div.fila_sector').on('click','div#btnAlmacenar',function(){

        console.log('Almacenando...');

                            var id_producto = document.getElementById('txtSearchProducto').getAttribute('data-id');
                            var id_unidad_medida = document.getElementById('lblSelectedUnidadMedida').getAttribute('data-id');
                            var cantidad = document.getElementById('txtCantidad').value;
                            var precio_venta = document.getElementById('txtPrecioVenta').value;
                              var precio_compra = document.getElementById('txtPrecioCompra').value;
                            var iva = parseFloat(document.getElementById('txtIva').value)/100;

                            /* Determinar si contiene unidades de medida o no */

                             $.post('ctrlinventario',{Action:2,Cantidad:cantidad,Precio_venta:precio_venta,
                               Precio_compra:precio_compra,Iva:iva,Id_producto:id_producto,Id_unidad_medida:id_unidad_medida},function(r){

                                    /* Limpiar campos */
                                       document.getElementById('txtPrecioVenta').value = '';
                                       document.getElementById('txtPrecioCompra').value = '';
                                       document.getElementById('txtIva').value = '';
                                       document.getElementById('txtCantidad').value = '';
                                       document.getElementById('lblSelectedUnidadMedida').innerHTML ='Seleccione unidad de medida';
                                   //    document.getElementById('lblSelectedUnidadMedida').setAttribute('data-id',0);

                             });


                               /* Tiempo para garantizar que guarda encabezado de factura */
                                    setTimeout(function(){
                                        /* Almacenar valores de las fracciones */
                                            $('div#fracciones div.fila_fracciones').each(function(){

                                                        var id_fraccion = $(this).attr('data-id');
                                                        var precio_fraccion = $(this).children('input.valor').val();
                                                        console.log('Precio fraccion:'+precio_fraccion);
                                                        $.post('ctrlfactura',{
                                                                    Id_producto: id_producto,
                                                                    Id_unidad: id_unidad_medida,
                                                                    Id_fraccion: id_fraccion,
                                                                    Precio_fraccion: precio_fraccion,
                                                                    Action: 4
                                                                }, function(r){});
                                                });

                                                setTimeout(function(){plataActual();},5000);
                                    },300);


                                    /* Precio gramo para poliuretanos - bicapas */
                            var grupo = document.getElementById('info_producto_grupo').innerHTML;
                                grupo = grupo.toLowerCase();

                              if(grupo==='poliuretano' || grupo==='bicapa'){
                                  /* Calcular precio de gramo */
                                      var precio_gramo = parseInt(document.getElementById('txtPrecio_gramo').value);

                                      /* Almacenar precio por gramo de piluretanos - bicapas  */
                                      $.post('ctrlpeso',{A:3,Id_producto:id_producto,Precio_gramo:precio_gramo},
                                      function(r){

                                                /* Tiempo para limpiar caja de gramos  */
                                                setTimeout(function(){
                                                      /* Limpía */
                                                    document.getElementById('txtPrecio_gramo').value = '';
                                                },500);
                                      });
                              }

                            document.getElementById('txtIva').value='19';
        });


    /* txtPrecioVenta */
    $('div#cell_producto').on('focusout','input#txtPrecioVenta',function(){

        var precio_venta = parseInt(document.getElementById('txtPrecioVenta').value);



                        /* Peso gramo para poliuretanos - bicapas */
                          var grupo = document.getElementById('info_producto_grupo').innerHTML;
                              grupo = grupo.toLowerCase();


                            /* Recorre las fracciones y calcula el precio */
                            $('div#fracciones div.fila_fracciones').each(function(){

                                        var proporcion = parseFloat($(this).attr('data-proporcion'));

                                            /* Reeplazarlo por ---> Pesado o volumen ?? ?? ?? */
                                            /* Calcular valores para poliuretanos */
                                            if(grupo==='poliuretano' || grupo==='bicapa'){

                                                        /* Calcular precio de gramo */
                                                        var peso = parseInt(document.getElementById('txtPeso').value);
                                                        var precio_gramo = parseInt(precio_venta/peso)+1;
                                                        var precio_fraccion = parseInt(proporcion*peso*precio_gramo + 700);/* 700 precio recipiente */

                                                        var mod =  100 - precio_fraccion%100;
                                                            precio_fraccion = precio_fraccion + mod;

                                                        $(this).children('input.valor').val(precio_fraccion);

                                            }else{/* Productos diferentes a bicapa o poliuretanos */

                                                        var valor = parseInt(proporcion*precio_venta + 700);/* 700 de recipiente */
                                                              /* Aplico modulo 100, para justificar el precio */
                                                        var mod =  100 - valor%100;
                                                            valor = valor + mod;
                                                            $(this).children('input.valor').val(valor);
                                            }


                                                /* Nombre de la fracción */
                                                 var fraccion = $(this).children('div.fraccion').text();

                                                 /* Fracción gramo */
                                                if(fraccion==='gramo'){
                                                        /* Trato especial para fracción: gramo

                                                            Se calcula dividiento el precio de la
                                                            unidad sellada  por su peso.
                                                         */
                                                            /* Calcular precio de gramo */
                                                           var peso = parseInt(document.getElementById('txtPeso').value);
                                                           var precio_gramo = parseInt(precio_venta/peso)+1;
                                                           /* Se asigna el precio de un gramo al input gramo */
                                                           $(this).children('input.valor').val(precio_gramo);
                                                }


                            });


    });


    /* Setear peso */
    $('div#Peso').on('click','div#btn_set_Peso',function(){

        /* Parámetros */
        var id_producto = document.getElementById('txtSearchProducto').getAttribute('data-id');
        var id_unidad_medida = document.getElementById('lblSelectedUnidadMedida').getAttribute('data-id');
        var peso = document.getElementById('txtPeso').value;


        $.post('ctrlpeso',{A:2,Id_producto:id_producto,Id_unidad_medida:id_unidad_medida,Peso:peso},function(r){
            /* Limpiar */
             document.getElementById('txtPeso').value = '';
        });

    });

    /* Setear */
    $('div#setcantidad_producto').on('click','div#btn_set_cantidad',function(){

            var id_producto = document.getElementById('select_producto').getAttribute('data-id');
            var id_unidad_medida= document.getElementById('select_medida').getAttribute('data-id');
            var cantidad = document.getElementById('txt_nueva_cantidad').value;

                $.post('ctrlinventario',{ Action:9,Id_producto:id_producto,
                                    Id_unidad_medida:id_unidad_medida,Cantidad:cantidad},function(rs){
                                    document.getElementById('txt_nueva_cantidad').value = '';
                });

    });

    $('div#setempezado_producto').on('click','div#btn_set_cantidad_empezado',function(){

            var id_producto = document.getElementById('select_producto').getAttribute('data-id');
            var id_unidad_medida= document.getElementById('select_medida').getAttribute('data-id');
            var cantidad = document.getElementById('txt_nueva_cantidad_empezado').value;
            var grupo = document.getElementById('info_producto_grupo').innerHTML;
                grupo = grupo.toLowerCase();

                control = false

                if(grupo==='poliuretano' || grupo==='bicapa'){

                        var peso = document.getElementById('txtPeso').value
                        if(peso != ''){
                             peso = parseFloat(peso)
                             cantidad = parseFloat(cantidad)
                             cantidad = cantidad*peso
                             cantidad = cantidad.toFixed(3)
                        }else{
                          document.getElementById('message_peso').innerHTML = 'Debes llenar el peso'
                          document.getElementById('txtPeso').focus()
                          control = true
                        }
                        /*   
                            0.25/4750
                                ¿Tiene logica?
                            mmm => Se hacerca demasiado a cero
                            
            
                        */

                        console.log('cantidad',cantidad);
                }
                if(control){
                  return false;
                }

                $.post('ctrlinventario',{ Action:10,Id_producto:id_producto,
                                    Id_unidad_medida:id_unidad_medida,Cantidad:cantidad},function(rs){
                                    document.getElementById('txt_nueva_cantidad_empezado').value = '';
                });

    });

});

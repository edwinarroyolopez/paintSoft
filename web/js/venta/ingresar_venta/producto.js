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

  /* 2. Cargar presentaciones */
 function getPresentaciones(id_producto){
            var response = {};

            var promise = new Promise(function (resolve, reject) {

                        $.post('ctrlproducto',{Id_producto: id_producto,Action: 3}, function(r){/* Callback ...   */
                                if(r != ''){
                                  response = r;
                                }
                                resolve(response)
                        });

                        if (!response) {
                          reject(new Error('No trae presentaciones!'))
                        }
            })/* promise */

            return promise
    }/* ## get Presentaciones de un producto  ## */

    /* 3. Cargar fracciones */
   function getFracciones(id_producto,id_unidad_medida){
              var response = {};

              var promise = new Promise(function (resolve, reject) {

                          $.post('ctrlinventario',{Action: 4,Id_producto:id_producto,Id_unidad_medida:id_unidad_medida}, function(r){/* Callback ...   */
                                  if(r != ''){
                                    response = r;
                                  }
                                  resolve(response)
                          });

                          if (!response) {
                            reject(new Error('No trae fracciones!'))
                          }
              })/* promise */

              return promise

      }/* ## get Fracciones de un producto  ## */

    /* 4. Cargar peso de una presentacion */
   function getPeso(id_producto,id_unidad_medida){
              var response = {};

              var promise = new Promise(function (resolve, reject) {

                        $.post('ctrlpeso',{A:1,Id_producto:id_producto,Id_unidad_medida:id_unidad_medida}, function(r){/* Callback ...   */
                                if(r != ''){
                                  response = r;
                                }
                                resolve(response)
                        });

                        if (!response) {
                          reject(new Error('No trae fracciones!'))
                        }
              })/* promise */

              return promise

      }/* ## get Peso de una presentacion  ## */

      /* 5. Carga formulas */
     function getFormulas(){
                var response = {};

                var promise = new Promise(function (resolve, reject) {

                          $.post('ctrlformula',{A:4}, function(r){/* Callback ...   */
                                  if(r != ''){
                                    response = r;
                                  }
                                  resolve(response)
                          });

                          if (!response) {
                            reject(new Error('No trae formulas!'))
                          }
                })/* promise */

                return promise

        }/* ## get Formulas  ## */

        /* 6. Carga colores de una formula */
       function getColores(id_formula){
                  var response = {};

                  var promise = new Promise(function (resolve, reject) {

                        $.post('ctrlformula',{A:8,Id_formula:id_formula}, function(r){/* Callback ...   */
                                if(r != ''){
                                  response = r;
                                }
                                resolve(response)
                        });

                        if (!response) {
                          reject(new Error('No trae colores para esta formula!'))
                        }
                })/* promise */

                return promise

          }/* ##  get colores de una formula ## */



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

/* row - listColores *



 /* 7. Crea una formula */
function create_Formula(descripcion,peso,medida){
           var response = {};

           var promise = new Promise(function (resolve, reject) {

                 $.post('ctrlformula',{A:2,Descripcion:descripcion,Peso:peso,Medida:medida}, function(r){/* Callback ...   */
                         if(r != ''){
                           response = r;
                         }
                         resolve(response)
                 });

                 if (!response) {
                   reject(new Error('No se ha creado la formula'))
                 }
         })/* promise */

         return promise

   }/* ##  Crea una formula ## */



     /* Bajar formula a data grid */
     function add_Formula(){

                   var pmtId_formula = document.getElementById('listColores').getAttribute('data-id_formula');
                   var pmtFormula = document.getElementById('formula_seleccionada').innerText;
                   var pmtMedida = document.getElementById('txt_add_medida').value;
                   var pmtCantidad = document.getElementById('txt_add_cantidad').value;
                   var pmtPrecio = document.getElementById('txt_add_precio').value;
                   var pmtDescuento = 0;


                   /* addRow(id_fila,id_producto,id_unidad,tipo,descripcion,codigo,unidad,cantidad,precio_unidad,iva,descuento,precio); */
                       set_valor_formula(pmtPrecio,pmtCantidad,pmtDescuento,0);

                            var fila = document.createElement('div');
                                fila.setAttribute('class','row row_formula');
                                fila.setAttribute('data-id_formula',pmtId_formula);
                                fila.setAttribute('data-id_formula',pmtId_formula);
                                fila.setAttribute('id','f'+pmtId_formula);
                                fila.setAttribute('data-medida',$('div#listColores').attr('data-medida'));/* Medida en entero: 1/64 -->1 *** 1/4 --->16 */
                                fila.setAttribute('data-iva','0');
                                fila.setAttribute('data-descuento','0');


                              /* Codigo */
                              var codigo = document.createElement('div');
                                  codigo.setAttribute('class','cell codigo');
                                  codigo.innerHTML = 'N/A';
                              /* Descripción */
                              var descripcion = document.createElement('div');
                                  descripcion.setAttribute('class','cell descripcion');
                              var div_descripcion = document.createElement('div');
                                  div_descripcion.innerHTML = pmtFormula;
                                  descripcion.appendChild(div_descripcion);
                              /* Unidad */
                              var unidad = document.createElement('div');
                                  unidad.setAttribute('class','cell unidad');
                                  unidad.setAttribute('data-id','0');
                                  unidad.innerHTML = pmtMedida;
                              /* Precio Unidad */
                              var precio_unidad = document.createElement('div');
                                  precio_unidad.setAttribute('class','cell precio_unidad');
                              var div_precio_unidad = document.createElement('div');
                                  div_precio_unidad.innerHTML = pmtPrecio;
                                  precio_unidad.appendChild(div_precio_unidad)
                              /* Cantidad */
                              var cantidad = document.createElement('div');
                                  cantidad.setAttribute('class','cell cantidad');
                                  cantidad.innerHTML = pmtCantidad;

                            /* Precio */
                              var precio = document.createElement('div');
                                  precio.setAttribute('class','cell precio');
                              var div_precio = document.createElement('div');
                                  div_precio.innerHTML = pmtPrecio;
                                  precio.appendChild(div_precio);

                              var delete_row = document.createElement('div')
                                  delete_row.setAttribute('class','delete_row')
                              var button_delete = document.createElement('div')
                                  button_delete.setAttribute('class','button_delete')
                                  button_delete.innerHTML = 'Eliminar'
                                  delete_row.appendChild(button_delete)

                                  fila.appendChild(delete_row)
                                  fila.appendChild(codigo);
                                  fila.appendChild(descripcion);
                                  fila.appendChild(unidad);
                                  fila.appendChild(precio_unidad);
                                  fila.appendChild(cantidad);
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

                      //     setTimeout(function(){clean_Formula();},3000);

     }/* add formula */

     /* set valor formula */
   function set_valor_formula(pmtPrecio_unidad,pmtCantidad,pmtDescuento,pmtIva){

             Subtotal = parseInt(document.getElementById('info_subtotal').innerHTML)
             Iva =  parseInt(document.getElementById('info_iva').innerHTML)
             Total = parseInt(document.getElementById('info_total').innerHTML)

             var iva = 0.19;
             var precio = pmtPrecio_unidad*pmtCantidad;
                 precio = parseInt(precio);

              /* Resumen factura  */
              //Iva =  Iva + precio*iva ;
              Total = Total + precio;
              Iva =  Total*iva ;
              Subtotal = Total - Iva;

              document.getElementById('info_subtotal').innerHTML= Subtotal;
              document.getElementById('info_iva').innerHTML= Iva;
              document.getElementById('info_total').innerHTML= Total;
}/* set valor formula */


/* agrupa formulas para almacenarlas juntas */
var json_productos_formula = new Array();


function get_Json_productos_formula(){
    return json_productos_formula;
}

function reset_Json_productos_formula(){
    json_productos_formula = new Array();
    console.log("Se hizo reset de productos en formula!");
}

function carga_Poliuretano_Bicapa(){
           var response = {};

           var promise = new Promise(function (resolve, reject) {

                 $.post('ctrlformula',{A:1}, function(r){/* Callback ...   */
                         if(r != ''){
                           response = r;
                         }
                         resolve(response)
                 });

                 if (!response) {
                   reject(new Error('No trae bicapas - poliuretanos!'))
                 }
         })/* promise */

         return promise

   }/* ##  get colores de una formula ## */


$(document).on('ready',function(){

 /* 1. Cargar productos */
    carga_Productos().then(function(productos){

              productos =   jQuery.parseJSON(productos);

              /* Limpiar lista */
              $('div#listProducto div.row').remove();

                 for (i in productos){

                          var row = document.createElement('div');
                              row.setAttribute('class','row');
                              row.setAttribute('data-id',productos[i].Id);
                              row.setAttribute('data-id_medida',productos[i].Id_medida);
                              row.setAttribute('data-codigo',productos[i].Codigo);
                              row.setAttribute('data-marca',productos[i].Marca);
                              row.setAttribute('data-grupo',productos[i].Grupo);
                          var descripcion = document.createElement('div');
                              descripcion.setAttribute('class','descripcion');
                              descripcion.innerHTML = productos[i].Descripcion;
                              row.appendChild(descripcion);

                          if(i>=15){
                              row.setAttribute('class','row hidden');
                          }else{/* Cantidad de items visibles */
                              document.getElementById('listProducto').setAttribute('data-items',i);
                          }
                          document.getElementById('listProducto').appendChild(row);
                    }

    });/* ## get Productos ## */


    /* Hacer visible la lista de productos */
   $('div#content_search_producto').on('focusin','input#txt_search_producto',function(){
       $('div#listProducto').removeClass('hidden');
   });
   /* Esconder lista de productos */
   $('div#content_search_producto').on('focusout','input#txt_search_producto',function(){
       setTimeout(function(){
           $('div#listProducto').addClass('hidden');

           /* Resetear lista de productos*/
           var i = 0;
             $("div#listProducto div.row").each(function(){
                 i = i + 1;
                 if(i<=15){$(this).removeClass('hidden')}

             });
       },500);

   });

   /* Buscar dentro de lista */
   $('div#content_search_producto').on('keypress','input#txt_search_producto',function(e){
          var texto = $(this).val()+e.key;
         /* Evita la acción cuando es la tecla Enter */
         if(e.keyCode==13){e.preventDefault();}

         busqueda_List(texto,'listProducto');
   });

   $('div#listProducto').on('click','div.row', function(){
                 /* Getter */

                 /* Se deben cargar las presentaciones */

                 /* Búsqueda de: Id unidad de medida -  Unidad de medidad - Stock con Id producto*/
              var id_producto = $(this).attr('data-id');
              var codigo = $(this).attr('data-codigo');
              var marca = $(this).attr('data-marca');
              var grupo = $(this).attr('data-grupo');

              var descripcion = $(this).children('div.descripcion').html();
              document.getElementById('txt_search_producto').value = descripcion;


              $('div#list_presentaciones div.row').remove();

                  /* Setter */
                  document.getElementById('selectedProducto').setAttribute('data-id',id_producto)
                  document.getElementById('selectedProducto').innerHTML = descripcion
                  document.getElementById('selectedProducto').setAttribute('data-id',id_producto);
                  document.getElementById('selectedProducto').setAttribute('data-codigo',codigo);

                  document.getElementById('info_value_marca').innerHTML= marca
                  document.getElementById('info_value_grupo').innerHTML= grupo

                  /* Esconder lista */
                  $('div#listProducto').addClass('hidden');
                        getPresentaciones(id_producto).then(function(presentaciones){

                                 presentaciones =   jQuery.parseJSON(presentaciones);

                                 for (i in presentaciones){
                                     /* Filtrar - Actualizar Stock */
                                      var row = document.createElement('div');
                                          row.setAttribute('class','row');
                                          row.setAttribute('data-id_unidad_medida',presentaciones[i].Id);
                                          row.setAttribute('data-precio',presentaciones[i].Precio_venta);
                                          row.setAttribute('data-iva',presentaciones[i].Iva);
                                      var presentacion = document.createElement('div');
                                          presentacion.setAttribute('class','presentacion');
                                          presentacion.innerHTML = presentaciones[i].Unidad_medida;
                                      var disponible = document.createElement('div');
                                          disponible.setAttribute('class','disponible');
                                          disponible.innerHTML = presentaciones[i].Stock;
                                          row.appendChild(presentacion);
                                          row.appendChild(disponible);
                                          document.getElementById('list_presentaciones').appendChild(row);
                                    }
                                    document.getElementById('txt_presentacion').focus()
                           })

   })/* ## selecciona un producto ## */


   /* Hacer visible la lista de presentaciones */
  $('div#info_presentacion').on('focusin','input#txt_presentacion',function(){
      $('div#list_presentaciones').removeClass('hidden');
  });
  /* Esconder lista de presentaciones */
  $('div#info_presentacion').on('focusout','input#txt_presentacion',function(){
      setTimeout(function(){
          $('div#list_presentaciones').addClass('hidden');

          /* Resetear lista de presentaciones*/
          var i = 0;
            $("div#list_presentaciones div.row").each(function(){
                i = i + 1;
                if(i<=15){$(this).removeClass('hidden')}
            });
      },500);

  });


  $('div#list_presentaciones').on('click','div.row',function(){

                   var unidad_medida = $(this).children('div.presentacion').text();
                   var disponible = $(this).children('div.disponible').text();
                   var id_unidad_medida = $(this).attr('data-id_unidad_medida');
                   var id_producto = document.getElementById('selectedProducto').getAttribute('data-id');
                   var precio_unidad = $(this).attr('data-precio');
                   var iva = $(this).attr('data-iva');

                   document.getElementById('txt_presentacion').value = unidad_medida
                   document.getElementById('info_value_disponible').innerHTML = disponible

                      /* FrmVenta --> venta_producto.js --> div#info_unidades --> click div.item --> L:194 */
                   var unidades_enteras = $(this).children('div.disponible').text();
                   document.getElementById('txt_fraccion').setAttribute('data-unidades_enteras',unidades_enteras);
                   document.getElementById('txt_fraccion').value  = unidad_medida;

                   document.getElementById('txt_precio').value = precio_unidad;
                   document.getElementById('txt_precio').setAttribute('data-iva',iva);
                   document.getElementById('txt_fraccion').value = unidad_medida;
                   document.getElementById('txt_fraccion').setAttribute('data-id',id_unidad_medida);
                   document.getElementById('txt_fraccion').removeAttribute('data-id_fraccion');
                   document.getElementById('txt_fraccion').setAttribute('data-tipo',0);/*  1: Fraccion --- 0: Entero*/
                   document.getElementById('txt_cantidad').value = 1;
              //     document.getElementById('txt_cantidad').removeAttribute('readonly'); /* Desbloquear cantidad */

                   /* Foco a cantidad */
                   document.getElementById('txt_cantidad').focus();


                 $('div#Item_empezado').children('div.label').addClass('hidden');

                   $('div#list_fracciones div.row').remove();

                   /* Si la unidad de medida es fraccionable, entonces buscar sus fracciones */
                     getFracciones(id_producto,id_unidad_medida).then(function(fracciones){

                        fracciones = JSON.parse(fracciones)

                        for(i in fracciones){
                            /* Lista de fracciones */
                            var row = document.createElement('div');
                                row.setAttribute('class','row');
                                row.setAttribute('data-id',fracciones[i].Id);
                                row.setAttribute('data-proporcion',fracciones[i].Proporcion);
                                row.setAttribute('data-precio',fracciones[i].Precio_fraccion);
                                row.innerHTML = fracciones[i].Fraccion;
                                document.getElementById('list_fracciones').appendChild(row);
                        }

                     })


                      /* Buscar peso y precio de gramo de poliuretanos   */
                   var grupo = document.getElementById('info_grupo').innerHTML;
                   grupo = grupo.toLowerCase();

                 if(grupo==='bicapa' || grupo==='poliuretano'){
                     console.log('Es bicapa o poliuretano');
                     /* Hace la busqueda de precio del gramo y el peso */
                   /* Busca peso de unidad medida y producto --> Poliuretano o Bicapa */
                       getPeso(id_producto,id_unidad_medida).then(function(peso){
                              document.getElementById('txt_fraccion').setAttribute('data-precio_gramo',peso[0].Precio_gramo);
                              document.getElementById('txt_fraccion').setAttribute('data-peso',peso[0].Peso);
                              document.getElementById('txt_fraccion').setAttribute('data-proporcion',1);
                       })
                 }

  });/* Selecciona presentacion */

  /* Hacer visible la lista de fracciones */
 $('div#info_fraccion').on('focusin','input#txt_fraccion',function(){
     $('div#list_fracciones').removeClass('hidden');
 });
 /* Esconder lista de fracciones */
 $('div#info_fraccion').on('focusout','input#txt_fraccion',function(){
     setTimeout(function(){
         $('div#list_fracciones').addClass('hidden');
     },500);

 });

 /* selecciona fraccion */

  $('div#list_fracciones').on('click','div.row',function(){
      console.log('Selecciona fraccion...');

             var precio_fraccion = $(this).attr('data-precio');
             var id_fraccion = $(this).attr('data-id');
             var fraccion = $(this).text();
             var proporcion = parseFloat($(this).attr('data-proporcion'));

             document.getElementById('txt_precio').value = precio_fraccion;
             document.getElementById('txt_fraccion').value = fraccion;
             document.getElementById('txt_fraccion').setAttribute('data-tipo',1);/* 0: Entero --- 1: Fraccion */
             document.getElementById('txt_fraccion').setAttribute('data-id_fraccion',id_fraccion);
             document.getElementById('txt_fraccion').setAttribute('data-proporcion',proporcion);/* Requerido para calcular peso gramo gastado */
             document.getElementById('txt_cantidad').value = 1;

             /* Parámetros */
              var id_producto = document.getElementById('selectedProducto').getAttribute('data-id');
              var id_unidad_medida = document.getElementById('txt_fraccion').getAttribute('data-id');

              /* Requerido para productos que no se venden por gramo  */
              var requerido = proporcion.toFixed(5);


               /* Calcular peso a descargar si es un poliuretano o bicapa */
                              var grupo = document.getElementById('info_grupo').innerHTML;
                                  grupo = grupo.toLowerCase();

                                 if(grupo==='bicapa' || grupo==='poliuretano'){
                                      /* Hace la busqueda de precio del gramo y el peso */
                                          var cantidad = parseInt(document.getElementById('txt_cantidad').value);
                                          /* Peso entero  --- Proporción seleccionada */
                                          var peso = parseFloat(document.getElementById('txt_fraccion').getAttribute('data-peso'));
                                              peso = peso.toFixed(5);
                                              proporcion = proporcion.toFixed(5);

                                          /*  Recalcula el peso ---> Será el valor a almacenado */
                                              requerido = peso*proporcion*cantidad;

                                          var fraccion = $(this).text();

                                          if(fraccion==='gramo'){/* No funciona igual */
                                                 requerido = cantidad;
                                              /* Requerido será igual a lo que halla en cantidad "1"
                                                 ¿Cómo está manejando AddItem las cantidades respecto al peso que hay que restar ?
                                                 */
                                          }
                                 }
                                 /* Hasta este punto todo parece muy normal */

                                 console.log('id_producto: '+id_producto + ' id_unidad_medida: '+id_unidad_medida);


              /* Busca la existencia de productos empezados */
              $.post('ctrlinventario',{Action:5,Id_producto:id_producto,Id_unidad_medida:id_unidad_medida},function(restante){

                         $('div#Item_empezado').children('div.label').removeClass('hidden');
                         $('div#Item_empezado').children('div').html('Item empezado contiene: '+restante);
                         document.getElementById('Item_empezado').setAttribute('data-resta_inventario',0);
                         document.getElementById('Item_empezado').setAttribute('data-bd_restante',restante);
                         restante = parseFloat(restante);
                         restante = restante.toFixed(5);


                          if(restante>0){/* Comparar valor requerido con restante
                                              ---> Mensaje: Hay items empezados */

                                             if(requerido>restante){/* Hay que empezar un nuevo item */

                                                         var unidades_enteras = parseInt(document.getElementById('txt_fraccion').getAttribute('data-unidades_enteras'));

                                                            if(unidades_enteras>0){/* Puedo vender */

                                                                        /* Bicapa o poliuretano */
                                                                       if(grupo==='bicapa' || grupo==='poliuretano'){
                                                                           /* Conversion de unidad entera a gramos */
                                                                           var peso_unidad = parseInt(document.getElementById('txt_fraccion').getAttribute('data-peso'));
                                                                           /* Contiene peso restante empezado + el peso de la unidad  - requerido */
                                                                           restante = (restante + peso_unidad) - requerido;

                                                                       }else{/* Productos que manejan fracciones de 0 - 0.99 */
                                                                                requerido = requerido - restante;
                                                                                restante = 1 - requerido;/* Estado --> 1: Hay un item empezado */
                                                                       }

                                                                    /* RESTAMOS UNO A INVENTARIO */
                                                                    document.getElementById('Item_empezado').setAttribute('data-resta_inventario',1);

                                                            }else{ /* No hay suficiente para vender */
                                                                 $('div#Item_empezado').children('div').html('No hay suficiente para vender');
                                                            }

                                             }else{/* Igual o mayor: Hay suficiente para entregar el valor requerido */
                                                 restante = restante - requerido;
                                                 /* Si restante es cero, significa que podemos colocar el item
                                                  en tblProductoEmpezado: Estado --> 0: No hay productos empezados*/
                                             }

                          }else{/* Empezar un item  ---> Mensaje: No hay items empezados */
                            //  restante = 1 - requerido;
                                                 /* Verificar que existan unidades enteras */
                                                   var unidades_enteras = parseInt(document.getElementById('txt_fraccion').getAttribute('data-unidades_enteras'));

                                                    if(unidades_enteras>0){/* Puedo vender */

                                                                /* Bicapa o poliuretano */
                                                               if(grupo==='bicapa' || grupo==='poliuretano'){
                                                                   /* Conversion de unidad entera a gramos */
                                                                   var peso_unidad = parseInt(document.getElementById('txt_fraccion').getAttribute('data-peso'));
                                                                   /* Contiene peso restante empezado + el peso de la unidad  - requerido */
                                                                   restante =  peso_unidad - requerido;
                                                               }else{
                                                                   restante = 1 - requerido;/* Estado --> 1: Hay un item empezado */
                                                               }

                                                            /* RESTAMOS UNO A INVENTARIO */
                                                            document.getElementById('Item_empezado').setAttribute('data-resta_inventario',1);

                                                    }else{ /* No hay suficiente para vender */
                                                         $('div#Item_empezado').children('div').html('No hay suficiente para vender');
                                                    }
                          }
                          /* Estos datos deben ir con la fila del data grid: Hasta que
                             pueda listas de objetos crear objetos */
                       document.getElementById('Item_empezado').setAttribute('data-restante',restante);
                       document.getElementById('Item_empezado').setAttribute('data-requerido',requerido);

              });

  })
  /* Selecciona fraccion */

    /* variables globales totalizadoras */

    var Iva =  parseInt(document.getElementById('info_iva').innerHTML)
    var Total = parseInt(document.getElementById('info_total').innerHTML)

   $('div#detalle_producto').on('click','div#btnAddItem',function(){


     /* oculta otros formularios */
         $('div#frm_add_cliente').removeClass('hidden')
         $('div#frm_add_cliente').addClass('hidden')
         $('div#frm_add_formula').removeClass('hidden')
         $('div#frm_add_formula').addClass('hidden')

         /* Actualiza el consecutivo */
          //  getConsecutivo();

            Iva =  parseInt(document.getElementById('info_iva').innerHTML)
            Total = parseInt(document.getElementById('info_total').innerHTML)


             /* Validación ---> Cajas de texto */
                 var control = 0;
                 $('div#detalle_producto input').each(function(){

                         if($(this).val()===''){/* La caja está vacía? */
                             control = control + 1;
                             $(this).focus();
                             return false;
                         }
                 });

                 if(control>0){/* Si hay alguna caja vacía: Impide que la fila ingrese al dataGrid */
                     console.log('Error: Caja vacía!');
                     return;
                 }

                  var id_producto = document.getElementById('selectedProducto').getAttribute('data-id');
                  var descripcion = document.getElementById('selectedProducto').innerHTML;
                  var codigo =  document.getElementById('selectedProducto').getAttribute('data-codigo');

                  var unidad = document.getElementById('txt_fraccion').value;
                  var id_unidad = document.getElementById('txt_fraccion').getAttribute('data-id');
                  var tipo = parseInt(document.getElementById('txt_fraccion').getAttribute('data-tipo'));

               /*   var precio_unidad = parseInt(document.getElementById('txt_precio').value);
                  var cantidad = parseInt(document.getElementById('txt_cantidad').value);
                  var precio = precio_unidad*cantidad
                  var iva = parseInt(precio*0.19) */
                  
                   var precio_unidad = parseInt(document.getElementById('txt_precio').value);
                  var cantidad = parseInt(document.getElementById('txt_cantidad').value);
                  var precio = precio_unidad*cantidad
                 // var iva = parseInt(precio*0.19) 
              
                  var iva = parseInt(precio - precio/1.19) /* iva correcto */

                /* Validar ---> : No repetir filas */
                var id_fila = 'p'+id_producto+'u'+id_unidad;

                if(tipo>0){/* Fracción */
                    id_fila = id_fila+'f';
                }

                if ($("div#"+id_fila).length) {/* Existe el producto en la presentacion */

                        /* Resto el valor de la fila que se encontraba antes de esta */
                        var precio_anterior = parseInt($("div#"+id_fila).children('div.precio').children('div').text());
                  //      var iva_anterior = parseInt(precio_anterior*0.19);
                        
                        var iva_anterior = parseInt(precio_anterior - precio_anterior/1.19) /* iva correcto */
                        
                            Iva = Iva - iva_anterior
                            Total = Total - precio_anterior

                            /* Elimino fila */
                            $('div.datagrid div#'+id_fila).remove()
                }
                  var descuento = 0
                  addRow(id_fila,id_producto,id_unidad,tipo,descripcion,codigo,unidad,cantidad,precio_unidad,iva,descuento,precio);

                /* totalizadoras */
                    Iva = Iva + iva
                    Total = Total + precio
                var Subtotal = Total - Iva

                 /* Variables totalizadoras  */
                 document.getElementById('info_subtotal').innerHTML= Subtotal
                 document.getElementById('info_iva').innerHTML= Iva
                 document.getElementById('info_total').innerHTML= Total

            /***  Limpiar campos  ***/
                 document.getElementById('txt_search_producto').value = '';
                 document.getElementById('selectedProducto').setAttribute('data-id',0);
                 document.getElementById('selectedProducto').setAttribute('data-codigo','');
                 document.getElementById('selectedProducto').innerHTML = 'Buscar producto';
                 document.getElementById('info_value_grupo').innerHTML = '...';
                 document.getElementById('info_value_marca').innerHTML = '...';
                 document.getElementById('info_value_disponible').innerHTML = 'Presentacion';
                 document.getElementById('txt_presentacion').value = '';
                 $('div#list_presentaciones div.row').remove();
                 $('div#list_fracciones div.row').remove();
                 document.getElementById('txt_fraccion').value = '';
                 document.getElementById('txt_cantidad').value = '';
                 document.getElementById('txt_precio').value = '';
                 $('div#Item_empezado').children('div.label').addClass('hidden');
                   // document.getElementById('txt_search_producto').focus();


   })/* add Item */


 function addRow(pmtId_fila,pmtId_producto,pmtId_unidad,pmtTipo,pmtDescripcion,pmtCodigo,pmtUnidad,
                             pmtCantidad,pmtPrecio_unidad,pmtIva,pmtDescuento,pmtPrecio){

                 var fila = document.createElement('div');
                     fila.setAttribute('class','row');
                     fila.setAttribute('data-idproducto',pmtId_producto);
                     fila.setAttribute('id',pmtId_fila);
                     fila.setAttribute('data-idunidad',pmtId_unidad);
                     fila.setAttribute('data-tipo',pmtTipo);
                     fila.setAttribute('data-iva',pmtIva);
                     fila.setAttribute('data-descuento',pmtDescuento);

                     if(pmtTipo>0){/* Fracción */
                         var restante = document.getElementById('Item_empezado').getAttribute('data-restante');
                         var resta_inventario = document.getElementById('Item_empezado').getAttribute('data-resta_inventario');
                         var id_fraccion = document.getElementById('txt_fraccion').getAttribute('data-id_fraccion');
                           fila.setAttribute('data-id_fraccion',id_fraccion);
                           fila.setAttribute('data-restante',restante);
                           fila.setAttribute('data-resta_inventario',resta_inventario);
                     }

                 /* Codigo */
                 var codigo = document.createElement('div');
                     codigo.setAttribute('class','cell codigo');
                     codigo.innerHTML = pmtCodigo;
                 /* Descripción */
                 var descripcion = document.createElement('div');
                     descripcion.setAttribute('class','cell descripcion');
                 var div_descripcion = document.createElement('div');
                     div_descripcion.innerHTML = pmtDescripcion;
                     descripcion.appendChild(div_descripcion);
                 /* Unidad */
                 var unidad = document.createElement('div');
                     unidad.setAttribute('class','cell unidad');
                     unidad.setAttribute('data-id',pmtId_unidad);
                     unidad.innerHTML = pmtUnidad;
                 /* Precio Unidad */
                 var precio_unidad = document.createElement('div');
                     precio_unidad.setAttribute('class','cell precio_unidad');
                 var div_precio_unidad = document.createElement('div');
                     div_precio_unidad.innerHTML = pmtPrecio_unidad;
                     precio_unidad.appendChild(div_precio_unidad)
                 /* Cantidad */
                 var cantidad = document.createElement('div');
                     cantidad.setAttribute('class','cell cantidad');
                     cantidad.innerHTML = pmtCantidad;
                /* Descuento */
                 // var descuento = document.createElement('div');
                 //     descuento.setAttribute('class','descuento');
                 //     descuento.innerHTML = pmtDescuento;
               /* Precio */
                 var precio = document.createElement('div');
                     precio.setAttribute('class','cell precio');
                 var div_precio = document.createElement('div');
                     div_precio.innerHTML = pmtPrecio;
                     precio.appendChild(div_precio);

                 var delete_row = document.createElement('div')
                     delete_row.setAttribute('class','delete_row')
                 var button_delete = document.createElement('div')
                     button_delete.setAttribute('class','button_delete')
                     button_delete.innerHTML = 'Eliminar'
                     delete_row.appendChild(button_delete)

                     fila.appendChild(delete_row)
                     fila.appendChild(codigo);
                     fila.appendChild(descripcion);
                     fila.appendChild(unidad);
                     fila.appendChild(precio_unidad);
                     fila.appendChild(cantidad);
                     // fila.appendChild(descuento);
                     fila.appendChild(precio);
                     document.getElementById('dataProducto').appendChild(fila);

             }/* add Row */

  $('div#dataProducto').on('click','div.button_delete',function(){


            Iva =  parseInt(document.getElementById('info_iva').innerHTML)
            Total = parseInt(document.getElementById('info_total').innerHTML)

            /* Descontar valor de variables totalizadoras */
            var row =   $(this).parent().parent()
            var precio =  parseInt(row.children('div.precio').text())
            var iva =  parseInt(precio*0.19)

            Iva = Iva - iva
            Total = Total - precio
            Subtotal = Total - Iva
            /* Variables totalizadoras  */
            document.getElementById('info_subtotal').innerHTML= Subtotal
            document.getElementById('info_iva').innerHTML= Iva
            document.getElementById('info_total').innerHTML= Total

            $(this).parent().parent().remove()

  })/* Eliminar fila */



  $('div#frm_add_formula').on('click','div#button_close_frm_add_formula',function(){
      $('div#frm_add_formula').addClass('hidden')
  })

  $('div#frm_add_formula').on('click','div#button_new_formula',function(){

      console.log('Create... new formula!');
      /* Limpia listColores */
    $('div#listColores div.row').remove();
    document.getElementById('listColores').setAttribute('data-medida',1)
    document.getElementById('txt_search_formula').value = ''
    document.getElementById('formula_seleccionada').innerHTML = ''
    document.getElementById('txt_add_medida').value = ''
    document.getElementById('txt_add_precio').value = '0'

    document.getElementById('txtDescripcion_formula').value = ''
    document.getElementById('txtColor_formula').value = ''
    document.getElementById('txtGramos_formula').value = ''


      $('div.setting_formula').addClass('hidden')
      $('div.create_formula').removeClass('hidden')

      /* Cargar poliuretanos - bicapas */
      carga_Poliuretano_Bicapa().then(function(poliuretano_bicapa){

              poliuretano_bicapa = JSON.parse(poliuretano_bicapa);

              for(i in poliuretano_bicapa){
                  /* Creación de list */
                  var row = document.createElement('div');
                      row.setAttribute('class','row');
                      row.setAttribute('data-id',poliuretano_bicapa[i].Id);
                      row.setAttribute('data-id_grupo',poliuretano_bicapa[i].Id_grupo);
                      row.setAttribute('data-id_marca',poliuretano_bicapa[i].Id_marca);
                  var descripcion = document.createElement('div');
                      descripcion.setAttribute('class','descripcion');
                      descripcion.innerHTML = poliuretano_bicapa[i].Descripcion;
                  var codigo = document.createElement('div');
                      codigo.setAttribute('class','codigo');
                      codigo.innerHTML = poliuretano_bicapa[i].Codigo;

                      row.appendChild(descripcion);
                      row.appendChild(codigo);
                      document.getElementById('listProducto_formula').appendChild(row);
              }


      })

  })

  /* Hace visible lista de formulas */
  $('div#setterFormula').on('focusin','input#txtColor_formula',function(){
      $('div#listProducto_formula').removeClass('hidden')
  })
  /* Hace invisible lista de formulas */
  $('div#setterFormula').on('focusout','input#txtColor_formula',function(){
        setTimeout(function(){
            $('div#listProducto_formula').addClass('hidden')
        },200)
  })

  /* Buscar dentro de lista */
  $('div#setterFormula').on('keypress','input#txtColor_formula',function(e){
         var texto = $(this).val()+e.key;
        /* Evita la acción cuando es la tecla Enter */
        if(e.keyCode==13){e.preventDefault();}

        busqueda_List(texto,'listProducto_formula');
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

                        var precio = parseInt(document.getElementById('txt_add_precio').value);

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
                                                    document.getElementById('txt_add_precio').value = precio;
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


  $('div#content_button_add_formula').on('click','div#button_open_frm_add_formula',function(){

          /* Limpia listColores */
          clean_Formula()

       /* Oculta formulario add Formula */
       $('div#frm_add_formula').removeClass('hidden')


           /* oculta otros formularios */
           $('div#frm_add_cliente').removeClass('hidden')
           $('div#frm_add_cliente').addClass('hidden')

        getFormulas().then(function(formulas){

          formulas = JSON.parse(formulas)

          /* Limpia lista */
                $('div#listFormula div.row').remove();

                for (i in formulas){

                    /* Aquí debo crear los objetos: list */
                    var row = document.createElement('div');
                        row.setAttribute('class','row');
                        row.setAttribute('data-id',formulas[i].Id);

                    var value = document.createElement('div');
                        value.setAttribute('class','value');
                        value.innerHTML = formulas[i].Descripcion;

                        /* Solo mostrará 10 fórmulas */
                        if(i>10){ row.setAttribute('class','row hidden');}

                        row.appendChild(value);
                        document.getElementById('listFormula').appendChild(row);
                }
        })

  })/* open frm formula */

  /* Hace visible lista de formulas */
  $('div#content_search_formula').on('focusin','input#txt_search_formula',function(){
      $('div#listFormula').removeClass('hidden')
  })
  /* Hace invisible lista de formulas */
  $('div#content_search_formula').on('focusout','input#txt_search_formula',function(){
        setTimeout(function(){
            $('div#listFormula').addClass('hidden')
        },200)
  })

  /* Buscar dentro de lista */
  $('div#content_search_formula').on('keypress','input#txt_search_formula',function(e){
         var texto = $(this).val()+e.key;
        /* Evita la acción cuando es la tecla Enter */
        if(e.keyCode==13){e.preventDefault();}

        busqueda_List(texto,'listFormula');
  });

  $('div#listFormula').on('click','div.row',function(){


                var id_formula = parseInt($(this).attr('data-id'));
                var descripcion_formula = $(this).text();
                document.getElementById('txt_search_formula').value = descripcion_formula;
                document.getElementById('formula_seleccionada').innerHTML = descripcion_formula;

                /* Relacionar listColores con la fórmula seleccionada */
                var formula = $.trim($(this).text());
                 $('div#listColores').attr('data-formula',formula);
                 $('div#listColores').attr('data-id_formula',id_formula);
                $('div#listColores').attr('data-medida',1);

                    /* Limpia listColores */
                 $('div#listColores div.row').remove();

                 getColores(id_formula).then(function(colores){

                        colores = JSON.parse(colores)
                    var precio = 0;

                         for(i in colores){
                             /* Peso gramo */
                                 var id_color = colores[i].Id_color;
                                 var peso = colores[i].Peso;
                            /* Recalcula precio */
                                 precio = precio + add_row_listColores(colores[i],id_color,peso);

                          }/* Fin --->  for */

                         /* Aplicar modulo 100 a precio */
                            if(precio>0){
                                 precio = parseInt(precio);
                                 var mod = 100 - precio%100;
                                 precio = precio + mod;
                             }
                        document.getElementById('txt_add_precio').value = precio;
                        document.getElementById('txt_add_medida').value = '1/64 Gln';
                 })


  })/* selecciona una formula */

  /* baja al datagrid una formula que se ha buscado */
    $('div#frm_add_formula').on('click','div#button_add_Formula_existente',function(){
        console.log('Bajando formula existente!');

        var id_formula = parseInt(document.getElementById('listColores').getAttribute('data-id_formula'));

         if(id_formula>0){

                     /* Primero almacena la formula */
                     /* Ingresar fórmula */
                    var descripcion = document.getElementById('formula_seleccionada').innerHTML;
                    var peso = document.getElementById('listColores').getAttribute('data-peso_formula');
                    var medida = '1/64 Gln';//document.getElementById('txtMedida_formula').value;

                     /* Baja la formula */
                        add_Formula();
                        $('div#frm_add_formula').addClass('hidden')
         }

    })/* add Formula existente */

    $('div#content_button_eliminar_formula').on('click','div#button_eliminar_formula',function(){

        var id_formula = parseInt(document.getElementById('listColores').getAttribute('data-id_formula'));

              $.post('ctrlformula',{A:9,Id_formula:id_formula},function(res){

                      console.log('Respuesta: '+res);

                             clean_Formula();
                             setTimeout(function(){
                                 document.getElementById('txt_search_formula').focus();
                             },1000);
              });
              /* Limpiar todo */

    })/* Eliminar formula */

  $('div#setterFormula').on('click','div#button_save_formula',function(){


          console.log('Formula permanente!');

          var id_formula = parseInt(document.getElementById('listColores').getAttribute('data-id_formula'));

            if(id_formula>0){

                        /* Ingresar fórmula */
                       var descripcion = document.getElementById('formula_seleccionada').innerHTML;
                       var peso = document.getElementById('listColores').getAttribute('data-peso_formula');
                       var medida = '1/64 Gln';//document.getElementById('txtMedida_formula').value;

                       /* Ingresa fórmula */
                       create_Formula(descripcion,peso,medida).then(function(r){

                            console.log('Id formula creada - retornado :',r);

                            /* actualiza id de formula */
                            $('div#listColores').attr('data-id_formula',r)
                            document.getElementById('txt_add_medida').value = '1/64 Gln'

                             /* Evita que guarde algunos colores en la formula anterior */
                             $('div#listColores div.row').each(function(){

                                 var medida = parseInt(document.getElementById('listColores').getAttribute('data-medida'));
                                 var peso = parseFloat($(this).children('div.peso').text())/medida;

                                 console.log('peso',peso);
                                 console.log('medida',medida);

                                 if(peso>0){/* Valores que se ingresarán a la fórmula */

                                     var id_producto = $(this).attr('data-id_producto');

                                     /* Ingresa colores a la fórmula */
                                     $.post('ctrlformula',{A:3,Id_producto:id_producto,Peso:peso},function(r){ });
                                 }
                             });

                       })



                        /* Montar la formula para que cuando le de en add bajé el id */
                        $('div.setting_formula').removeClass('hidden')
                        $('div.create_formula').addClass('hidden')

                       /* Recarga formulas */
                           setTimeout(function(){

                               getFormulas().then(function(formulas){

                                 formulas = JSON.parse(formulas)

                                 /* Limpia lista */
                                       $('div#listFormula div.row').remove();

                                       for (i in formulas){
                                           /* Aquí debo crear los objetos: list */
                                           var row = document.createElement('div');
                                               row.setAttribute('class','row');
                                               row.setAttribute('data-id',formulas[i].Id);
                                           var value = document.createElement('div');
                                               value.setAttribute('class','value');
                                               value.innerHTML = formulas[i].Descripcion;

                                               /* Solo mostrará 10 fórmulas */
                                               if(i>10){ row.setAttribute('class','row hidden');}

                                               row.appendChild(value);
                                               document.getElementById('listFormula').appendChild(row);
                                       }
                               })
                           },3000);

            }/* valida id formula */



  })/* Almacenar formula */

  $('div#setterFormula').on('click','div#button_formula_rapida',function(){

      console.log('Formula rapida!');

      var id_formula = parseInt(document.getElementById('listColores').getAttribute('data-id_formula'));

          if(id_formula>0){
              /* Montar la formula para que cuando le de en add bajé el id */
              document.getElementById('txt_add_medida').value = '1/64 Gln'

              $('div.setting_formula').removeClass('hidden')
              $('div.create_formula').addClass('hidden')

                  console.log('After add formula rapida!');
          }


  })/* Formula rapida */

  /* Hacer visible la lista de medidas para formulas  */
 $('div#frm_add_formula').on('focusin','input#txt_add_medida',function(){
     $('div#listUnidad_medida_formula').removeClass('hidden');txt_add_medida
 });
 /* Esconder lista de medidas para formulas  */
 $('div#frm_add_formula').on('focusout','input#txt_add_medida',function(){
     setTimeout(function(){
         $('div#listUnidad_medida_formula').addClass('hidden');
     },500);

 });

  $('div#listUnidad_medida_formula').on('click','div.row',function(){

    var cantidad = parseInt($(this).attr('data-cantidad'));
                   $('div#listColores').attr('data-medida',cantidad);

                  var medida = $(this).text();
                  document.getElementById('txt_add_medida').value = medida;

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

                         document.getElementById('txt_add_precio').value = precio;



  })/* Selecciona  */




    function clean_Formula(){
            /* Limpia listColores */
          $('div#listColores div.row').remove();
            $('div#listColores').attr('data-id_formula',0);
          document.getElementById('txt_search_formula').value = ''
          document.getElementById('formula_seleccionada').innerHTML = ''
          document.getElementById('txt_add_medida').value = ''
          document.getElementById('txt_add_precio').value = '0'

          $('div.setting_formula').removeClass('hidden')
          $('div.create_formula').addClass('hidden')

          document.getElementById('txtDescripcion_formula').value = ''
          document.getElementById('txtColor_formula').value = ''
          document.getElementById('txtGramos_formula').value = ''


          getFormulas().then(function(formulas){

            formulas = JSON.parse(formulas)

            /* Limpia lista */
                  $('div#listFormula div.row').remove();

                  for (i in formulas){

                      /* Aquí debo crear los objetos: list */
                      var row = document.createElement('div');
                          row.setAttribute('class','row');
                          row.setAttribute('data-id',formulas[i].Id);

                      var value = document.createElement('div');
                          value.setAttribute('class','value');
                          value.innerHTML = formulas[i].Descripcion;

                          /* Solo mostrará 10 fórmulas */
                          if(i>10){ row.setAttribute('class','row hidden');}

                          row.appendChild(value);
                          document.getElementById('listFormula').appendChild(row);
                  }
          })
    }

})

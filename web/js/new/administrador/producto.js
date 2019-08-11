function create_update_Producto_crud(){
                    /* Parámetros */
                          var id_producto = __('txt_descripcion_producto').getAttribute('data-id_producto');
                          var descripcion = __('txt_descripcion_producto').value;
                          var unidad_medida = __('txt_unidad_medida_producto').value;
                          var max_germinacion = __('txt_max_germinacion').value;
                          var max_extraccion = __('txt_max_extraccion').value;

                          require(['js/administrador/producto/ctrlProducto'])
                          .then(imports => {
                            console.log('imports', imports);
                            var producto = imports[0];
                                producto.create_update_Producto(id_producto,descripcion,unidad_medida,max_germinacion,max_germinacion);
                          })
                          .catch(console.log);
}

function read_Productos_crud(){

    require(['js/administrador/producto/ctrlProducto'])
    .then(imports => {

          var producto = imports[0];

              __('listProductos_crud').innerHTML = 'Buscando productos...';

              producto.read_Productos(0,0,0)
              .then(function (json_products) {/* Setea los productos en la lista */
                  load_productos(json_products);
              })/* read products */
    })
    .catch(console.log);

}/* read products crud */

function read_Productos_compras(){

      require(['js/administrador/producto/ctrlProducto'])
      .then(imports => {

            var producto = imports[0];

                __('listProductos_compra').innerHTML = 'Buscando productos...';

                producto.read_Productos(0,0,0)
                .then(function (json_products) {/* Setea los productos en la lista */
                    load_productos(json_products);
                })/* read products */
      })
      .catch(console.log);

}/* read products compras */

function read_Productos_ventas(){

      require(['js/administrador/producto/ctrlProducto'])
      .then(imports => {

        var producto = imports[0];

            __('listProductos_venta').innerHTML = 'Buscando productos...';

            producto.read_Productos(0,0,0)
            .then(function (json_products) {/* Setea los productos en la lista */
                load_productos(json_products);
            })/* read products */
      })
      .catch(console.log);

}/* read products ventas */



function select_row_producto(row){

            /* get values from row data */
                      var id_producto = row.getAttribute('data-id_producto');
                      var descripcion =row.getElementsByClassName('descripcion')[0].innerHTML;
                      var unidad = row.getAttribute('data-unidad_medida');
                      var max_germinacion = row.getAttribute('data-max_germinacion');
                      var max_extraccion = row.getAttribute('data-max_extraccion');

                      __('txt_descripcion_producto').setAttribute('data-id_producto',id_producto);
                      __('txt_descripcion_producto').value = descripcion;
                      __('txt_unidad_medida_producto').value = unidad;
                      __('txt_max_germinacion').value = max_germinacion;
                      __('txt_max_extraccion').value = max_extraccion;

                      __('msgOperationProducto').innerHTML = 'Editar producto';

}/* selecciona fila de producto  */

function set_listProducts(json_products,list){
          __(list).innerHTML = '';
        for(i in json_products){
                    var row = document.createElement('div');
                        row.setAttribute('class','row');
                        row.setAttribute('data-id_producto',json_products[i].Id_producto);
                        row.setAttribute('data-unidad_medida',json_products[i].Unidad_medida);
                        row.setAttribute('data-max_germinacion',json_products[i].max_Germinacion);
                        row.setAttribute('data-max_extraccion',json_products[i].max_Extraccion);
                        row.onclick =  function() {select_row_producto(this)};

                            /* Descripcion */
                    var descripcion = document.createElement('div');
                        descripcion.setAttribute('class','descripcion');
                        descripcion.innerHTML = json_products[i].Descripcion;
                    /* add columns to row  */
                        row.appendChild(descripcion);
                        document.getElementById(list).appendChild(row);
          }/* for json products */

}/* set products in list */

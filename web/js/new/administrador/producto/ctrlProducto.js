
//module.requirement = ['module2', 'module3']

module.prepare = function(imports) {

/*  this.exports.fnB = () => {
    console.log('executed fnB() in module1 defined when prepare');
  };
  var module2 = imports[0];
  var module3 = imports[1];
  module2.fnB('from prepare() in module1');
  module3.fnB('from prepare() in module1');  */
}

module.exports.create_update_Producto = (id_producto,descripcion,unidad_medida,max_germinacion,max_extraccion) => {

            let control =  validate_fields('setterProducto');/* setterCliente */

            console.log('create_update_Producto crud: '+ control+ ' final ');

            if(control>0){return;}/* Existe almenos un campo vacío */

                        console.log('id producto: '+id_producto+' descripcion: '+descripcion+
                                    ' unidad medida: '+unidad_medida+' germinacion: '+max_germinacion+' extraccion: '+max_extraccion);

                              /*  Create product */
                                 $.post('ctrlproduct',{A:1,
                                                       Id_producto:id_producto,
                                                       Descripcion:descripcion,
                                                       Unidad_medida:unidad_medida,
                                                       max_Germinacion:max_germinacion,
                                                       max_Extraccion:max_extraccion},
                                         function(pmt_id_producto){

                                               console.log("Id producto: " + pmt_id_producto);

                                               $.notify("El producto ha sido registrado!", "success");

                                                  /* Clean fields*/
                                                     console.log('Antes de limpiar');
                                                     module.exports.read_Productos(0,0,0);
                                                     console.log('Despues de leer!');
                                                     module.exports.clean_Producto();
                                                     console.log('Despues de limpiar');
                                 });/* Create producto */

  }/* create update productos */


module.exports.read_Productos = (pmt_start,pmt_control,pmt_section) => {

                          /* Read  customers */
                          let json = {};

                          const promise = new Promise(function (resolve, reject) {

                                        setTimeout(function() {

                                                  $.post('ctrlproduct',{A:2,Control:pmt_control},function(res){
                                                      if(res != ''){
                                                        json = JSON.parse(res);
                                                      }
                                                      resolve(json)
                                                });
                                        }, 1000);/* setTimeout */

                                        if (!json) {
                                          reject(new Error('No existen productos!'))
                                        }
                          })/* promise */

                          return promise

}/* read productos */

module.exports.delete_Producto = () => {

      let id_producto = parseInt(__('txt_descripcion_producto').getAttribute('data-id_producto'));

      if(id_producto>0){
                    console.log('Eliminar... id producto: '+id_producto);

                  __('resultOperationProducto').innerHTML = 'Eliminando producto...';

                  $.post('ctrlproduct',{Id_producto: id_producto,A: 4}, function(r){/* Callback ...   */

                             setTimeout(function(){/*  */
                                     __('resultOperationProducto').innerHTML = 'Producto eliminado satisfactoriamente!';
                                     /* Clean fields*/
                                        console.log('Antes de limpiar');
                                        module.exports.read_Productos(0,0,0);
                                        module.exports.clean_Producto();
                                        console.log('Despues de limpiar');

                                     setTimeout(function(){
                                           __('resultOperationProducto').innerHTML = '';/* clean result */
                                      //     read_Clientes();/* Actualiza lista de clientes */
                                     },1500);
                             },1500);
                  });

      }else {/* No se ha seleccionado un cliente para eliminar*/
                    __('resultOperationProducto').innerHTML = 'Necesitas seleccionar un producto para eliminar!';
                      setTimeout(function(){
                            __('resultOperationProducto').innerHTML = '';
                      },1500);
      }

}/* remove producto */

module.exports.clean_Producto = () => {
    /* clean */
        clean_fields('setterProducto');
        __('txt_descripcion_producto').value = '';
        __('txt_descripcion_producto').setAttribute('data-id_producto',0);
        __('msgOperationProducto').innerHTML = 'Nuevo producto';
    /* info */
        // __('info_fecha_ingreso').innerHTML ='';
        // __('info_vfacturas').innerHTML ='';
        // __('info_facturas').innerHTML = '';
        // __('info_deuda').innerHTML = '';
        // __('info_estado').innerHTML ='';
}

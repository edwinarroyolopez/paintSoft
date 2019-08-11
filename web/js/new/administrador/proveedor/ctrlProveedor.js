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

module.exports.create_update_Provider = () => {

            let control =  validate_fields('setterProvider');/* setterCliente */


            if(control>0){return;}/* Existe almenos un campo vacío */

            /* Parámetros */
                var id_provider = parseInt(__('txt_nombre_proveedor').getAttribute('data-id_provider'));
                var nombre = __('txt_nombre_proveedor').value;
                var documento = __('txt_documento_proveedor').value;
                var departamento = __('txt_departamento_proveedor').value;
                var ciudad = __('txt_ciudad_proveedor').value;
                var direccion = __('txt_direccion_proveedor').value;
                var telefono = __('txt_telefono_proveedor').value;

                /*  Create provider */
                   $.post('ctrlprovider',{A:1,
                                         Id_provider:id_provider,
                                         Name:nombre,
                                         Document:documento,
                                         Departament:departamento,
                                         City:ciudad,
                                         Address:direccion,
                                         Phone:telefono},
                           function(pmt_id_provider){

                                    if(pmt_id_provider<0){/* Documento repetido */
                                    //      $.notify('Has repetido el número de documento');
                                          $.notify("El número de documento ya se encuentra registrado!", "error");
                                    }else{/* Update or save */
                                                  if(id_provider>0){/* Actualiza */
                                                          /* Cómo modifico la fila */
                                                          $.notify("Los datos del proveedor se han actualizado!", "success");
                                                  }else{/* Almacena */
                                                          $.notify("El proveedor ha sido registrado!", "success");
                                                  }/* id provider > 0 */
                                    }

                                    on_read_Providers();
                                    module.exports.clean_Provider();

                   });/* Create provider */

                   /* Clean fields

                      read_Clientes();
                      clean_fields('setterCliente');

                   */


  }/* create update proveedor */


  module.exports.read_Providers = (pmt_control) => {

            /* Read  providers */
            let json = {};

            const promise = new Promise(function (resolve, reject) {

                          setTimeout(function() {
                                  $.post('ctrlprovider',{A:2,Control:pmt_control},function(res){
                                          if(res != ''){
                                            json = JSON.parse(res);
                                          }
                                         resolve(json)
                                  });
                          }, 1000);

                          if (!json) {
                            reject(new Error('No existen proveedores!'))
                          }
            })/* promise */


            return promise

  }/* read proveedors */


console.log('Ejecución desde controlador proveedor!');

module.exports.delete_Provider = () => {

      let id_provider = parseInt(__('txt_buscador_provider').getAttribute('data-id_provider'));

      console.log('Eliminar... id_proveedor: '+id_provider);
      if(id_provider>0){

                  __('resultOperationProvider').innerHTML = 'Eliminando proveedor...';

                  $.post('ctrlprovider',{Id_provider: id_provider,A: 4}, function(r){/* Callback ...   */
                                 console.log('estado: '+r);

                             setTimeout(function(){/*  */
                                     __('resultOperationProvider').innerHTML = 'Cliente eliminado satisfactoriamente!';

                                      module.exports.clean_Provider();
                                      setTimeout(function(){
                                           __('resultOperationProvider').innerHTML = '';/* clean result */
                                           on_read_Providers();/* Actualiza lista de proveedors */
                                     },1500);
                             },1500);
                  });

      }else {/* No se ha seleccionado un proveedor para eliminar*/
                    __('resultOperationCliente').innerHTML = 'Necesitas seleccionar un proveedor para eliminar!';
                      setTimeout(function(){
                            __('resultOperationCliente').innerHTML = '';
                      },1500);
      }

}/* remove proveedor */


module.exports.clean_Provider = () => {

    /* clean */
        clean_fields('setterProvider');
        __('txt_nombre_proveedor').setAttribute('data-id_provider',0);
        __('txt_buscador_provider').setAttribute('data-id_provider',0);
        __('txt_buscador_provider').value = '';
        __('msgOperationProvider').innerHTML = 'Nuevo proveedor';
        __('txt_nombre_proveedor').focus();

        /* info */

        // __('info_fecha_ingreso').innerHTML ='';
        // __('info_vfacturas').innerHTML ='';
        // __('info_facturas').innerHTML = '';
        // __('info_deuda').innerHTML = '';
        // __('info_estado').innerHTML ='';

}

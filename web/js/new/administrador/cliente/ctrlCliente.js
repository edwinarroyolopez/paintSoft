
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

module.exports.create_update_Customer = () => {

            let control =  validate_fields('setterCustomer');/* setterCliente */

            console.log('Control: '+ control);

            if(control>0){return;}/* Existe almenos un campo vacío */

            /* Parámetros */
                var id_customer = parseInt(__('txt_nombre_cliente').getAttribute('data-id_customer'));
                var nombre = __('txt_nombre_cliente').value;
                var documento = __('txt_documento_cliente').value;
                var departamento = __('txt_departamento_cliente').value;
                var ciudad = __('txt_ciudad_cliente').value;
                var direccion = __('txt_direccion_cliente').value;
                var telefono = __('txt_telefono_cliente').value;

                /*  Create customer */
                   $.post('ctrlcustomer',{A:1,
                                         Id_customer:id_customer,
                                         Name:nombre,
                                         Document:documento,
                                         Departament:departamento,
                                         City:ciudad,
                                         Address:direccion,
                                         Phone:telefono},
                           function(pmt_id_customer){

                                    if(pmt_id_customer<0){/* Documento repetido */
                                    //      $.notify('Has repetido el número de documento');
                                          $.notify("El número de documento ya se encuentra registrado!", "error");

                                    }else{/* Update or save */
                                                  if(id_customer>0){/* Actualiza */
                                                          /* Cómo modifico la fila */
                                                         $.notify("Los datos del cliente se han actualizado!", "success");
                                                  }else{/* Almacena */
                                                          $.notify("El cliente ha sido registrado!", "success");
                                                  }/* id customer > 0 */
                                    }

                                    on_read_Customers();
                                    module.exports.clean_Customer();
                   });/* Create customer */

  }/* create update cliente */


  module.exports.read_Customers = (pmt_control) => {

              /* Read  customers */
              let json = {};

              const promise = new Promise(function (resolve, reject) {

                            setTimeout(function() {
                                    $.post('ctrlcustomer',{A:2,Control:pmt_control},function(res){
                                          if(res != ''){
                                            json = JSON.parse(res);
                                          }
                                           resolve(json)
                                    });
                            }, 1000);/* setTimeout */

                            if (!json) {
                              reject(new Error('No existen clientes!'))
                            }
              })/* promise */

              return promise

  }/* read clientes */


console.log('Ejecución desde controlador cliente!');

module.exports.delete_Customer = () => {

      let id_customer = parseInt(__('txt_buscador_customer').getAttribute('data-id_customer'));

      console.log('Eliminar... id_cliente: '+id_customer);
      if(id_customer>0){


                  __('resultOperationCustomer').innerHTML = 'Eliminando cliente...';

                  $.post('ctrlcustomer',{Id_customer: id_customer,A: 4}, function(r){/* Callback ...   */
                                 console.log('estado: '+r);

                             setTimeout(function(){/*  */
                                     __('resultOperationCustomer').innerHTML = 'Cliente eliminado satisfactoriamente!';

                                      module.exports.clean_Customer();
                                      setTimeout(function(){
                                           __('resultOperationCustomer').innerHTML = '';/* clean result */
                                           on_read_Customers();/* Actualiza lista de clientes */
                                     },1500);
                             },1500);
                  });

      }else {/* No se ha seleccionado un cliente para eliminar*/
                    __('resultOperationCliente').innerHTML = 'Necesitas seleccionar un cliente para eliminar!';
                      setTimeout(function(){
                            __('resultOperationCliente').innerHTML = '';
                      },1500);
      }

}/* remove cliente */


module.exports.clean_Customer = () => {

    /* clean */
        clean_fields('setterCustomer');
        __('txt_nombre_cliente').setAttribute('data-id_customer',0);
        __('txt_buscador_customer').setAttribute('data-id_customer',0);
        __('txt_buscador_customer').value = '';
        __('msgOperationCustomer').innerHTML = 'Nuevo cliente';
        __('txt_nombre_cliente').focus();

        /* info */

        // __('info_fecha_ingreso').innerHTML ='';
        // __('info_vfacturas').innerHTML ='';
        // __('info_facturas').innerHTML = '';
        // __('info_deuda').innerHTML = '';
        // __('info_estado').innerHTML ='';

}

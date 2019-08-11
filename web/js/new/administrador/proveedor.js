
function select_row_data_provider(row){

            /* get values from row data */
                      var id_provider = row.getAttribute('data-id_provider');
                      var name = row.getElementsByClassName('name')[0].innerHTML;
                      var _document =row.getElementsByClassName('document')[0].innerHTML;
                      var departament = row.getAttribute('data-departament');
                      var city = row.getAttribute('data-city');
                      var address = row.getAttribute('data-address');
                      var phone = row.getAttribute('data-phone');

                  /* set values to info provider */
                      __('txt_nombre_proveedor').setAttribute('data-id_provider',id_provider);
                      __('txt_buscador_provider').setAttribute('data-id_provider',id_provider);
                      __('txt_buscador_provider').value = name;
                      __('txt_nombre_proveedor').value = name;
                      __('txt_documento_proveedor').value = _document;
                      __('txt_departamento_proveedor').value = departament;
                      __('txt_ciudad_proveedor').value = city;
                      __('txt_direccion_proveedor').value = address;
                      __('txt_telefono_proveedor').value = phone;
                      __('msgOperationProvider').innerHTML = 'Editar proveedor';
  }/* List customers */


  /* Selected row list */

  function select_item_customer(row){

                console.log('Has seleccionado una fila de clientes!');

              /* get values from row data */
                        var id_customer = row.getAttribute('data-id_customer');
                        var name = row.getElementsByClassName('name')[0].innerHTML;
                        var _document =row.getElementsByClassName('document')[0].innerHTML;
                        var departament = row.getAttribute('data-departament');
                        var city = row.getAttribute('data-city');
                        var address = row.getAttribute('data-address');
                        var phone = row.getAttribute('data-phone');

                    /* set values to info customer */
                        __('txt_search_customer_for_sale').setAttribute('data-id_customer',id_customer);
                        __('txt_search_customer_for_sale').value = name;
                        __('info_document_customer').innerHTML = _document;
                        __('info_departament_customer').innerHTML = departament;
                        __('info_city_customer').innerHTML = city;
                        __('info_address_customer').innerHTML = address;
                        __('f_phone_customer').innerHTML = phone;
    }
;

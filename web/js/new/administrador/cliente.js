
function select_row_data_customer(row){

            /* get values from row data */
                      var id_customer = row.getAttribute('data-id_customer');
                      var name = row.getElementsByClassName('name')[0].innerHTML;
                      var _document =row.getElementsByClassName('document')[0].innerHTML;
                      var departament = row.getAttribute('data-departament');
                      var city = row.getAttribute('data-city');
                      var address = row.getAttribute('data-address');
                      var phone = row.getAttribute('data-phone');

                  /* set values to info customer */
                      __('txt_nombre_cliente').setAttribute('data-id_customer',id_customer);
                      __('txt_buscador_customer').setAttribute('data-id_customer',id_customer);
                      __('txt_nombre_cliente').value = name;
                      __('txt_documento_cliente').value = _document;
                      __('txt_departamento_cliente').value = departament;
                      __('txt_ciudad_cliente').value = city;
                      __('txt_direccion_cliente').value = address;
                      __('txt_telefono_cliente').value = phone;
                      __('msgOperationCustomer').innerHTML = 'Editar cliente';
  }

  /* List customers */

  function create_list_customers(start,json_customers){

                for(i=start; i<json_customers.length; i++){

                                var item = document.createElement('div');
                                    item.setAttribute('class','item');
                                    item.setAttribute('data-id_customer',json_customers[i].Id_customer);
                                    item.setAttribute('data-departament',json_customers[i].Departament);
                                    item.setAttribute('data-city',json_customers[i].City);
                                    item.setAttribute('data-address',json_customers[i].Address);
                                    item.setAttribute('data-phone',json_customers[i].Phone);
                                    item.onclick =  function() {select_item_customer(this)};

                                          if(i>=10){
                                                item.setAttribute('class','item hidden');
                                          }

                                                /* Name */
                                          var name = document.createElement('div');
                                                name.setAttribute('class','name');
                                                name.innerHTML = json_customers[i].Name;
                                                /* Document */
                                          var _document = document.createElement('div');
                                                _document.setAttribute('class','document');
                                                _document.innerHTML = json_customers[i].Document;

                                  /* add columns to row data */
                                        item.appendChild(name);
                                        item.appendChild(_document);
                                  /* add row data to data grid */
                                  document.getElementById('listCustomer').appendChild(item);

                  }/* for json customers */

  }

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

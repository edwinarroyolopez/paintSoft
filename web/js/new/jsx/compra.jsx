function inicializar_compra(){

              var Cliente = React.createClass({

                                  componentWillMount:function() {/* Se lanza antes de que se renderice el componente */
                                  },
                                  getInitialState: function() {
                                        return { customerList: 'cargando ...' };
                                  },
                                  create_update_Customer:function(){
                                        /* Almacenas un Cliente */
                                                require(['js/administrador/cliente/ctrlCliente'])
                                                .then(imports => {
                                                  console.log('imports', imports);
                                                  var customer = imports[0];
                                                      customer.create_update_Customer();
                                                })
                                                .catch(console.log);
                                    },
                                    show_listCustomers:function(e){  __('listCustomers').setAttribute('class','list'); },
                                    hidden_listCustomers:function(e){ setTimeout(function(){ __('listCustomers').setAttribute('class','list hidden');},400);},

                                    clean_Customer:function(){

                                          /* Clean cliente */
                                                  require(['js/administrador/cliente/ctrlCliente'])
                                                  .then(imports => {
                                                    console.log('imports', imports);
                                                    var customer = imports[0];
                                                        customer.clean_Customer();
                                                  })
                                                  .catch(console.log);
                                    },
                                    remove_Customer:function(){
                                          console.log('Eliminando... cliente!');
                                          /* Remove producto */
                                                  require(['js/administrador/cliente/ctrlCliente'])
                                                  .then(imports => {
                                                    console.log('imports', imports);
                                                    var customer = imports[0];
                                                        customer.delete_Customer();
                                                          on_read_Customers();
                                                  })
                                                  .catch(console.log);
                                    },
                                    searh_Customers:function(e){

                                                var filter = document.getElementById('txt_searcher_customers').value+e.key;

                                                 if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                                                     e.preventDefault();
                                                 }

                                                 /* Retroceso: Se hace búsqueda con un caracter menos */
                                                     if(e.keyCode==8){
                                                              filter = document.getElementById('txt_searcher_customers').value;
                                                              filter = filter.substring(0,filter.length - 1);/* Elimina última letra */
                                                     }
                                                    /*Busca filtro en cada fila de la lista */
                                                  search_in_datagrid('div#dataCustomers div.row_data',filter,10);

                                    },

                                     /* Se lanza despues de renderizado el componente */
                                     componentDidMount:function(){/* read customers */

                                            on_read_Products();

                                     },
                                  render:function(){
                                      return(<div>
                                                      <div className="content" id="content_buy">

                                                        <div className="content_crud" id="crudCompra">

                                                                <div className="content_search">
                                                                    <div className="searcher">
                                                                        <div className="fieldSearch">
                                                                            <input className="txtSearch" data-id_customer="0" id="txt_buscador_customer" placeholder="..." onFocus={this.show_listCustomers} onBlur={this.hidden_listCustomers}></input>
                                                                        </div>
                                                                        <div className="label">Buscar cliente</div>
                                                                        <div className="list hidden" id="listCustomers"></div>
                                                                    </div>
                                                                </div>

                                                                <div className="driver">
                                                                      <div className="operations">
                                                                        <div className="add" id="addGrupo" onClick={this.clean_Customer}></div>
                                                                        <div className="remove" id="removeGrupo" onDoubleClick={this.remove_Customer}></div>
                                                                      </div>
                                                                      <div className="profile_info">
                                                                        <div className="info">
                                                                          <div className="label">customers</div>
                                                                          <div className="value" id="info_customers">10</div>
                                                                        </div>
                                                                        <div className="info">
                                                                          <div className="label">V. Grupo</div>
                                                                          <div className="value" id="info_vfacturas"></div>
                                                                        </div>
                                                                        <div className="info">
                                                                          <div className="label">Estado</div>
                                                                          <div className="value" id="info_estado"></div>
                                                                        </div>
                                                                        <div className="info">
                                                                          <div className="label">Estado</div>
                                                                          <div className="value" id="info_estado"></div>
                                                                        </div>
                                                                        <div className="info">
                                                                          <div className="label">Estado</div>
                                                                          <div className="value" id="info_estado"></div>
                                                                        </div>
                                                                      </div>
                                                                  </div>


                                                                  <div className="setter" id="setterCompra">
                                                                          <div className="head">
                                                                            <div className="label" id="msgOperationCustomer">Nueva compra</div>
                                                                          </div>
                                                                                <div className="content_fields">
                                                                                      <div className="field fieldList">
                                                                                          <div className="label">
                                                                                                <div>Producto</div>
                                                                                          </div>
                                                                                          <div className="textbox">
                                                                                              <input id="txt_nombre_cliente" type="text" data-id_customer="0"/>
                                                                                          </div>
                                                                                          <div className="list" id="listProductos">
                                                                                              <div className="row" data-id_customer="64" data-departament="Tolima" data-city="Ibague " data-address="Oficina Central " data-phone="3112023832">
                                                                                                <div className="name">Jorge Mayorga  </div>
                                                                                                <div className="document">79340613</div>
                                                                                              </div>
                                                                                          </div>
                                                                                      </div>
                                                                                      <div className="field fieldList">
                                                                                          <div className="label">
                                                                                                <div>Proveedor</div>
                                                                                          </div>
                                                                                          <div className="textbox">
                                                                                              <input id="txt_documento_cliente" type="text"/>
                                                                                          </div>
                                                                                          <div className="list" id="listProveedor">
                                                                                              <div className="row" data-id_customer="64" data-departament="Tolima" data-city="Ibague " data-address="Oficina Central " data-phone="3112023832">
                                                                                                <div className="name">Jorge Mayorga  </div>
                                                                                                <div className="document">79340613</div>
                                                                                              </div>
                                                                                          </div>
                                                                                      </div>
                                                                                </div>

                                                                                <div className="content_fields">
                                                                                    <div className="field">
                                                                                        <div className="label">
                                                                                              <div>Fecha cosecha</div>
                                                                                        </div>
                                                                                        <div className="textbox">
                                                                                            <input id="txt_departamento_cliente" type="text"/>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="field">
                                                                                        <div className="label">
                                                                                              <div>Fecha ingreso</div>
                                                                                        </div>
                                                                                        <div className="textbox">
                                                                                            <input id="txt_ciudad_cliente" type="text"/>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="content_fields">
                                                                                    <div className="field">
                                                                                        <div className="label">
                                                                                              <div>Cantidad</div>
                                                                                        </div>
                                                                                        <div className="textbox">
                                                                                            <input id="txt_direccion_cliente" type="text"/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="field">
                                                                                        <div className="label">
                                                                                              <div>Precio gramo</div>
                                                                                        </div>
                                                                                        <div className="textbox">
                                                                                            <input id="txt_telefono_cliente" type="text"/>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="content_fields">
                                                                                    <div className="field">
                                                                                        <div className="label">
                                                                                              <div>Total</div>
                                                                                        </div>
                                                                                        <div className="textbox">
                                                                                            <input id="txt_telefono_cliente" type="text"/>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                          <div className="content_fields">
                                                                                <div className="result">
                                                                                    <div className="label" id="resultOperationCustomer"></div>
                                                                                </div>
                                                                                <div className="content_button">
                                                                                  <div className="button" id="btn_almacenar_customer" onClick={this.create_update_Customer}>
                                                                                    <div className="label">Almacenar</div>
                                                                                  </div>
                                                                                </div>
                                                                          </div>
                                                                  </div>
                                                        </div>
                                                      </div>
                                                    
                                              </div>
                                          );

                                  }
                              });
                              React.render(<Cliente/>,document.getElementById('center'));
}

function set_listClientes(json_customers){
                __('listCustomers').innerHTML = '';
                for(i=0; i<json_customers.length; i++){

                                    var row = document.createElement('div');
                                        row.setAttribute('class','row');
                                        row.setAttribute('data-id_customer',json_customers[i].Id_customer);
                                        row.setAttribute('data-departament',json_customers[i].Departament);
                                        row.setAttribute('data-city',json_customers[i].City);
                                        row.setAttribute('data-address',json_customers[i].Address);
                                        row.setAttribute('data-phone',json_customers[i].Phone);
                                        row.onclick =  function() {select_row_data_customer(this)};

                                            if(i>=10){
                                                  row.setAttribute('class','row hidden');
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
                                          row.appendChild(name);
                                          row.appendChild(_document);
                                      /* add row data to data grid */
                                      __('listCustomers').appendChild(row);

                      }/* for json customers */
}/* set listClientes */

function on_read_Products(){

  console.log('on read productos - compra.jsx');

  require(['js/administrador/producto/ctrlProducto'])
  .then(imports => {
    console.log('imports', imports);
    var producto = imports[0];

        __('listProductos').innerHTML = 'Buscando productos...';

        producto.read_Productos(0,0,0)
        .then(function (res) {/* Setea los productos en la lista */
           console.log('products '+JSON.stringify(res));
        })/* read products */
  })
  .catch(console.log);


}/* on read customers */

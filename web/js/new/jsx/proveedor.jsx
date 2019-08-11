//   componentWillMount() {}/* Se lanza antes de que se renderice el componente */
//  componentDidMount(){} /* Se lanza despues de renderizado el componente */
//  shouldComponentUpdate(){}/*  Devuelve con un valor si el componente debería actualizarse */
//  componentWillUnMount(){}/*   Se lanza antes de que el componente se elimine. */

function inicializar_proveedor(){

              var Proveedor = React.createClass({

                                  componentWillMount:function() {/* Se lanza antes de que se renderice el componente */
                                  },
                                  getInitialState: function() {
                                        return { providerList: 'cargando ...' };
                                  },
                                  create_update_Provider:function(){

                                        /* Almacenas un Proveedor */
                                                require(['js/administrador/proveedor/ctrlProveedor'])
                                                .then(imports => {
                                                  console.log('imports', imports);
                                                  var provider = imports[0];
                                                      provider.create_update_Provider();
                                                })
                                                .catch(console.log);
                                    },
                                    show_listProviders:function(e){  __('listProviders').setAttribute('class','list'); },
                                    hidden_listProviders:function(e){ setTimeout(function(){ __('listProviders').setAttribute('class','list hidden');},400);},

                                    clean_Provider:function(){

                                          /* Clean proveedor */
                                                  require(['js/administrador/proveedor/ctrlProveedor'])
                                                  .then(imports => {
                                                    console.log('imports', imports);
                                                    var provider = imports[0];
                                                        provider.clean_Provider();
                                                  })
                                                  .catch(console.log);
                                    },
                                    remove_Provider:function(){
                                          console.log('Eliminando... proveedor!');
                                          /* Remove producto */
                                                  require(['js/administrador/proveedor/ctrlProveedor'])
                                                  .then(imports => {
                                                    console.log('imports', imports);
                                                    var provider = imports[0];
                                                        provider.delete_Provider();
                                                  })
                                                  .catch(console.log);
                                    },

                                     /* Se lanza despues de renderizado el componente */
                                     componentDidMount:function(){/* read providers */
                                        on_read_Providers();
                                     },
                                     read_all_Providers:function(){

                                                  var load = parseInt(document.getElementById('txt_searcher_providers').getAttribute('data-load_providers'));

                                                        if(load==0){/* No se ha cargado */

                                                                  /* Load all providers */
                                                                    load_provider_view(10,1,0);

                                                                     /* Change state load providers */
                                                                    document.getElementById('txt_searcher_providers').setAttribute('data-load_providers',1);
                                                        }/* Load = 0 */
                                     },
                                  render:function(){
                                      return(<div>
                                                      <div className="content" id="content_provider">

                                                        <div className="content_crud" id="crudProvider">

                                                                <div className="content_search">
                                                                    <div className="searcher">
                                                                        <div className="fieldSearch">
                                                                            <input className="txtSearch" data-id_provider="0" id="txt_buscador_provider" placeholder="..." onFocus={this.show_listProviders} onBlur={this.hidden_listProviders}></input>
                                                                        </div>
                                                                        <div className="label">Buscar proveedor</div>
                                                                        <div className="list hidden" id="listProviders"></div>
                                                                    </div>
                                                                </div>

                                                                <div className="driver">
                                                                      <div className="operations">
                                                                        <div className="add" onClick={this.clean_Provider}></div>
                                                                        <div className="remove" onDoubleClick={this.remove_Provider}></div>
                                                                      </div>
                                                                      <div className="profile_info">
                                                                        <div className="info">
                                                                          <div className="label">providers</div>
                                                                          <div className="value" id="info_providers">10</div>
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


                                                                  <div className="setter" id="setterProvider">
                                                                          <div className="head">
                                                                            <div className="label" id="msgOperationProvider">Nuevo proveedor</div>
                                                                          </div>
                                                                                <div className="content_fields">
                                                                                      <div className="field">
                                                                                          <div className="label">
                                                                                                <div>Nombre</div>
                                                                                          </div>
                                                                                          <div className="textbox">
                                                                                              <input id="txt_nombre_proveedor" type="text" data-id_provider="0"/>
                                                                                          </div>
                                                                                      </div>
                                                                                      <div className="field">
                                                                                          <div className="label">
                                                                                                <div>Documento</div>
                                                                                          </div>
                                                                                          <div className="textbox">
                                                                                              <input id="txt_documento_proveedor" type="text"/>
                                                                                          </div>
                                                                                      </div>
                                                                                </div>

                                                                                <div className="content_fields">
                                                                                    <div className="field">
                                                                                        <div className="label">
                                                                                              <div>Departamento</div>
                                                                                        </div>
                                                                                        <div className="textbox">
                                                                                            <input id="txt_departamento_proveedor" type="text"/>
                                                                                        </div>
                                                                                    </div>

                                                                                    <div className="field">
                                                                                        <div className="label">
                                                                                              <div>Ciudad</div>
                                                                                        </div>
                                                                                        <div className="textbox">
                                                                                            <input id="txt_ciudad_proveedor" type="text"/>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="content_fields">
                                                                                    <div className="field">
                                                                                        <div className="label">
                                                                                              <div>Direccion</div>
                                                                                        </div>
                                                                                        <div className="textbox">
                                                                                            <input id="txt_direccion_proveedor" type="text"/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="field">
                                                                                        <div className="label">
                                                                                              <div>Teléfono</div>
                                                                                        </div>
                                                                                        <div className="textbox">
                                                                                            <input id="txt_telefono_proveedor" type="text"/>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                          <div className="content_fields">
                                                                                <div className="result">
                                                                                    <div className="label" id="resultOperationProvider"></div>
                                                                                </div>
                                                                                <div className="content_button">
                                                                                  <div className="button" id="btn_almacenar_provider" onClick={this.create_update_Provider}>
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
                              React.render(<Proveedor/>,document.getElementById('center'));
}

function set_listProveedores(json_providers){
                __('listProviders').innerHTML = '';
                for(i=0; i<json_providers.length; i++){

                          var row = document.createElement('div');
                              row.setAttribute('class','row');
                              row.setAttribute('data-id_provider',json_providers[i].Id_provider);
                              row.setAttribute('data-departament',json_providers[i].Departament);
                              row.setAttribute('data-city',json_providers[i].City);
                              row.setAttribute('data-address',json_providers[i].Address);
                              row.setAttribute('data-phone',json_providers[i].Phone);
                              row.onclick =  function() {select_row_data_provider(this)};

                                  if(i>=10){
                                        row.setAttribute('class','row hidden');
                                  }
                                        /* Name */
                                  var name = document.createElement('div');
                                      name.setAttribute('class','name');
                                      name.innerHTML = json_providers[i].Name;
                                        /* Document */
                                  var _document = document.createElement('div');
                                        _document.setAttribute('class','document');
                                        _document.innerHTML = json_providers[i].Document;

                          /* add columns to row data */
                                row.appendChild(name);
                                row.appendChild(_document);
                            /* add row data to data grid */
                            __('listProviders').appendChild(row);

                  }/* for json providers */
}

function on_read_Providers(){

        require(['js/administrador/proveedor/ctrlProveedor'])
        .then(imports => {

              var provider = imports[0];

                __('listProviders').innerHTML = 'Buscando proveedores...';

                provider.read_Providers(1)
                .then(function (res) {/* Setea los proveedores en la lista */
                    set_listProveedores(res);
                })/* read providers */
        })
        .catch(console.log);
}/* on read providers */

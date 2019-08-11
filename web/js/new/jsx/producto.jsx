
function inicializar_producto(){

              var Producto = React.createClass({
                                  addProduct:function(){
                                              /* Hace visible el formulario addProducto */
                                              $('div#center div#setter').removeClass('hidden');
                                              $('div#center div#transparencia').removeClass('hidden');
                                    },
                                  close_addProduct:function(){
                                              /* Hace visible el formulario addProducto */
                                              $('div#center div#setter').addClass('hidden');
                                              $('div#center div#transparencia').addClass('hidden');
                                    },
                                    /* Se lanza despues de renderizado el componente */
                                    componentDidMount:function(){/* read products */
                                          read_Productos_crud();
                                    },
                                    create_update_Producto:function(){/* Almacenas un producto */
                                        create_update_Producto_crud();
                                    },
                                    show_listProducts:function(e){
                                          __('listProductos').setAttribute('class','list');
                                    },
                                    hidden_listProducts:function(e){
                                            setTimeout(function(){
                                                __('listProductos').setAttribute('class','list hidden');
                                            },400)
                                    },
                                    searh_Products:function(e){

                                                  var filter = document.getElementById('txt_buscador_producto').value+e.key;

                                                   if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                                                       e.preventDefault();
                                                   }

                                                   /* Retroceso: Se hace búsqueda con un caracter menos */
                                                       if(e.keyCode==8){
                                                                filter = document.getElementById('txt_buscador_producto').value;
                                                                filter = filter.substring(0,filter.length - 1);/* Elimina última letra */
                                                       }

                                                      /*Busca filtro en cada fila de la lista */
                                                    search_in_datagrid('div#dataProductos div.row_data',filter,5);

                                  },
                                  clean_Producto:function(){
                                        /* Clean producto */
                                                require(['js/administrador/producto/ctrlProducto'])
                                                .then(imports => {
                                                  console.log('imports', imports);
                                                  var producto = imports[0];
                                                      producto.clean_Producto();
                                                })
                                                .catch(console.log);
                                  },
                                  remove_Producto:function(){
                                        console.log('Eliminando... producto!');
                                        /* Remove producto */
                                                require(['js/administrador/producto/ctrlProducto'])
                                                .then(imports => {
                                                  console.log('imports', imports);
                                                  var producto = imports[0];
                                                      producto.delete_Producto();
                                                })
                                                .catch(console.log);
                                  },
                                  render:function(){
                                      return(<div>
                                                      <div  className="content"  id="content_producto">

                                                        <div className="content_crud" id="crudProducto">

                                                                <div className="content_search">
                                                                    <div className="searcher">
                                                                        <div className="fieldSearch">
                                                                            <input className="txtSearch" data-id_producto="0" id="txt_buscador_producto" placeholder="..." onFocus={this.show_listProducts} onBlur={this.hidden_listProducts}></input>
                                                                        </div>
                                                                        <div className="label">Buscar producto</div>
                                                                        <div className="list hidden" id="listProductos"></div>
                                                                    </div>
                                                                </div>

                                                                <div className="driver">
                                                                      <div className="operations">
                                                                        <div className="add" id="addGrupo" onClick={this.clean_Producto}></div>
                                                                        <div className="remove" id="removeGrupo" onClick={this.remove_Producto}></div>
                                                                      </div>
                                                                      <div className="profile_info">
                                                                        <div className="info">
                                                                          <div className="label">Productos</div>
                                                                          <div className="value" id="info_productos">10</div>
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


                                                                  <div className="setter" id="setterProducto">
                                                                          <div className="head">
                                                                            <div className="label" id="msgOperationProducto">Nuevo producto</div>
                                                                          </div>
                                                                          <div className="field" id="fieldDescripcion">
                                                                              <div className="label">
                                                                                    <div>Descripción</div>
                                                                              </div>
                                                                              <div className="textbox">
                                                                                  <input id="txt_descripcion_producto"  type="text"   data-id_producto="0"/>
                                                                              </div>
                                                                          </div>
                                                                          <div className="content_fields">
                                                                                <div className="field">
                                                                                    <div className="label">
                                                                                          <div>Unidad</div>
                                                                                    </div>
                                                                                    <div className="textbox">
                                                                                        <input id="txt_unidad_medida_producto"  type="text"/>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="field">
                                                                                    <div className="label">
                                                                                          <div>max Germinación</div>
                                                                                    </div>
                                                                                    <div className="textbox">
                                                                                        <input id="txt_max_germinacion"  type="text"/>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="field">
                                                                                    <div className="label">
                                                                                          <div>max Extracción</div>
                                                                                    </div>
                                                                                    <div className="textbox">
                                                                                        <input id="txt_max_extraccion"  type="text"/>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="result">
                                                                                    <div className="label" id="resultOperationProducto"></div>
                                                                                </div>
                                                                                <div className="content_button">
                                                                                  <div className="button" id="btn_almacenar_producto" onClick={this.create_update_Producto}>
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
                              React.render(<Producto/>,document.getElementById('center'));
}

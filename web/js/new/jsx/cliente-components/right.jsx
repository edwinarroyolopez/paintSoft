function right_cliente(){

        console.log('Inicializado desde archivo right');

              var Right = React.createClass({

                                  componentWillMount:function() {/* Se lanza antes de que se renderice el componente */

                                  },
                                  getInitialState: function() {
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
                                     componentDidMount:function(){
                                              /* Load last 10 customers  */
                                                  load_customer_view(0,0,0);
                                     },
                                     read_all_Customers:function(){

                                                  var load = parseInt(document.getElementById('txt_searcher_customers').getAttribute('data-load_customers'));

                                                        if(load==0){/* No se ha cargado */

                                                                  /* Load all customers */
                                                                    load_customer_view(10,1,0);

                                                                     /* Change state load customers */
                                                                    document.getElementById('txt_searcher_customers').setAttribute('data-load_customers',1);
                                                        }/* Load = 0 */

                                     },
                                  render:function(){
                                      return(                <div >
                                                                      <div id="searcher_customers">
                                                                              <input id="txt_searcher_customers"  placeholder="Buscar cliente..." data-load_customers="0"  onFocus={this.read_all_Customers} onKeyPress={this.searh_Customers} onKeyDown={this.searh_Customers} />
                                                                      </div>
                                                                      <div id="dataCustomers">{ this.state.customerList }</div>
                                                                </div>
                                          );

                                  }
                              });
                              React.render(<Right/>,document.getElementById('right'));
}

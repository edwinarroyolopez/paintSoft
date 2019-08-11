function inicializar_factura(){

  var Factura = React.createClass({

                  //    getInitialState: function() {},

                      //   componentWillMount() {}/* Se lanza antes de que se renderice el componente */
                      //  componentDidMount(){} /* Se lanza despues de renderizado el componente */
                      //  shouldComponentUpdate(){}/*  Devuelve con un valor si el componente debería actualizarse */
                      //  componentWillUnMount(){}/*   Se lanza antes de que el componente se elimine. */

                         /* Se lanza despues de renderizado el componente */
                        // componentDidMount:function(){},
                        /* Se lanza despues de renderizado el componente */
                        componentDidMount:function(){
                                 /* Load last 10 customers  */
                                       load_customer_view(0,0,1);
                                 /* Load last 10 products */
                                       load_product_view(0,0,1);
                        },
                        read_all_Customers:function(){

                                    /* do visible */
                                    document.getElementById('listCustomer').classList.remove("hidden");

                                     var load = parseInt(document.getElementById('txt_search_customer_for_sale').getAttribute('data-load_customers'));

                                           if(load==0){/* No se ha cargado */

                                                       /* Load all customers */
                                                         load_customer_view(10,1,1);

                                                        /* Change state load customers */
                                                       document.getElementById('txt_search_customer_for_sale').setAttribute('data-load_customers',1);
                                           }/* Load = 0 */

                        },
                        searh_Customers:function(e){

                                    var filter = document.getElementById('txt_search_customer_for_sale').value+e.key;

                                     if(e.keyCode===13){/* Evita la acción cuando es la tecla Enter */
                                         e.preventDefault();
                                     }

                                     /* Retroceso: Se hace búsqueda con un caracter menos */
                                         if(e.keyCode==8){
                                                  filter = document.getElementById('txt_search_customer_for_sale').value;
                                                  filter = filter.substring(0,filter.length - 1);/* Elimina última letra */
                                         }
                                        /*Busca filtro en cada fila de la lista */
                                      search_in_datagrid('div#listCustomer div.item',filter,10);

                        },
                        read_all_Products:function(){

                                        /* do visible */
                                        document.getElementById('listProduct').classList.remove("hidden");

                                         var load = parseInt(document.getElementById('txt_search_products_for_sale').getAttribute('data-load_products'));

                                           if(load==0){/* No se ha cargado */

                                                       /* Load all products */
                                                         load_product_view(10,1,1);

                                                        /* Change state load products */
                                                       document.getElementById('txt_search_products_for_sale').setAttribute('data-load_products',1);
                                           }/* Load = 0 */

                        },
                        hidden_List_customer:function(){

                                  setTimeout(function(){
                                        /* do hidden */
                                              document.getElementById('listCustomer').classList.add("hidden");
                                   }, 200);

                        },
                        hidden_List_product:function(){

                                  setTimeout(function(){
                                        /* do hidden */
                                              document.getElementById('listProduct').classList.add("hidden");
                                   }, 200);
                        },
                        calculate_price:function(e){

                                var cantidad =  parseInt(document.getElementById('txt_set_cantidad').value+e.key);
                                var precio_unidad =parseInt(document.getElementById('txt_set_precio_unidad').value);
                                var price = cantidad*precio_unidad;/* calculate price */
                                document.getElementById('set_subtotal').innerHTML = price;

                        },
                        set_date:function(){

                                fechaFactura();

                        },
                        do_sale:function(){/* Do sale */

                              /* Getter header */
                                var facture_head = JSON.stringify(get_facture_head());
                              /* Getter rows */
                                var facture_detail = JSON.stringify(get_facture_detail());
                                var number_facture = document.getElementById('txt_number_bill').value;


                                    console.log(" Head: "+facture_head);
                                    console.log(" Detail: "+facture_detail);

                                /* to ctrlfactura */
                                  $.post('ctrlfacture',{A:1,Number_facture:number_facture,Facture_head:facture_head,Facture_detail:facture_detail},function(response){

                                          console.log("Se ha ingresado la factura!");

                                  });

                                            /* Abrir factura en una nueva pestaña */
                                                         setTimeout(function(){

                                                              console.log("Numero "+number_facture);

                                                             var a = document.createElement('a');
                                                             a.target ='_blank';
                                                             a.href = '/innovasemillas/pdf/facture'+number_facture+'.pdf';
                                                             a.click();

                                                           },3000);

                        },
                        set_product_to_datagrid:function(){
                                /* set product to datagrid */

                                  /* Getter */
                                        var id_inventario = document.getElementById('info_product_selected').getAttribute('data-id_inventario');
                                        var id_producto = document.getElementById('info_product_selected').getAttribute('data-id_producto');
                                        var descripcion = document.getElementById('info_product_selected').innerHTML;
                                        var unidad = document.getElementById('set_unidad').innerHTML;
                                        var cantidad = document.getElementById('txt_set_cantidad').value;
                                        var precio_unidad = document.getElementById('txt_set_precio_unidad').value;
                                        var subtotal = document.getElementById('set_subtotal').innerHTML;

                                        /* Total calculate */
                                        var total = parseInt(document.getElementById('set_total').innerHTML);
                                              total = total + parseInt(subtotal);
                                              document.getElementById('set_total').innerHTML = total;

                                    /* Setter datagrid */
                                          /* Row */
                                              var row_sell = document.createElement('div');
                                                   row_sell.setAttribute('class','row_sell');
                                                   row_sell.setAttribute('data-id_inventario',id_inventario);
                                                   row_sell.setAttribute('data-id_producto',id_producto);
                                                   /* Description */
                                              var description = document.createElement('div');
                                                    description.setAttribute('class','description');
                                                    description.innerHTML = descripcion;
                                                    /* Unity */
                                               var unity = document.createElement('div');
                                                    unity.setAttribute('class','unity');
                                                    unity.innerHTML = unidad;
                                                     /* Quantity */
                                                var quantity = document.createElement('div');
                                                      quantity.setAttribute('class','quantity');
                                                      quantity.innerHTML = cantidad;
                                                    /* Price_unity */
                                             var price_unity = document.createElement('div');
                                                     price_unity.setAttribute('class','price_unity');
                                                     price_unity.innerHTML = precio_unidad;
                                                     /* Price_unity */
                                              var price = document.createElement('div');
                                                   price.setAttribute('class','price');
                                                   price.innerHTML = subtotal;

                                                   /* add to row */
                                                     row_sell.appendChild(description);
                                                     row_sell.appendChild(unity);
                                                     row_sell.appendChild(quantity);
                                                     row_sell.appendChild(price_unity);
                                                     row_sell.appendChild(price);
                                                     /* add to datagrid */
                                                     document.getElementById('dataGrid_product_sell').appendChild(row_sell);

                                                     /* clear fields */
                        },
                      render:function(){

                          return(<div>
                                          <div id="content">
                                                <div id="header_sell">
                                                        <div id="bill">
                                                            <div className="bottom">
                                                                          <div className="field">
                                                                                  <div className="label">
                                                                                        <div>Número</div>
                                                                                  </div>
                                                                                  <div className="textbox">
                                                                                        <input id="txt_number_bill" type="text" />
                                                                                  </div>
                                                                          </div>
                                                                          <div className="field">
                                                                                  <div className="label">
                                                                                        <div>Fecha</div>
                                                                                  </div>
                                                                                  <div className="textbox">
                                                                                        <input id="txt_date_bill" type="text" onFocus={this.set_date} />
                                                                                  </div>
                                                                          </div>
                                                                          <div className="field">
                                                                                  <div className="label">
                                                                                        <div>Forma de pago</div>
                                                                                  </div>
                                                                                  <div className="textbox">
                                                                                        <input id="txt_way_to_pay_bill" type="text" />
                                                                                  </div>
                                                                          </div>
                                                            </div>
                                                        </div>
                                                        <div id="sell_customer">
                                                            <div id="listCustomer" className="hidden"></div>
                                                            <div className="bottom">
                                                                  <input id="txt_search_customer_for_sale" placeholder="Buscar cliente..."  data-load_customers="0" onBlur={this.hidden_List_customer} onFocus={this.read_all_Customers} onKeyPress={this.searh_Customers} onKeyDown={this.searh_Customers} />
                                                            </div>
                                                            <div id="get_customer">
                                                                    <div className="field" id="f_document_customer">
                                                                          <div className="label">Documento</div>
                                                                          <div className="info" id="info_document_customer">seleccione</div>
                                                                    </div>
                                                                    <div className="field" id="f_city_customer">
                                                                          <div className="label">Ciudad</div>
                                                                          <div className="info" id="info_city_customer">seleccione</div>
                                                                    </div>
                                                                    <div className="field" id="f_departament_customer">
                                                                          <div className="label">Departamento</div>
                                                                          <div className="info" id="info_departament_customer">seleccione</div>
                                                                    </div>
                                                                    <div className="field" id="f_address_customer">
                                                                          <div className="info" id="info_address_customer">seleccione</div>
                                                                    </div>
                                                                    <div className="field" id="f_phone_customer">
                                                                          <div className="info" id="info_phone_customer">seleccione</div>
                                                                    </div>
                                                            </div>

                                                        </div>
                                                </div>

                                                <div id="content_product_sell">
                                                      <div id="searcher_product_sell">
                                                            <div id="listProduct" className="hidden"></div>
                                                            <input id="txt_search_products_for_sale" placeholder="Buscar productos..." onBlur={this.hidden_List_product} onFocus={this.read_all_Products} />
                                                      </div>
                                                      <div id="set_product_sell">
                                                              <div id="header_set_product_sell">
                                                                    <div className="label" id="info_product_selected">Producto seleccionado!</div>
                                                              </div>
                                                              <div id="set_fields_product_sell">
                                                                      <div className="field_set">
                                                                          <div className="label">Unidad</div>
                                                                          <div className="set empty" id="set_unidad">Kg</div>
                                                                      </div>
                                                                      <div className="field_set">
                                                                          <div className="label">Cantidad</div>
                                                                          <input className="set" id="txt_set_cantidad" placeholder="10"  onKeyPress={this.calculate_price}/>
                                                                      </div>
                                                                      <div className="field_set">
                                                                          <div className="label">Precio unidad</div>
                                                                          <input className="set" id="txt_set_precio_unidad"  placeholder="10.000"/>
                                                                      </div>
                                                                      <div className="field_set" id="field_subtotal">
                                                                          <div className="label">Subtotal</div>
                                                                          <div className="set empty" id="set_subtotal">0</div>
                                                                      </div>
                                                                      <div className="field_set" id="field_total">
                                                                          <div className="label">Total</div>
                                                                          <div className="set" id="set_total">0</div>
                                                                      </div>
                                                                      <div className="content_button">
                                                                              <div className="button" id="btn_set_datagrid" onClick={this.set_product_to_datagrid}>
                                                                                    <div className="label">Down</div>
                                                                              </div>
                                                                      </div>
                                                              </div>
                                                      </div>
                                                      <div id="content_datagrid">
                                                                  <div id="dataGrid_product_sell">
                                                                        <div className="data_header_sell">
                                                                            <div className="description" >Descripcion</div>
                                                                            <div className="unity" >Unidad</div>
                                                                            <div className="quantity" >Cantidad</div>
                                                                            <div className="price_unity" >$ Unidad</div>
                                                                            <div className="price" >Precio</div>
                                                                        </div>
                                                                  </div>
                                                                  <div className="content_button">
                                                                          <div className="button" id="btn_do_sale" onClick={this.do_sale}>
                                                                                <div className="label">Realizar venta</div>
                                                                          </div>
                                                                  </div>
                                                      </div>


                                                </div>

                                          </div>
                                  </div>
                              );

                      }
                  });
                  React.render(<Factura/>,document.getElementById('center'));


}

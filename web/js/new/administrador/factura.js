/* Cargar fecha de factura*/
   function fechaFactura(){
       var Hoy =   new Date();
       var dd = Hoy.getDate();
       var mm = Hoy.getMonth()+1; //hoy es 0!
       var yyyy = Hoy.getFullYear();
       /* Dar formato */
       if(dd<10) {dd='0'+dd}
       if(mm<10) {mm='0'+mm}
       document.getElementById('txt_date_bill').value = dd+'/'+mm+'/'+yyyy;

   }

function get_facture_head(){

                var number_facture = document.getElementById('txt_number_bill').value;
                var date_facture = document.getElementById('txt_date_bill').value;
                var way_to_pay_facture = document.getElementById('txt_way_to_pay_bill').value;
                /* Customer */
                var id_customer = document.getElementById('txt_search_customer_for_sale').getAttribute('data-id_customer');
                var customer = document.getElementById('txt_search_customer_for_sale').value;
                var document_customer = document.getElementById('info_document_customer').innerHTML;
                var city_customer = document.getElementById('info_city_customer').innerHTML;
                var departament_customer = document.getElementById('info_departament_customer').innerHTML;
                var address_customer = document.getElementById('info_address_customer').innerHTML;
                var phone_customer = document.getElementById('f_phone_customer').innerHTML;
                var total = parseInt(document.getElementById('set_total').innerHTML);
                /* Create json object */
                var facture_head = {Number_facture:number_facture,
                                              Date_facture:date_facture,
                                              Way_to_pay_facture:way_to_pay_facture,
                                              Id_customer:id_customer,
                                              Customer:customer,
                                              Document_customer:document_customer,
                                              City_customer:city_customer,
                                              Departament_customer:departament_customer,
                                              Address_customer:address_customer,
                                              Phone_customer:phone_customer,
                                              Total:total};
                    return facture_head;
}

function get_facture_detail(){

            var facture_detail = new Array();
        /* Read rows datagrid */
            var rows = document.querySelectorAll('div#dataGrid_product_sell div.row_sell');

              for(i=0; i < rows.length; i++){

                            var id_stock = rows[i].getAttribute('data-id_inventario');
                            var id_product = rows[i].getAttribute('data-id_producto');

                            var description =  rows[i].children[0].innerHTML;
                            var unity =  rows[i].children[1].innerHTML;
                            var quantity =  rows[i].children[2].innerHTML;
                            var price_unity =  rows[i].children[3].innerHTML;
                            var price =  rows[i].children[4].innerHTML;

                            /* json transform */
                            facture_detail[facture_detail.length] =   {Id_stock:id_stock,Id_product:id_product,Description:description,
                                                                                       Unity:unity,Quantity:quantity,Price_unity:price_unity,Price:price};
              }
            return facture_detail;
}

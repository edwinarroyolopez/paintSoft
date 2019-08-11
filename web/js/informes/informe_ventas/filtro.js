

/* 1. Filtra facturas de venta */
function getInforme_ventas(fecha_inicial,fecha_final){

          var response = {};

          var promise = new Promise(function (resolve, reject) {

                      $.post('ctrlestadistica',{A: 2, Fecha_inicial:fecha_inicial,Fecha_final:fecha_final}, function(r){/* Callback ...   */
                              if(r != ''){
                                response = r;
                              }
                              resolve(response)
                      });

                      if (!response) {
                        reject(new Error('No trae ventas!'))
                      }
          })/* promise */

          return promise

  }/* ## Inform facturas venta ## */

$(document).on('ready',function(){


  /* datepicker */
      $( function() {
            $( "input#txtFecha_inicial").datepicker();
            $( "input#txtFecha_final").datepicker();


            var Hoy =   new Date();
            var dd = Hoy.getDate();
            var mm = Hoy.getMonth()+1; //hoy es 0!
            var yyyy = Hoy.getFullYear();
            /* Dar formato */
            if(dd<10) {dd='0'+dd}
            if(mm<10) {mm='0'+mm}
            document.getElementById('txtFecha_inicial').value = dd+'/'+mm+'/'+yyyy;
            document.getElementById('txtFecha_final').value = dd+'/'+mm+'/'+yyyy;


      } );


      $('div#content_filtro').on('click','div#button_filtrar_ventas',function(){

            console.log('Filtrando...');

            var fecha_inicial = document.getElementById('txtFecha_inicial').value
            var fecha_final = document.getElementById('txtFecha_final').value



            getInforme_ventas(fecha_inicial,fecha_final).then(function(ventas){

                $('div#dataVentas div.row').remove()

                ventas = JSON.parse(ventas)

                for(i in ventas){

                    if(i==0){
                          document.getElementById('info_valor_contado').innerHTML = parseInt(ventas[0].Valor)
                          document.getElementById('info_numero_contado').innerHTML = parseInt(ventas[0].Facturas)
                          document.getElementById('info_ganancia_contado').innerHTML = parseInt(ventas[0].Ganancia)

                          document.getElementById('info_valor_credito').innerHTML = parseInt(ventas[1].Valor)
                          document.getElementById('info_numero_credito').innerHTML = parseInt(ventas[1].Facturas)
                          document.getElementById('info_ganancia_credito').innerHTML = parseInt(ventas[1].Ganancia)

                          document.getElementById('info_valor_total').innerHTML = parseInt(ventas[0].Valor)+parseInt(ventas[1].Valor)
                          document.getElementById('info_numero_total').innerHTML = parseInt(ventas[0].Facturas)+parseInt(ventas[1].Facturas)
                          document.getElementById('info_ganancia_total').innerHTML = parseInt(ventas[0].Ganancia)+parseInt(ventas[1].Ganancia)

                    }

                    /* Montar tabla */
                      if(i>1){
                        if((i%2)==0){
                          fila='p'
                        }else{
                          fila='i'
                        }
                        var row = document.createElement('div');
                        row.setAttribute('class','row ' + fila);

                        var fecha = document.createElement('div')
                        fecha.setAttribute('class','cell fecha')
                        fecha.innerHTML= ventas[i].Fecha

                        var numero = document.createElement('div')
                        numero.setAttribute('class','cell numero')
                        numero.innerHTML= ventas[i].Numero_factura

                        var cliente = document.createElement('div')
                        cliente.setAttribute('class','cell cliente')
                        cliente.innerHTML= ventas[i].Cliente

                        var forma_pago = document.createElement('div')
                        forma_pago.setAttribute('class','cell forma_pago')
                        forma_pago.innerHTML= ventas[i].Forma_pago

                        var valor = document.createElement('div')
                        valor.setAttribute('class','cell valor')
                        valor.innerHTML= ventas[i].Valor

                        var ganancia = document.createElement('div')
                        ganancia.setAttribute('class','cell ganancia')
                        ganancia.innerHTML= ventas[i].Ganancia

                        var estado = document.createElement('div')
                        estado.setAttribute('class','cell estado')
                        estado.innerHTML= ventas[i].Estado

                        row.appendChild(fecha)
                        row.appendChild(numero)
                        row.appendChild(cliente)
                        row.appendChild(forma_pago)
                        row.appendChild(valor)
                        row.appendChild(ganancia)
                        row.appendChild(estado)
                       document.getElementById('dataVentas').appendChild(row);
                      }


                }

            })


      })

})

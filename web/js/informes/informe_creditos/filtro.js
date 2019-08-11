

/* 1. Filtra facturas de credito */
function getInforme_facturas_credito(fecha_inicial,fecha_final){

          var response = {};

          var promise = new Promise(function (resolve, reject) {

                      $.post('ctrlestadistica',{A: 3, Fecha_inicial:fecha_inicial,Fecha_final:fecha_final}, function(r){/* Callback ...   */
                              if(r != ''){
                                response = r;
                              }
                              resolve(response)
                      });

                      if (!response) {
                        reject(new Error('No trae facturas creditos!'))
                      }
          })/* promise */

          return promise

  }/* ## Inform facturas creditos ## */

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

      $('div#content_filtro').on('click','div#button_filtrar_creditos',function(){


            var fecha_inicial = document.getElementById('txtFecha_inicial').value
            var fecha_final = document.getElementById('txtFecha_final').value


            getInforme_facturas_credito(fecha_inicial,fecha_final).then(function(creditos){

                $('div#dataCreditos div.row').remove()

                creditos = JSON.parse(creditos)

                console.log('creditos',creditos);

                for(i in creditos){

                    if(i==0){
                          document.getElementById('info_numero_credito').innerHTML = parseInt(creditos[0].Numero_factura)
                          document.getElementById('info_valor_credito').innerHTML = parseInt(creditos[0].Valor)
                          document.getElementById('info_saldo_credito').innerHTML = parseInt(creditos[0].Saldo)
                          document.getElementById('info_ganancia_credito').innerHTML = parseInt(creditos[0].Ganancia)
                    }

                    /* Montar tabla */
                      if(i>0){
                          if((i%2)==0){
                            fila='p'
                          }else{
                            fila='i'
                          }


                        var row = document.createElement('div');
                        row.setAttribute('class','row ' + fila);

                        var fecha = document.createElement('div')
                        fecha.setAttribute('class','cell fecha')
                        fecha.innerHTML= creditos[i].Fecha

                        var valor = document.createElement('div')
                        valor.setAttribute('class','cell valor')
                        valor.innerHTML= parseInt(creditos[i].Valor)

                        var saldo = document.createElement('div')
                        saldo.setAttribute('class','cell saldo')
                        saldo.innerHTML= parseInt(creditos[i].Saldo)

                        var numero = document.createElement('div')
                        numero.setAttribute('class','cell numero')
                        numero.innerHTML= creditos[i].Numero_factura

                        var cliente = document.createElement('div')
                        cliente.setAttribute('class','cell cliente')
                        cliente.innerHTML= creditos[i].Cliente

                        var abonos = document.createElement('div')
                        abonos.setAttribute('class','cell abonos')
                        abonos.innerHTML= creditos[i].Abonos

                        var ultimo_abono = document.createElement('div')
                        ultimo_abono.setAttribute('class','cell ultimo_abono')
                        ultimo_abono.innerHTML= creditos[i].Ultimo_abono

                        var valor_ultimo_abono = document.createElement('div')
                        valor_ultimo_abono.setAttribute('class','cell valor_ultimo_abono')
                        valor_ultimo_abono.innerHTML= parseInt(creditos[i].Valor_ultimo_abono)

                        var estado = document.createElement('div')
                        estado.setAttribute('class','cell estado')
                        estado.innerHTML= creditos[i].Estado


                        row.appendChild(fecha)
                        row.appendChild(valor)
                        row.appendChild(saldo)
                        row.appendChild(numero)
                        row.appendChild(cliente)
                        row.appendChild(abonos)
                        row.appendChild(ultimo_abono)
                        row.appendChild(valor_ultimo_abono)
                        row.appendChild(estado)

                       document.getElementById('dataCreditos').appendChild(row);
                      }


                }

            })


      })

})

$(document).on('ready',function(){

  $('#universe').on('dblclick','#info_facturas_pendientes', function(){
    document.getElementById('modal').classList.remove("hidden");
    var id_cliente = $('#selectedCliente').attr('data-id');

    build_facturas_pendientes(id_cliente).then(
        data => {
          data = JSON.parse(data);
          data.map( function(factura){
            console.log('factura: ',factura);
            let node = document.createElement('div');
            node.setAttribute('class','factura');
            let input = document.createElement('input');
            input.setAttribute('type','checkbox');
            input.setAttribute('name','state');
            let state = document.createElement('div');
            state.setAttribute('class','state');
            state.appendChild(input);
            let numero = document.createElement('div');
            numero.setAttribute('class','numero');
            numero.innerHTML = factura.Numero;
            let fecha = document.createElement('div');
            fecha.setAttribute('class','fecha');
            fecha.innerHTML = factura.Fecha;
            let valor = document.createElement('div');
            valor.setAttribute('class','valor');
            valor.innerHTML = factura.Valor;
            let saldo = document.createElement('div');
            saldo.setAttribute('class','saldo');
            saldo.innerHTML = factura.Saldo;
            node.appendChild(state);
            node.appendChild(numero);
            node.appendChild(fecha);
            node.appendChild(valor);
            node.appendChild(saldo);
            document.getElementById('facturas_pendientes').appendChild(node);
          })
        },
        error => {
        console.log(error);
      });

  })

  $('div#modal').on('click', 'div#button_close_modal', function(){
    document.getElementById('modal').classList.add("hidden");
  })

  $('div#facturas_pendientes').on('change' ,'input#checkbox_state', function(){
      let state = $(this).is(':checked') ? true : false;
      $('div#facturas_pendientes div.factura input:checkbox').each(function(){
        $(this).prop('checked',state);
      })
  })
})

async function build_facturas_pendientes(id_cliente){
    /* traer todas las facturas pendientes de este cliente */
    return $.post('ctrlcliente',{Action:'5',Id_cliente:id_cliente},function(facturas_pendientes){
        return facturas_pendientes;
     })
 }

 /* Construir modal para gestionar las facturas pendientes */

 /*
    1. Title => Facturas pendientes
    2. Get facturas of selected customer

    Note: use a promise

  Use react??

   reasons why i would use react

   1. Learning
   2. update paintSoft

   or an hibrid??





  * */

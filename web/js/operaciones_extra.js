$(document).on('ready',function(){
        
      /* 1. add Saldo */
            $('div.content_button_saldo').on('click','div#btn_add_saldo',function(){
                var id_cliente= document.getElementById('txt_search_cliente').getAttribute('data-id')
                var saldo_cliente= document.getElementById('txtSaldo_cliente').value
                var responsable= document.getElementById('txtResponsable').value
                    
                    console.log('id_cliente: '+id_cliente)
                    console.log('saldo_cliente: '+saldo_cliente)
                    console.log('responsable: '+responsable)    
                
/* Debe buscar el saldo del cliente si tiene  */
                $.post('ctrlsaldo',{A:1,Id_cliente:id_cliente,
                                   Saldo_cliente:saldo_cliente,Responsable:responsable,Estado:1},function(res){
                    console.log(res);
                          /* invisible setter_saldo */
                                  $('div#setter_saldo').removeClass('hidden')
                                  $('div#setter_saldo').addClass('hidden')
                })
               
               
          })    
          
          /* 2. hace visible contenedor */
            $('div.content_button_saldo').on('click','div#btn_open_saldo',function(){
                $('div#setter_saldo').removeClass('hidden')
                //$('div#setter_saldo').addClass('hidden')
            })

})

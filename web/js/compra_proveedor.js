
   var json_proveedores;
   
   
            /* Búsqueda de proveedores */
    function get_Proveedores(){
      
        $.post('ctrlproveedor',{Action:2},function(json){

                   var jSon =   jQuery.parseJSON($.trim(json));
                       json_proveedores = jSon;
                
                console.log(json_proveedores);
                
                for(i in json_proveedores){
                    /* Crear objeto */
                    var iProveedor = document.createElement('div');
                        iProveedor.setAttribute('class','iProveedor');
                        iProveedor.setAttribute('data-id',json_proveedores[i].Id);
                        iProveedor.setAttribute('data-nit',json_proveedores[i].Nit);
                        iProveedor.setAttribute('data-telefono',json_proveedores[i].Telefono_1);
                        iProveedor.setAttribute('data-ciudad',json_proveedores[i].Ciudad);
                        iProveedor.innerHTML=json_proveedores[i].Razon_Social;

                        document.getElementById('cbProveedor').appendChild(iProveedor);
                }
            
        });
    }        




$(document).on('ready', function(){
    /* Loading proveedores */
        get_Proveedores();
    
});
  
                  
                  
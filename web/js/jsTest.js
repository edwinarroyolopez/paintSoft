$(document).on('ready',function(){
    
    $('#center').on('keypress','#txtFactura',function(){
            console.log('text:', $(this).val());
        })
})
  /* 1. busqueda en list */
   function busqueda_List(pmtTexto,pmtList){


        pmtTexto = pmtTexto.toLowerCase();/* Transformo el texto a minúsculas */

           /* Recorro cada fila de la lista */
         $('div#'+pmtList+' div.row').each(function(){

            var  row = $(this).text();/* Contiene exto de la fila */
                 row = row.toLowerCase();

                 var i = 0; /* Controla número de filas visibles */

                  if (row.indexOf(pmtTexto)!==-1) {/* Existen resultados*/

                                    i = i + 1;/* Solo puedo hacer visible a 14 Items */

                                    if(i<=15){
                                        $(this).removeClass('hidden');
                                    }else{
                                        $(this).addClass('hidden');
                                    }

                             }else{/* No coincide con texto entrante */
                                    $(this).addClass('hidden');
                             }
         });

    }


$(document).on('ready',function(){})

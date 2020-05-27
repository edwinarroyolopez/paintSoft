/* 1. Cargar clientes */
function carga_Clientes() {

    var response = {};

    var promise = new Promise(function (resolve, reject) {

        $.post('ctrlcliente', {Action: 2}, function (r) {/* Callback ...   */
            if (r != '') {
                response = r;
            }
            resolve(response)
        });

        if (!response) {
            reject(new Error('No trae clientes!'))
        }
    })/* promise */

    return promise

}/* ## Cargar clientes ## */


$(document).on('ready', function () {
    /* 1. Cargar clientes */
    carga_Clientes().then(function (clientes) {

        clientes = jQuery.parseJSON(clientes);

        /* Limpiar lista */
        $('div#listClientes div.row').remove();

        for (i in clientes) {

            var row = document.createElement('div');
            row.setAttribute('class', 'row');
            row.setAttribute('data-id', clientes[i].Id);
            row.setAttribute('data-telefono', clientes[i].Telefono);
            row.setAttribute('data-direccion', clientes[i].Direccion);
            row.setAttribute('data-ciudad', clientes[i].Ciudad);
            row.setAttribute('data-email', clientes[i].Email);
            var nombre = document.createElement('div');
            nombre.setAttribute('class', 'nombre');
            nombre.innerHTML = clientes[i].Nombre;
            var documento = document.createElement('div');
            documento.setAttribute('class', 'documento');
            documento.innerHTML = clientes[i].Documento;
            row.appendChild(nombre);
            row.appendChild(documento);

            if (i >= 14) {
                row.setAttribute('class', 'row hidden');
            } else {/* Cantidad de items visibles */
                document.getElementById('listClientes').setAttribute('data-items', i);
            }
            document.getElementById('listClientes').appendChild(row);
        }

    });/* ## get Clientes ## */

    /* Hacer visible la lista de clientes */
    $('div#content_search_cliente').on('focusin', 'input#txt_search_cliente', function () {
        $('div#listClientes').removeClass('hidden');
    });
    /* Esconder lista de clientes */
    $('div#content_search_cliente').on('focusout', 'input#txt_search_cliente', function () {
        setTimeout(function () {
            $('div#listClientes').addClass('hidden');

            /* Resetear lista de clientes*/
            var i = 0;
            $("div#listClientes div.row").each(function () {
                i = i + 1;
                if (i <= 14) {
                    $(this).removeClass('hidden')
                }

            });
        }, 500);

    });
    /* Buscar dentro de lista */
    $('div#content_search_cliente').on('keypress', 'input#txt_search_cliente', function (e) {
        var texto = $(this).val() + e.key;
        /* Evita la acción cuando es la tecla Enter */
        if (e.keyCode == 13) {
            e.preventDefault();
        }

        busqueda_List(texto, 'listClientes');

    });

    $('div#listClientes').on('click', 'div.row', function () {

        console.log('id cliente: ', $(this).attr('data-id'));
        var id_cliente = $(this).attr('data-id');

        /* Getter */
        var nombre = $(this).children('div.nombre').html();
        var id_cliente = $(this).attr('data-id');
        var documento = $(this).children('div.documento').html();
        var telefono = $(this).attr('data-telefono');
        var direccion = $(this).attr('data-direccion');
        var ciudad = $(this).attr('data-ciudad');
        var email = $(this).attr('data-email');

        /* Setter */
        document.getElementById('selectedCliente').setAttribute('data-id', id_cliente)
        document.getElementById('selectedCliente').innerHTML = nombre
        document.getElementById('info_value_nit').innerHTML = documento
        document.getElementById('info_value_ciudad').innerHTML = ciudad
        document.getElementById('info_value_telefono').innerHTML = telefono
        document.getElementById('info_value_direccion').innerHTML = direccion

        /* buscar todas las facturas */
        $.post('ctrlfactura', {Action: 19, id_cliente: id_cliente}, function (r) {/* Callback ...   */
            $('#dataFacturas div.row').remove();
            var jSon = jQuery.parseJSON($.trim(r));
            var valor_facturas = 0;
            for (i in jSon) {
                var id_fila = jSon[i].Id;
                var fila = document.createElement('div');
                fila.setAttribute('id', id_fila);
                fila.setAttribute('class', 'row');
                fila.setAttribute('data-id', jSon[i].Id);

                /* numero */
                var input = document.createElement('input');
                input.setAttribute('class', 'check');
                input.setAttribute('type', 'checkbox');
                input.setAttribute('data-value', jSon[i].Id);

                /* numero */
                var numero = document.createElement('div');
                numero.setAttribute('class', 'cell numero');
                numero.innerHTML = jSon[i].Numero;
                /* fecha */
                var fecha = document.createElement('div');
                fecha.setAttribute('class', 'cell fecha');
                fecha.innerHTML = jSon[i].Fecha;
                /* valor */
                var valor = document.createElement('div');
                valor.setAttribute('class', 'cell valor');
                valor.innerHTML = jSon[i].Valor;

                /* estado */
                var estado = document.createElement('div');
                estado.setAttribute('class', 'cell estado');
                estado.innerHTML = (jSon[i].Estado === 1) ? 'Finalizada' : 'Abierta';
                /* forma de pago */
                var forma_pago = document.createElement('div');
                forma_pago.setAttribute('class', 'cell forma_pago');
                forma_pago.innerHTML = (jSon[i].Forma_pago === 0) ? 'Contado' : 'Credito';

                fila.appendChild(input);
                fila.appendChild(numero);
                fila.appendChild(fecha);
                fila.appendChild(valor);
                fila.appendChild(estado);
                fila.appendChild(forma_pago);
                document.getElementById('dataFacturas').appendChild(fila)

                valor_facturas = valor_facturas + jSon[i].Valor;
            }
            $('#valor_facturas').html(valor_facturas);

        });

        /* Esconder lista */
        $('div#listClientes').addClass('hidden');


    })/* ## selecciona cliente ## */

    /* Control de visibilidad de listas */
    $('body').on('click', function () {
        if (!bool_hidden_list) {/* Se hacen invisibles */
            $('div#list_facturas_cerradas').attr('class', 'list hidden')
            $('div#list_facturas_pendientes').attr('class', 'list hidden')
        }
    })

    var bool_hidden_list = false
    /* Cerrar facturas */
    $('div#btn_cerrar_facturas').on('click', function () {
        console.log('cerrando facturas...');
        /*
         leer todos los checks
         */
        var ids_factura = [];
        $("#dataFacturas .check").each(function () {

            if ($(this).prop('checked')) {
                ids_factura.push($(this).attr('data-value'));
            }

        });


        console.log(ids_factura);
        console.log(ids_factura.join());

        if (ids_factura.join() !== '') {
            $.post('ctrlfactura', {Action: 20, ids_factura: ids_factura.join()}, function (r) {
                
            })
        } else {
            alert('No hay facturas selecionadas');
            console.log('no hay facturas selecionadas')
        }

    })

    /* Cerrar facturas */
    $('div#btn_eliminar_facturas').on('click', function () {
        console.log('eliminando facturas...');
    })

})

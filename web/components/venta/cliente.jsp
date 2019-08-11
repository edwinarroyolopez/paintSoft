<!-- test Ed  -->
<div class="content" id="content_cliente">
    <div class="content_search" id="content_search_cliente">
      <div class="hidden" id="frm_add_cliente">
        <div class="content_button" id="content_button_close">
          <div class="button" id="button_close_frm_cliente">
            <div class="label">x</div>
          </div>
        </div>
        <div class="">
          <div class="field" id="field_add_nombre">
             <div class="label">Nombre</div>
             <div class="textbox">
               <input id="txt_add_nombre" type="text" placeholder="..." />
             </div>
           </div>
           <div class="field">
              <div class="label">Documento</div>
              <div class="textbox">
                <input id="txt_add_documento" type="text" placeholder="..." />
              </div>
            </div>
            <div class="field">
               <div class="label">Telefono</div>
               <div class="textbox">
                 <input id="txt_add_telefono" type="text" placeholder="..." />
               </div>
             </div>
             <div class="field">
                <div class="label">Ciudad</div>
                <div class="textbox">
                  <input id="txt_add_ciudad" type="text" placeholder="..." />
                </div>
              </div>
        </div>
        <div class="content_button">
          <div class="button" id="button_add_Cliente">
            <div class="label">add Cliente</div>
          </div>
        </div>
      </div>
      <div class="searcher">
        <div class="content_button" id="content_button_add_cliente">
          <div class="button" id="button_open_frm_add_cliente">
              <div class="label">+</div>
          </div>
        </div>
        <div class="fieldSearch">
          <input type="text" name="" id="txt_search_cliente" value="" placeholder="..." />
          <div class="label" id="selectedCliente" data-id="0">Buscar cliente</div>
        </div>
        <div class="list hidden" id="listClientes"></div>
      </div>
    </div>
    <div  id="detalle_cliente">
      <div class="info" id="info_nit">
          <div class="label">Nit</div>
          <div class="value" id="info_value_nit">...</div>
      </div>
      <div class="info" id="info_ciudad" >
          <div class="label">Ciudad</div>
          <div class="value" id="info_value_ciudad">...</div>
      </div>
      <div class="info" id="info_telefono">
          <div class="label">Teléfono</div>
          <div class="value" id="info_value_telefono">...</div>
      </div>
      <div class="info" id="info_direccion">
          <div class="value" id="info_value_direccion">...</div>
      </div>
    </div>
    <div class="head">Historico</div>
    <div id="historico" >
      <div class="info">
        <div class="label">Cerradas</div>
        <div class="value" id="info_value_cerradas">0</div>
        <div class="list hidden" id="list_facturas_cerradas"></div>
      </div>
      <div class="info" id='info_facturas_pendientes'>
        <div class="label">Pendientes</div>
        <div class="value" id="info_value_pendientes">0</div>
        <div class="list hidden" id="list_facturas_pendientes"></div>
      </div>
      <div class="info">
        <div class="label">Deuda</div>
        <div class="value" id="info_value_deuda">0</div>
      </div>
      <div class="info">
        <div class="label">Saldo</div>
        <div class="value" id="info_value_saldo">0</div>
      </div>
    </div>
</div>

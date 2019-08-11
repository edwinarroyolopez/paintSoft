<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Producto</title>
          <!-- Estilos -->
        <link rel="stylesheet" href="css/menu.css" title="Style"> 
        <link rel="stylesheet" href="css/standar.css" title="Style">
        <link rel="stylesheet" href="css/producto.css" title="Style"> 
        <!-- Estilos  -->
         <!-- Js -->
        <script language="JavaScript" type="text/javascript" src="js/jquery-1.9.1.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/producto.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/producto_medida.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/producto_grupo.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/producto_marca.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/producto_fraccion.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/medida.js"></script>
        
        <!-- Js -->
    </head>
    <body>
        
        
        <div id="universe">
        <!-- MENU NAVEGACION -->
            <section id="left">
             <ul id="navigationMenu">
                <li> <a class="client" href="cliente.jsp"><span>Clientes</span></a></li>
                <li><a class="provider" href="proveedor.jsp"><span>Proveedores</span></a></li>
                <li><a class="formula" href="formulas.jsp"><span>Fórmulas</span></a></li>
                <li><a class="product" href="#"><span>Productos</span></a></li>
                <li><a class="formula" href="inventario.jsp"><span>Inventario</span></a></li>
                <li><a class="shopping" href="compra.jsp"><span>Compras</span></a></li>
                <li><a class="sale" href="venta.jsp"><span>Ventas</span></a></li>
                <li><a class="formula" href="gastos.jsp"><span>Gastos</span></a></li>
                <li><a class="formula" href="estadistica.jsp"><span>Estadística</span></a></li>
             </ul>
            </section>
        <!-- END *** MENU NAVEGACION *** END -->
        
        <!-- CONTENEDOR PRINCIPAL -->
        <section id="center">
            
            <!-- Titulo de la pagiga -->
                 <div class="title">
                    <div class="label">Productos</div>
                </div>
                <br>
             <!-- END *** Titulo de la pagiga *** END -->    
            
            <!-- CONTAINER DE NAVEGACIÓN -->
             
                <div class="container">
                 
                 <!-- TABS DE NAVEGACIÓN -->    
                    <div class="tabMenu">
                       <div class="tab" id="tabRegistro">Registrar</div>
                       <div class="tab" id="tabBusqueda">Buscar</div>
                       <div class="tab isSelect" id="tabProducto">Producto</div>
                       <div class="tab" id="tabConfiguracion">Configuración</div>
                    </div>
                 <!-- END *** TABS DE NAVEGACIÓN  *** END -->
                     
                 
                   <!--  REGISTRO -->
                 <div class="frame" id="frmRegistro">
                     
                     
                 </div>
                 <!-- END ***  REGISTRO  *** END -->
                 
                 
               <!--  PINTURA -->
                 <div class="frame isVisible" id="frmProducto">
                     <div class="sector" id="sector_Setter">
                            <div class="space">
                                <div class="align">
                                           <div class="field">
                                              <div class="label">Grupo</div>
                                              <div class="textbox"><input type="text" id="txtSGrupoProducto" placeholder="Seleccione grupo..."></div>
                                              <div class="combobox hidden" id="cbGrupoProducto"></div>
                                          </div> 
                                           <div class="field">
                                                 <div class="label">Marca</div>
                                                 <div class="textbox"><input type="text" id="txtSMarca" placeholder="Seleccione marca..."></div>
                                                 <div class="combobox hidden" id="cbMarca"></div>
                                             </div>
                                    </div>
                            </div>
                            <div class="space">
                                <div class="align">
                                           <div id="fCodigo" class="field">
                                              <div  class="label">Código</div>
                                              <div class="textbox"><input type="text" id="txtCodigo" placeholder="Código..."></div>
                                              <div id="Ultimo_codigo"></div>
                                           </div> 
                                           <div id="fDescripcion" class="field" >
                                                 <div class="label">Descripción</div>
                                                 <div class="textbox"><input type="text" id="txtDescripcion" placeholder="Descripción..."></div>
                                                 <div id="btnDelete_producto" class="hidden">
                                                     <div class="label">Eliminar</div>
                                                 </div>
                                           </div>
                                            <div class="btnAlmacenar">
                                                 <div class="label">Almacenar</div>
                                            </div>
                                    </div>
                            </div>
                     </div>
                     <div class="sector" id="sector_dataGrid">
                         <div class="parametros">
                            <div id="info_grupo_selected"></div>
                            <div id="info_marca_selected"></div>
                         </div>
                         <div class="datagrid" id="dataProducto">
                             <div class="encabezado">
                                 <div class="codigo">Código</div>
                                 <div class="descripcion">Descripción</div>
                             </div>
                         </div>
                         
                     </div>
                     
                 </div>
               <!-- END ***  PINTURA  *** END -->
                 
                 
                 <!--  CONFIGURACIÓN -->
                 <div class="frame" id="frmConfiguracion">
                     <div class="content">
                            <div class="subMenu">
                                <div class="subItem submenu_selected" id="subproductoGrupo">Grupo de productos</div>
                                <div class="subItem" id="subMarca">Marcas</div>
                                <div class="subItem" id="subFraccionamiento">Fraccionamiento</div>
                            </div>
                     
                            <!-- Grupo de productos -->
                     <div class="Work isInLineBlok" id="wproductoGrupo">
                         <div class="subTitulo">
                             <label>Grupo de productos</label>
                         </div>
                         
                         <div class="contentFieldGrupo">
                             <div class="subContent">
                             
                                 
                                    <div class="field">
                                        <div class="label">Grupo</div>
                                        <div class="textbox"><input type="text" id="txtproductoGrupo" placeholder="Pinturas"></div>
                                    </div>
                                    <div class="field">
                                        <div id="sector_add_medida" class="hidden">
                                            <div class="encabezado">+  Nueva medida</div>
                                            <div class="textbox"><input type="text" id="txt_new_medida" placeholder="Press enter!"></div>
                                        </div>
                                        
                                        
                                        <div class="plus_medida">
                                            <div class="label">Medida</div>
                                            <div id="show_add_medida">+</div> 
                                        </div>
                                                
                                                
                                        <div class="textbox"><input type="text" id="txtId_medida" placeholder="Volumen"></div>
                                        <div class="combobox hidden" id="cbgrupoMedida"></div>
                                        
                                    </div>
                                 <div class="btnAlmacenar" id="addproductoGrupo"> <div class="label">Almacenar</div> </div>
                             </div>
                             <div id="sector_unidad_medida">
                                 <div class="info">
                                     <div class="label">Grupo</div>
                                     <div id="info_grupo">seleccione</div>
                                 </div>
                                 <div class="info">
                                     <div class="label">Medida</div>
                                     <div id="info_medida">seleccione</div>
                                 </div>
                                 <div class="encabezado">+ Unidad de medida</div>   
                                 <div class="field">
                                     <div class="textbox"><input type="text" id="txt_add_unidad_medida" placeholder="unidad de medida"></div>
                                 </div>
                                 <div id="list_unidad_medida"></div>
                             </div>
                             <div class="dataGrupo" id="dataGrupo">
                                 <div class="head">
                                     <div class="codigo">Código</div>
                                     <div class="grupo">Grupo</div>
                                     <div class="medida">Medida</div>
                                 </div>
                                 <!--   <div class="row">
                                        <div class="codigo"></div>
                                        <div class="grupo"></div>
                                        <div class="medida"></div>
                                    </div>          -->                        
                             </div>
                             
                         </div>
                         
                     </div>
                            <!-- END *** Grupo de productos *** END -->
                            
                    <!-- Marcas  -->        
                            <div class="Work" id="wMarca">
                                <div class="subTitulo">
                                    <label>Marcas</label>
                                </div>
                                <div class="contentMarca">
                                    <div class="subContent">
                                        <div class="dataMarca" id="dataMarca">
                                            <div class="field">
                                               <div class="textbox"><input type="text" id="txtMarca" placeholder="Marca..."></div>
                                            </div>
                                            <div class="head">
                                                <div class="codigo">Código</div>
                                                <div class="marca">Marca</div>
                                            </div>
                                               <!-- Aquí se agregan las filas para el data grid marcas -->
                                        </div>
                                        <div class="dataGrupoMarca" id="dataGrupoMarca"> 
                                                    <div class="field">
                                                       <div class="textbox"><input type="text" id="txtGrupoMarca" placeholder="Grupo..."></div>
                                                       <div class="combobox hidden" id="cbGrupoMarca"></div></div>
                                                    <div class="head">
                                                        <div class="marca" id="selectedMarca">Marca seleccionada</div>
                                                    </div>
                                        </div>
                                    </div>
                                </div>
                                
                                
                            </div>
                     <!-- END ***  Marcas *** END  -->           
                            
                  
                     
                      <!-- Fraccionamiento  -->        
                            <div class="Work" id="wFraccionamiento">
                                <div class="subTitulo">
                                    <label>Fraccionamiento</label>
                                </div>
                                <div class="contentFieldFraccionamiento">
                                    <div class="subContent">
                                        <!-- Forma fisica de  -->
                                            <div id="forma_fisica" data-estado="0">
                                                <div class="label">Líquido</div>
                                            </div>
                                        
                                        <div class="search_Unidad_medida">
                                            <div class="field">
                                                <div class="label">Unidad de medida</div>
                                                <div class="textbox">
                                                    <input type="text" id="txt_search_Unidad_medida" placeholder="Ej: Galón" >
                                                </div>
                                                <div id="GrupoUnidad"></div>
                                            </div>
                                            <div id="listUnidadMedida" class="hidden">
                                              <!--  <div class="item">
                                                    <div class="unidad_medida">Galon</div>
                                                    <div class="medida">Volumen</div>
                                                </div> -->
                                            </div>
                                        </div>
                                        <div class="search_Fracciones">
                                            <div class="field">
                                                <div class="label">Fracción</div>
                                                <div class="textbox">
                                                    <input type="text" id="txtFraccion" placeholder="1/4" >
                                                </div>
                                            </div>
                                            <div class="field">
                                                <div class="label">Proporción</div>
                                                <div class="textbox">
                                                    <input type="text" id="txtProporcion" placeholder="0.25" >
                                                </div>
                                            </div>
                                            <div id="listFracciones">
                                                <div class="sector_update">
                                                    <div id="btnEliminar_fraccion" class="hidden">
                                                        <div class="label">Eliminar</div>
                                                    </div>
                                                </div>
                                                <div id="selectUnidadMedida" class="">unidad de medida</div>
                                                <div class="encabezado">
                                                        <div class="fraccion">Fracción</div>
                                                        <div class="proporcion">Proporción</div>
                                                    </div>
                                               <!-- <div class="fila">
                                                        <div class="fraccion">1/4 Galon</div>
                                                        <div class="proporcion">0.25</div>
                                                    </div> -->
                                            </div>
                                        </div>
                                        
                                        
                            <!-- END *** Datagrid unidad  *** END  --> 
                                    </div>
                                </div>
                            </div>
                         
                         
                         
                     </div>
                </div>
                 <!-- END ***  CONFIGURACIÓN  *** END -->
                 
                 
                </div>
            <!-- END *** CONTAINER DE NAVEGACIÓN *** END -->
             
             
        </section>
         <!-- END *** CONTENEDOR PRINCIPAL *** END -->
        
         </div>
        
        
    </body>
</html>

<%-- 
    Document   : proveedor
    Created on : 24-jul-2016, 15:08:24
    Author     : Zero
--%>

<%@page import = "model.vo.ProveedorVO"
        import = "model.dao.ProveedorDAO"
        import = "java.util.LinkedList"
       %> 

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Proveedor</title>
         <!-- Estilos -->
        <link rel="stylesheet" href="css/menu.css" title="Style"> 
        <link rel="stylesheet" href="css/standar.css" title="Style">
        <link rel="stylesheet" href="css/proveedor.css" title="Style"> 
        <!-- Estilos  -->
         <!-- Js -->
        <script language="JavaScript" type="text/javascript" src="js/jquery-1.9.1.js"></script>
        <script language="JavaScript" type="text/javascript" src="js/proveedor.js"></script>
        <!-- Js -->
    </head>
    <body>
        
        <div id="universe">
            
                <!-- START  *** MENU ***  *** MENU *** *** MENU *** *** MENU *** *** MENU *** START -->
        <section id="left">
             <ul id="navigationMenu">
                <li> <a class="client" href="cliente.jsp"><span>Clientes</span></a></li>
                <li><a class="provider" href="#"><span>Proveedores</span></a></li>
                <li><a class="formula" href="formulas.jsp"><span>Fórmulas</span></a></li>
                <li><a class="product" href="producto.jsp"><span>Productos</span></a></li>
                <li><a class="formula" href="inventario.jsp"><span>Inventario</span></a></li>
                <li><a class="shopping" href="compra.jsp"><span>Compras</span></a></li>
                <li><a class="sale" href="venta.jsp"><span>Ventas</span></a></li>
                <li><a class="sale" href="gastos.jsp"><span>Gastos</span></a></li>
                <li><a class="formula" href="estadistica.jsp"><span>Estadística</span></a></li>
            </ul>
        </section>
         <!-- END *** MENU ***  *** MENU *** *** MENU *** *** MENU *** *** MENU *** END -->
        
         <!-- *** START *** CONTENEDOR PRINCIPAL *** START *** -->
         <section id="center">
             <!-- TITULO DE PAGINA -->
             <div class="title">
                <div class="label">Proveedores</div>
            </div>
             <br>
             <!-- CONTAINER DE NAVEGACIÓN -->
             <div class="container">
                 
                 <!-- TABS DE NAVEGACIÓN -->    
                 <div class="tabMenu">
                    <div class="tab isSelect" id="tabRegistro">Registrar</div>
                    <div class="tab" id="tabBusqueda">Buscar</div>
                    <div class="tab" id="tabDescripcion">Descripcion</div>
                    <div class="tab">Mejores</div>
                </div>
                 <!-- END *** TABS DE NAVEGACIÓN  *** END -->
                 
                 <!-- FORMULARIO DE REGISTRO DE PROVEEDOR  --> 
               
                 <div class="frame isVisible" id="frmRegistro">
                    
                    <div class="box">
                            <div class="searchProveedor">
                                <div class="field">
                                    <div class="label">Buscar proveedor</div>
                                    <div class="textbox"><input type="text" id="txtSearchProveedor" placeholder="Cédula - Nombre"></div>
                                     <div class="combobox hidden" id="cbProveedor"></div>
                                </div>
                            </div>
                            <div class="segment">
                                <br>
                                <div class="field">
                                    <div class="label"><label for="txtRazon_social">Razón social</label></div>
                                    <div class="textbox"><input type="text" id="txtRazon_social" placeholder="Microsoft corp"></div>
                                </div>
                                <div class="field">
                                    <div class="label"><label for="txtNit">Nit</label></div>
                                    <div class="textbox"><input type="text" id="txtNit" placeholder="1038115788-1"></div>
                                </div>
                                 <div class="field">
                                    <div class="label"><label for="txtContacto">Contacto</label></div>
                                    <div class="textbox"><input type="text" id="txtContacto" placeholder="Steven Spielberg"></div>
                                </div>
                                <div class="field">
                                    <div class="label"><label for="txtCiudad">Ciudad</label></div>
                                    <div class="textbox"><input type="text" id="txtCiudad" placeholder="Caucasia"></div>
                                </div>
                                <div class="field">
                                    <div class="label"><label for="txtDireccion">Dirección</label></div>
                                    <div class="textbox"><input type="text" id="txtDireccion" placeholder="Cll 8 # 1G - 12"></div>
                                </div>
                                <div class="field">
                                    <div class="label"><label for="txtTelefono_1">Teléfono 1</label></div>
                                    <div class="textbox"><input type="text" id="txtTelefono_1" placeholder="3017752393"></div>
                                </div>
                                
                            </div>
                 
                            <!-- Segmento 2 -->
                            <div class="segment">
                                <br>
                                 <div class="field">
                                    <div class="label"><label for="txtTelefono_2">Teléfono 2</label></div>
                                    <div class="textbox"><input type="text" id="txtTelefono_2" placeholder="8381753"></div>
                                </div>
                                <div class="field">
                                    <div class="label"><label for="txtEmail">Email</label></div>
                                    <div class="textbox"><input type="text" id="txtEmail" placeholder="zeroed@gmail.com"></div>
                                </div>
                                <div class="field">
                                    <div class="label"><label for="txtBanco">Banco</label></div>
                                    <div class="textbox"><input type="text" id="txtBanco" placeholder="Bancolombia"></div>
                                </div>
                                <div class="field">
                                    <div class="label"><label for="txtTipo_cuenta">Tipo de cuenta</label></div>
                                    <div class="textbox"><input type="text" id="txtTipo_cuenta" placeholder="Ahorros"></div>
                                </div>
                                <div class="field">
                                    <div class="label"><label for="txtNumero_cuenta">Numero de cuenta</label></div>
                                    <div class="textbox"><input type="text" id="txtNumero_cuenta" placeholder="37157383001"></div>
                                </div>
                                <div class="field">
                                    <div class="label"><label for="txtTitular_cuenta">Titular de cuenta</label></div>
                                    <div class="textbox"><input type="text" id="txtTitular_cuenta" placeholder="Steve Jobs"></div>
                                </div>
                            
                            </div>
                            <div class="field" id="contentBtn">
                               <div class="button" id="btnAlmacenar">
                                   <div class="label">Almacenar</div>
                               </div>
                            </div>
                    </div>
                    
                </div>
                 
                 
                 
                 <!-- END *** FORMULARIO DE REGISTRO DE PROVEEDOR  *** END  --> 
                 
                 
                 <!-- FORMULARIO BUSQUEDA DE PROVEEDORES  -->
                 
                 <div class="frame" id="frmBusqueda">
                 
                     <!-- Caja de busqueda de proveedores -->
                     <div class="search">
                        <div class="textbox">
                            <input type="text" placeholder="Busca a tus proveedores" id="txtSearch">
                        </div>                         
                    </div>
                     
                     <!-- Items proveedores  --> 
                     <div class="item" id="zero">
                        <div class="id"><div class="nombre">Steve Jobs</div></div>
                        
                                <div class="left">
                                    <span class="telefono">301 775 23 93</span>
                                    <span class="ciudad">Caucasia</span>
                                    <div class="fecha">03/06/2016</div>
                                </div>
                                <div class="right">
                                    <div class="btnVenta"><div class="label">Venta</div></div>
                                    <div class="btnFacturas"><div class="label">Facturas</div></div>
                                </div>
                    </div>
                     
                     
                 </div>
                 
                 <!-- END *** FORMULARIO BUSQUEDA DE PROVEEDORES  *** END -->
                 
                 <!-- FORMULARIO DE DESCRIPCION -->
                    
                        <div class="frame" id="frmDescripcion">

                           <div class="descripcion">
                               <div class="proveedor">
                                   <div id="infoRazon_social">
                                       Dell
                                   </div>
                                   <div class="info">
                                       <div class="label">Nit</div>
                                       <div class="value" id="infoNit">1038115788</div>
                                   </div>
                                   <div class="info">
                                       <div class="label">Contacto</div>
                                       <div class="value" id="infoContacto">Kevin Florez</div>
                                   </div>
                                   <div class="info">
                                       <div class="label">Ciudad</div>
                                       <div class="value" id="infoCiudad">Caucasia</div>
                                   </div>
                                   <div class="info">
                                       <div class="label">Dirección</div>
                                       <div class="value" id="infoDireccion">Cra 16 # 10-23</div>
                                   </div>
                                   <div class="info">
                                       <div class="label">Telefono 1</div>
                                       <div class="value" id="infoTelefono_1">301 775 2393</div>
                                   </div>
                                   <div class="info">
                                       <div class="label">Telefono 2</div>
                                       <div class="value" id="infoTelefono_2">8381753</div>
                                   </div>
                                   <div class="info">
                                       <div class="label">Email</div>
                                       <div class="value" id="infoEmail">zeroedprogrammer@gmail.com</div>
                                   </div>
                                   <div class="info">
                                       <div class="label">Banco</div>
                                       <div class="value" id="infoBanco">Bancolombia</div>
                                   </div>
                                   <div class="info">
                                       <div class="label">Tipo de cuenta</div>
                                       <div class="value" id="infoTipo_cuenta">Ahorros</div>
                                   </div>
                                   <div class="info">
                                       <div class="label">Numero de cuenta</div>
                                       <div class="value" id="infoNumero_cuenta">37157383001</div>
                                   </div>
                                   <div class="info">
                                       <div class="label">Titular de cuenta</div>
                                       <div class="value" id="infoTitular_cuenta">Tris Cat</div>
                                   </div>
                               </div>
                               <div class="movimientos">
                                   <p> Asociar con marcas </p>
                                   <p> Que producto me vende mas</p>
                                   <p> Cada cuanto le compro</p>
                                   <p> A que tiempo se manejan los pagos</p>
                                   <p> Cuanto dinero le he compredo en el ultimo año </p>
                                   <p> Promedio de visita </p>
                                   <p> Promedio por factura </p>
                                   <p> Valor de todas las facturas </p>
                               </div>
                           </div>

                       </div>
                 
                 <!-- END *** FORMULARIO DE DESCRIPCION *** END -->
                 
                 
                 
                 
             </div>
             <!-- *** END  CONTAINER DE NAVEGACIÓN  END *** -->
         </section>
        <!-- *** END *** CONTENEDOR PRINCIPAL *** END *** -->
            
            
        </div>
        
     
        
    </body>
</html>

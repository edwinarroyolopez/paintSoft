<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <!-- JS -->
            <!-- 1. React -->
              <script src="js/jsx/react.min.js"></script>
              <script src="js/jsx/JSXTransformer.js"></script>
            <!-- 2. Jquery  -->
            <script type="text/javascript" src="js/new/administrador/jquery-3.1.1.min.js"></script>
            <script type="text/javascript" src="js/new/jquery-1.9.1.js"></script>
            <!-- 3. Client modules -->
            <script type="text/javascript" src="js/new/administrador/client-modules.js"></script>
            <!-- 4. Notify -->
            <script type="text/javascript" src="js/new/notify.js"></script>
            <!-- 5. Generals -->
            <script type="text/javascript" src="js/new/administrador/generals.js"></script>
        <!-- ## JS ## -->

        <!-- CSS -->
            <link type="text/css" rel="stylesheet" href="css/new/administrador.css" title="Style">
            <link type="text/css" rel="stylesheet" href="css/new/generals.css" title="Style">
            <link type="text/css" rel="stylesheet" href="css/new/producto.css" title="Style">
            <link type="text/css" rel="stylesheet" href="css/new/cliente.css" title="Style">
            <link type="text/css" rel="stylesheet" href="css/new/proveedor.css" title="Style">
            <link type="text/css" rel="stylesheet" href="css/new/compra.css" title="Style">
            <link type="text/css" rel="stylesheet" href="css/new/factura.css" title="Style">
            <link type="text/css" rel="stylesheet" href="css/new/controllers.css" title="Style">
        <!-- ## CSS ## -->
    </head>
    <body>

        <!-- 1. Header -->
        <section id="header">
            <div class="label">Producto</div>
        </section>

        <!-- 2. Contenedor unirversal -->
        <div id="universal" spellcheck="false">

          <!-- 2.1 Navegador izquierdo -->
            <nav id="left">
                    <ul>
                          <li>
                                <a id="nav_Productos" href="producto_new.jsp">
                                      <div class="text">
                                        <div class="circle"></div>
                                        <div class="label">Productos</div>
                                      </div>
                                  </a>
                          </li>
                          <li>
                            <a id="nav_Clientes" href="cliente_new.jsp">
                                  <div class="text">
                                            <div class="circle"></div>
                                            <div class="label">Clientes</div>
                                  </div>
                              </a>
                          </li>
                          <li>
                            <a id="nav_Proveedores" href="proveedor_new.jsp">
                                  <div class="text">
                                            <div class="circle"></div>
                                            <div class="label">Proveedores</div>
                                  </div>
                              </a>
                          </li>
                          <li>
                            <a id="nav_Compras" href="compra_new.jsp">
                                  <div class="text">
                                      <div class="circle"></div>
                                      <div class="label">Compras</div>
                                  </div>
                              </a>
                          </li>
                          <li>
                            <a id="nav_Facturas" href="factura_new.jsp">
                                  <div class="text">
                                      <div class="circle"></div>
                                      <div class="label">Facturas</div>
                                  </div>
                              </a>
                          </li>
                    </ul>
            </nav>

              <!-- Contenedor central -->
              <div id="center"></div>


        </div>



    </body>
</html>

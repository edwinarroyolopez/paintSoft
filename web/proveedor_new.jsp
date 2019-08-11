<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <!-- JS -->
            <!-- 1. React -->
            
            <!-- 2. Jquery  -->
            <script type="text/javascript" src="js/new/administrador/jquery-3.1.1.min.js"></script>
            <script type="text/javascript" src="js/new/jquery-1.9.1.js"></script>
            <!-- 3. Client modules -->
            <script type="text/javascript" src="js/new/administrador/client-modules.js"></script>
            <!-- 4. Notify -->
            <script type="text/javascript" src="js/new/notify.js"></script>
            <!-- 5. Generals -->
            <script type="text/javascript" src="js/new/administrador/generals.js"></script>
               <script type="text/javascript" src="js/jsTest.js"></script>
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
            <div class="label">Proveedor</div>
        </section>

        <!-- 2. Contenedor unirversal -->
        <div id="universal" spellcheck="false">

          <!-- 2.1 Navegador izquierdo -->
            <%@include file="components/browser.jsp" %>

              <!-- Contenedor central -->
              <div id="center">
                  <%@include file="components/venta/header_factura.jsp" %>
              </div>
              

        </div>



    </body>
</html>


  USE [paintSoft]
   GO

   SET ANSI_NULLS ON
   GO
   SET QUOTED_IDENTIFIER ON
   GO
   CREATE PROCEDURE [dbo].spd_Informe_productos_inventario
   AS
   BEGIN

   	SET NOCOUNT ON;


    select
         I.Id,
         I.Id_producto,
         P.Descripcion,
         UM.Valor as "Presentacion",
         I.Stock,
         I.Estado,
         I.Id_unidad_medida,
         I.Fecha,
         I.Fecha_modificacion,
         I.Precio_venta,
  	   I.Precio_compra
         from tblInventario I
         inner join tblProducto P on (P.Id=I.Id_producto)
         inner join tblUnidadMedida UM on (UM.Id=I.Id_unidad_medida)
  	   where I.Id = (select max(I2.Id) from tblInventario I2 where I2.Id_producto=I.Id_producto and I2.Id_unidad_medida=I.Id_unidad_medida)
  	   order by P.Id asc


   END

 -- exec spd_Informe_productos_inventario

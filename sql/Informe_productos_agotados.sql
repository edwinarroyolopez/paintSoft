
  USE [paintSoft]
   GO

   SET ANSI_NULLS ON
   GO
   SET QUOTED_IDENTIFIER ON
   GO
   CREATE PROCEDURE [dbo].spd_Informe_productos_agotados
   AS
   BEGIN

   	SET NOCOUNT ON;

    select
       I.Id,
       I.Id_producto,
       P.Descripcion,
       UM.Valor as "Presentacion",
       I.Venta,
       I.Stock,
       I.Estado,
       I.Id_unidad_medida,
       I.Fecha,
       I.Fecha_modificacion,
       I.Precio_venta
       from tblInventario I
       inner join tblProducto P on (P.Id=I.Id_producto)
       inner join tblUnidadMedida UM on (UM.Id=I.Id_unidad_medida)
       where I.Estado=0
       order by I.Stock asc


   END

 -- exec spd_Informe_productos_agotados

USE [paintSoft]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spd_read_Presentaciones]
	@pmtId_producto int
AS
BEGIN

	SET NOCOUNT ON;

			SELECT DISTINCT  um.Id as Id_unidad_medida,  um.Valor as Unidad_medida, i.Iva,
			(select i2.Id from tblInventario i2
			 where i2.Id=(select max(i3.Id) from tblInventario as i3 where i3.Id_producto=@pmtId_producto and i3.Id_unidad_medida=um.Id)  ) as Id,
			 (select i2.Stock from tblInventario i2
			 where i2.Id=(select max(i3.Id) from tblInventario as i3 where i3.Id_producto=@pmtId_producto and i3.Id_unidad_medida=um.Id)  ) as Stock,
			(select i2.Precio_venta from tblInventario i2
			 where i2.Id=(select max(i3.Id) from tblInventario as i3 where i3.Id_producto=@pmtId_producto and i3.Id_unidad_medida=um.Id) ) as Precio_venta
		FROM tblInventario as i
		INNER JOIN  tblUnidadMedida as um on (um.Id=i.Id_unidad_medida and i.Id_producto=@pmtId_producto) order by um.Id asc;

END

--exec spd_read_Presentaciones @pmtId_producto=142;

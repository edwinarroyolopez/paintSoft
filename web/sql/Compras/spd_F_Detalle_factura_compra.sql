USE [paintSoft]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[spd_F_Detalle_factura_compra] 
	/* Parámetros */
	@pmtId_encabezado_factura int
AS
BEGIN
	SET NOCOUNT ON;
		
			/* Selecciona productos en unides completas*/
		 select distinct fd.Id,fd.Id_encabezado,fd.Id_unidad,
						 fd.Cantidad,fd.Precio_unidad,fd.Descuento,
						 fd.Iva,fd.Estado,fd.Id_producto,p.Descripcion,
						 p.Codigo,um.Valor as Unidad
			from tblFacturaDetalle as fd, tblProducto as p, tblUnidadMedida as um
			where fd.Id_encabezado = @pmtId_encabezado_factura and fd.Id_producto = p.Id and 
				  fd.Id_unidad = um.Id;		  

END

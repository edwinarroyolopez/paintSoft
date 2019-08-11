USE [paintSoft]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].spd_read_Facturas_cerradas
	@pmtId_cliente int
AS
BEGIN

	SET NOCOUNT ON;

	select Id,Numero,Fecha,Forma_pago,Valor from tblFacturaEncabezadoVenta where id_cliente=@pmtId_cliente and Estado=1 order by id desc

END

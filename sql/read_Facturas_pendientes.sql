USE [paintSoft]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].spd_read_Facturas_pendientes
	@pmtId_cliente int
AS
BEGIN

	SET NOCOUNT ON;

	select Id,Numero,Fecha,Forma_pago,Valor,Saldo from tblFacturaEncabezadoVenta where id_cliente=@pmtId_cliente and Estado=0 order by id asc

END

USE [paintSoft]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].spd_read_Historia
	@pmtId_cliente int
AS
BEGIN

	SET NOCOUNT ON;

		declare @Saldo int;
		select @Saldo = Saldo from tblSaldo_cliente where Id_cliente = @pmtId_cliente;

		declare @Cerradas int;
		select @Cerradas =  count(*) from tblFacturaEncabezadoVenta where Id_cliente = @pmtId_cliente and Estado=1

		select
		     @Cerradas  as Cerradas,
			 count(*) as Pendientes,
			 CASE
				WHEN sum(Saldo) IS NOT NULL THEN sum(Saldo) ELSE 0
			END as Deuda,
			CASE
				WHEN @Saldo IS NOT NULL THEN @Saldo ELSE 0
			END as Saldo
		from tblFacturaEncabezadoVenta
		where id_cliente=@pmtId_cliente and Estado=0


END

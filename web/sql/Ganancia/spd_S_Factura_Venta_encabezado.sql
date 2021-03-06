USE [paintSoft]
GO
/****** Object:  StoredProcedure [dbo].[spd_S_Factura_Venta_encabezado]    Script Date: 06/04/2017 10:30:22 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[spd_S_Factura_Venta_encabezado]
	
	@pmtNumero text,
	@pmtId_cliente int,
	@pmtForma_pago int,
	@pmtAnticipo Float,
	@pmtVencimiento date,
	@pmtSaldo Float,
	@pmtDescuento Float,
	@pmtIva Float,
	@pmtValor Float,
	@pmtFecha date

	 
AS
BEGIN
	
	SET NOCOUNT ON;

	declare @pmtEstado bit;
	set @pmtEstado = 1;

	if(@pmtForma_pago>0)
		begin 
			set @pmtEstado = 0;		
		end


	INSERT INTO dbo.tblFacturaEncabezadoVenta (Numero, Id_cliente,Forma_pago,Anticipo,Vencimiento,Saldo,Descuento,Iva,Valor,Fecha,Estado)
	VALUES (@pmtNumero, @pmtId_cliente,@pmtForma_pago,@pmtAnticipo,@pmtVencimiento,@pmtSaldo,@pmtDescuento,@pmtIva,@pmtValor,@pmtFecha,@pmtEstado);

	declare @maxId int;
	select @maxId = max(Id) from tblFacturaEncabezadoVenta;

	INSERT INTO dbo.tblGanancia (Id_factura, Ganancia,Fecha)
	VALUES (@maxId, 0,CONVERT (date, SYSDATETIME()));


END


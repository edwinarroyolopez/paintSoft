USE [paintSoft]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spd_S_Factura_Compra_encabezado]
	
	@pmtNumero Varchar(50),
	@pmtId_proveedor int,
	@pmtForma_pago int,
	@pmtAnticipo int,
	@pmtVencimiento date,
	@pmtSaldo int,
	@pmtDescuento float,
	@pmtIva float,
	@pmtValor int,
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

	INSERT INTO dbo.tblFacturaEncabezadoCompra (Numero, Id_proveedor,Forma_pago,Anticipo,Vencimiento,Saldo,Descuento,Iva,Valor,Fecha,Estado)
						VALUES (@pmtNumero, @pmtId_proveedor,@pmtForma_pago,@pmtAnticipo,@pmtVencimiento,@pmtSaldo,@pmtDescuento,@pmtIva,@pmtValor,@pmtFecha,@pmtEstado);

	 select max(Id) from tblFacturaEncabezadoCompra;

END
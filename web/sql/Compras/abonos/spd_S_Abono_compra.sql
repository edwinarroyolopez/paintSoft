USE [paintSoft]
GO
/****** Object:  StoredProcedure [dbo].[spd_S_Abono_compra]    Script Date: 08/06/2017 09:02:06 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[spd_S_Abono_compra]
	/* Parámtros */
		@pmtId_factura int,
		@pmtValor_abono int,
		@pmtMedio varchar(50),
		@pmtReceptor varchar(50),
		@pmtResponsable varchar(50)
AS
BEGIN
	SET NOCOUNT ON;

		declare @Saldo float;

		select @Saldo = Saldo from tblFacturaEncabezadoCompra where Id = @pmtId_factura;

		set @Saldo = @Saldo - @pmtValor_abono;

		if(@Saldo = 0)
			begin /* Se procede a cerrar la factura */
					update tblFacturaEncabezadoCompra 
					set Saldo = @Saldo, Estado = 1 
					where Id = @pmtId_factura; 
			end
		else
			begin
					update tblFacturaEncabezadoCompra 
					set Saldo = @Saldo
					where Id = @pmtId_factura;
			end


			/* Setter for tblAbono compra */
				
				declare @Numero_abono varchar(50);

				select @Numero_abono =  Numero from tblFacturaEncabezadoCompra where Id=@pmtId_factura;

				select @Numero_abono = @Numero_abono+'-A'+convert(varchar(50),((select count(Id) from tblAbono_compra where Id_encabezado_compra=@pmtId_factura)+1))
				
				insert into tblAbono_compra 
					(Id_encabezado_compra,Numero,Valor,Medio,Receptor,Responsable,Fecha)values
					(@pmtId_factura,@Numero_abono,@pmtValor_abono,@pmtMedio,@pmtReceptor,@pmtResponsable,CONVERT (date, SYSDATETIME()))


			/* Falta agregar la fila de la tabla abono */
			select @Saldo as Saldo;
END

/* tblAbono_compra

	Id ---> int
	Id_encabezado_venta ---> int
	Numero	--->	varchar			---> mmddaa001-A1
	Valor	--->	int
	Receptor ---> varchar
	Responsable ---> varchar
	Fecha	--->	date
*/
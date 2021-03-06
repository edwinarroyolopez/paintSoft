USE [paintSoft]
GO
/****** Object:  StoredProcedure [dbo].[spd_F_Facturas_venta]    Script Date: 22/05/2017 04:12:45 a.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[spd_F_Facturas_venta]
AS
BEGIN
	SET NOCOUNT ON;
			
                /* Busca todas las facturas de venta */
                select fe.Id as Id_factura, fe.Numero,fe.Forma_pago,fe.Valor,fe.Saldo, fe.Estado, c.Id as Id_cliente,c.Nombre, c.Documento, c.Ciudad,c.Telefono,c.Direccion
                from tblFacturaEncabezadoVenta as fe, tblCliente as c
                where fe.Id_cliente = c.Id order by fe.Id desc;

END

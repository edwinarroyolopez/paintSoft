USE [paintSoft]
GO
/****** Object:  StoredProcedure [dbo].[spd_F_Facturas_compra]    Script Date: 04/06/2017 01:25:54 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[spd_F_Facturas_compra]
AS
BEGIN
SET NOCOUNT ON;

		            /* Busca todas las facturas de compra */
            select fe.Id as Id_factura, fe.Numero,fe.Forma_pago,fe.Fecha,fe.Valor,fe.Saldo, fe.Estado, p.Id as Id_proveedor,p.Razon_Social, p.Nit, p.Ciudad,p.Telefono_1,p.Direccion
            from tblFacturaEncabezadoCompra as fe, tblProveedor as p
            where fe.Id_proveedor = p.Id order by fe.Id desc;

END


	
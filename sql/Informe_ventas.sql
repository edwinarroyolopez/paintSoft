USE [paintSoft]
  GO

  SET ANSI_NULLS ON
  GO
  SET QUOTED_IDENTIFIER ON
  GO
  CREATE PROCEDURE [dbo].spd_Informe_ventas
  	@pmtFecha_inicial date,
 	@pmtFecha_final date
  AS
  BEGIN

  	SET NOCOUNT ON;

           select
           'Contado'as "Forma_pago",
           sum(EF.Valor) as "Valor",
           sum(G.Ganancia) as "Ganancia",
           count(*) as "Facturas",
           '' as "Fecha",
           '' as "Numero_factura",
           '' as "Cliente",
           '' as "Estado"
           from tblGanancia G
           inner join tblFacturaEncabezadoVenta EF on (EF.Id = G.Id_factura)
            where G.Fecha between @pmtFecha_inicial and @pmtFecha_final and EF.Forma_pago=0
            union all
            select
            'Credito'as "Forma_pago",
            sum(EF.Valor) as "Valor",
            sum(G.Ganancia) as "Ganancia",
            count(*) as "Facturas",
            '' as "Fecha",
            '' as "Numero_factura",
            '' as "Cliente",
            '' as "Estado"
           from tblGanancia G
           inner join tblFacturaEncabezadoVenta EF on (EF.Id = G.Id_factura)
            where G.Fecha between @pmtFecha_inicial and @pmtFecha_final  and EF.Forma_pago>0
            UNION ALL
            select
            CASE
             when EF.Forma_pago=0 then 'Contado' else 'Credito'
            END  AS "Forma_pago",
             EF.Valor as "Valor",
            G.Ganancia as "Ganancia",
            0 as "Facturas",
            EF.Fecha as "Fecha",
            EF.Numero as "Numero_factura",
            CL.Nombre as "Cliente",
            CASE
             when EF.Estado = 1 then 'Finalizada'
             when EF.Estado = 0 and EF.Vencimiento > CONVERT(date, SYSDATETIME()) then 'Activa'
             else 'Vencida'
            END AS "Estado"
           from tblGanancia G
           inner join tblFacturaEncabezadoVenta EF on (EF.Id = G.Id_factura)
           left join tblCliente CL on (CL.Id = EF.Id_cliente)
           where G.Fecha between @pmtFecha_inicial and @pmtFecha_final

  END

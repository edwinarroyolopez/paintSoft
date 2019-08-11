USE [paintSoft]
GO
/****** Object:  StoredProcedure [dbo].[spd_Informe_facturas_credito]    Script Date: 31/03/2018 6:52:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
   CREATE PROCEDURE [dbo].[spd_Informe_facturas_credito]
   	@pmtFecha_inicial date,
  	@pmtFecha_final date
   AS
   BEGIN

   	SET NOCOUNT ON;

    select
      '' as "Fecha",
      sum(EF.Valor) as "Valor",
      sum(EF.Saldo) as "Saldo",
      convert(varchar,count(*)) as "Numero_factura",
      sum(G.Ganancia) as "Ganancia",
      '' as "Cliente",
      '' as "Estado",
      0 as  "Abonos",
      '' as "Ultimo_abono",
      0 as "Valor_ultimo_abono"
      from tblGanancia G
      inner join tblFacturaEncabezadoVenta EF on (EF.Id = G.Id_factura)
   		where G.Fecha between @pmtFecha_inicial and  @pmtFecha_final and EF.Forma_pago>0 and EF.Estado = 0
	  union all
	  select
      EF.Fecha as "Fecha",
      EF.Valor as "Valor",
      EF.Saldo as "Saldo",
      EF.Numero as "Numero_factura",
      0 as "Ganancia",
      CL.Nombre as "Cliente",
      CASE
       when EF.Estado = 0 and EF.Vencimiento > CONVERT(date, SYSDATETIME()) then 'Activa'
       else 'Vencida'
      END AS "Estado",
      (select count(*) from tblAbono_venta A where A.Id_encabezado_venta=EF.Id) as "Abonos",
      CASE
        WHEN  (select count(*) from tblAbono_venta A where A.Id_encabezado_venta=EF.Id) > 0 THEN
          (select CONVERT(VARCHAR, A.Fecha) from tblAbono_venta A where A.Id = (select max(A1.Id) from tblAbono_venta A1 where A1.Id_encabezado_venta=EF.Id ))
          ELSE 'Nunca'
      END AS "Ultimo_abono",
      CASE
        WHEN  (select count(*) from tblAbono_venta A where A.Id_encabezado_venta=EF.Id) > 0 THEN
			(select A.Valor from tblAbono_venta A where A.Id = (select max(A1.Id) from tblAbono_venta A1 where A1.Id_encabezado_venta=EF.Id ))
          ELSE 0
      END AS "Valor_ultimo_abono"
      from tblGanancia G
      inner join tblFacturaEncabezadoVenta EF on (EF.Id = G.Id_factura)
      left join tblCliente CL on (CL.Id = EF.Id_cliente)
   		where G.Fecha between @pmtFecha_inicial and  @pmtFecha_final and EF.Forma_pago>0 and EF.Estado = 0 order by Fecha asc


   END

 -- exec spd_Informe_facturas_credito @pmtFecha_inicial='2018-02-05', @pmtFecha_final='2018-03-05'

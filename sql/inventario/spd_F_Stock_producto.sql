USE [paintSoft]
GO
/****** Object:  StoredProcedure [dbo].[spd_F_Stock_producto]    Script Date: 02/04/2018 4:25:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[spd_F_Stock_producto]

	@pmtControl int,
	@pmtId_producto int,
	@pmtId_medida int

AS
BEGIN

	SET NOCOUNT ON;

	declare @Existe_Item int;
	declare @num int;
	declare @id_grupo int;

	select @Existe_Item =  count(*) from tblInventario where Id_producto = @pmtId_producto;


		if(@pmtControl=0)
			begin
				set @Existe_Item = 0;
			end


	If( @Existe_Item = 0 )
		BEGIN/* No existe el item */

			declare @Stock int;
			set @Stock=0;

			select @id_grupo = Id_grupo from tblProducto where Id = @pmtId_producto;
			select @num = count(*) from tblUnidadMedida where Id_grupo =@id_grupo;

			if(@num=0)
				begin
					/* Aquí debo encontrar el valor de inventario para los
					 productos que no tienen unidad de medida */


					 /* Ahora debo saber si este producto sin unidad de medida tiene valores en inventario (EXISTE) */
					 declare @Existe int;
					 select @Existe =  count(*) from tblInventario where Id_producto = @pmtId_producto;

					 if(@Existe>0)
						begin
							/* Esto me permite acceder a la cantidad de un producto que no tiene unidad de medida */
							SELECT 0 as Id_unidad_medida, i.Id as Id, i.Stock as Stock,
											  '' as Unidad_medida, i.Precio_venta as Precio_venta, i.Precio_compra as Precio_compra, i.Iva
							FROM tblInventario as i
							WHERE  i.Id_producto=@pmtId_producto and i.Id_unidad_medida = 0;

						end
					else
						begin
								/* Debo mandar valores en 0 para e */

							SELECT 0 as Id_unidad_medida, 0 as Id, 0 as Stock,'' as Unidad_medida, 0 as Precio_venta,  0 as Precio_compra, 0 as Iva;

						end


				end
			else
				begin
					select distinct top (@num) 0 as Id, @Stock as Stock, Id as Id_unidad_medida, Valor as Unidad_medida, 0 as Precio_venta,  0 as Precio_compra, 0 as Iva
					from tblUnidadMedida where Id_medida = @pmtId_medida and Id_grupo = @id_grupo;
				end


		END
	ELSE
		BEGIN

			 /* Trae solo los valores de las unidades de medida que tengan valores en inventario */

			SELECT DISTINCT   um.Id as Id_unidad_medida, i.Id as Id, i.Stock as Stock,  um.Valor as Unidad_medida, i.Precio_venta as Precio_venta, i.Precio_compra as Precio_compra, i.Iva
			FROM tblInventario as i, tblUnidadMedida as um
			WHERE um.Id=i.Id_unidad_medida and i.Id_producto=@pmtId_producto order by um.Id asc;

			/* QUE PUTO CODIGO, SOY EL MEJOR */

		END


END

--exec spd_F_Stock_producto @pmtControl=0, @pmtId_producto=142, @pmtId_medida=18;

/* add precio compra - 02-04-2018 */
USE [paintSoft]
GO
/****** Object:  StoredProcedure [dbo].[spd_S_Inventario]    Script Date: 02/04/2018 4:48:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[spd_S_Inventario]

	@pmtId_producto int,
	@pmtId_unidad_medida int,
	@pmtCantidad int,
	@pmtPrecio_venta int,
  @pmtPrecio_compra int,
	@pmtIva numeric(2,2)

AS
BEGIN

	SET NOCOUNT ON;

		DECLARE @Existe int;
		DECLARE @Stock int;
		DECLARE @Perdida int;

		SELECT  @Existe = count(*)
		FROM tblInventario
		WHERE Id_producto = @pmtId_producto and Id_unidad_medida = @pmtId_unidad_medida;

		IF(@Existe = 0)
			BEGIN /* No existe producto en inventario --> Inserta un registro */

				INSERT INTO dbo.tblInventario (Id_producto,Id_unidad_medida,Compra,Venta,Stock,Perdida,Estado,Precio_venta,Precio_compra,Iva,Fecha,Fecha_modificacion)
							VALUES(@pmtId_producto,@pmtId_unidad_medida,0,0,@pmtCantidad,0,1,@pmtPrecio_venta,@pmtPrecio_compra,@pmtIva,CONVERT (date, SYSDATETIME()), CONVERT (date, SYSDATETIME()));
			END
		ELSE
			BEGIN /* El producto existe ---> Revisar estado */
				/* Tiene id_producto debo seleccionar el maximo id: */

				DECLARE @maxId int;
				SELECT @maxId = count(*) FROM tblInventario
				WHERE Id_producto = @pmtId_producto and Id_unidad_medida = @pmtId_unidad_medida and Estado = 0;

							if(@maxId=0)
								begin /* Existe producto: Estado en 1 */

										/* Selecciona el maximo Id ---> Nota: Estado --> 1 */
										SELECT @maxId = max(Id) FROM tblInventario
										WHERE Id_producto = @pmtId_producto and Id_unidad_medida = @pmtId_unidad_medida;


										/* Establecer perdida  -- Actualizar */
										declare @cantidad_anterior int, @perdida_anterior int;

										select @cantidad_anterior = Stock, @perdida_anterior = Perdida
										from tblInventario where Id = @maxId;

												/* Pérdida */
												if(@cantidad_anterior>@pmtCantidad)
													begin /* Si disminuye la cantidad entrante */
														set @Perdida = @cantidad_anterior - @pmtCantidad;
													end
												else
													begin/* Se conserva la pérdida anterior */
														set @Perdida = @perdida_anterior;
													end
													/* Actualiza valores de la tabla inventario */
												UPDATE tblInventario
												set  Perdida = @Perdida,
													 Stock = @pmtCantidad,
													 Precio_venta = @pmtPrecio_venta,
													 Iva = @pmtIva,
													 Fecha_modificacion = CONVERT (date, SYSDATETIME())
												where Id = @maxId;

								end
							else
								begin /* Existe producto: Estado en 0  ---> Actualizar */

								SELECT @maxId = max(Id) FROM tblInventario
								WHERE Id_producto = @pmtId_producto and Id_unidad_medida = @pmtId_unidad_medida and Estado = 0;


								SELECT @Stock = Stock from tblInventario where Id = @maxId;

								SET @Perdida = @Stock - @pmtCantidad; /* Calcular perdida */
								SET @Stock = @Stock + @pmtCantidad;    /* Aumento valor de Stock */

									UPDATE tblInventario
									SET Stock = @pmtCantidad,
										Perdida = @Perdida,
										Estado = 1,
										Precio_venta =@pmtPrecio_venta,
                    Precio_compra =@pmtPrecio_compra,
										Iva =@pmtIva,
										Fecha_modificacion =  CONVERT (date, SYSDATETIME())
									WHERE Id = @maxId;

								end

				/*
					Situación Uno: El 'Estado' está en 1 ---> Ya se hizo inventario al producto y no se ha
					realizado ninguna compra, ni venta

					<----- Debo crear un nuevo registro de inventario  ----->

					Situación Dos: El 'Estado' está en 0 ---> No se ha realizado inventario al producto

					<--- Debo actualizarlo con los nuevos datos --->
				*/

			END

END

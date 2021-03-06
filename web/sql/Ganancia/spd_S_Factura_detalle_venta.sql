USE [paintSoft]
GO
/****** Object:  StoredProcedure [dbo].[spd_S_Factura_detalle_venta]    Script Date: 06/04/2017 01:13:04 p.m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[spd_S_Factura_detalle_venta]
	
	@pmtId_encabezado int,
	@pmtId_producto int,
	@pmtId_unidad int,
	@pmtTipo int,
	@pmtId_fraccion int,
	@pmtCantidad int,
	@pmtPrecio_unidad Float,
	@pmtDescuento Float,
	@pmtIva Float,
	@pmtEstado bit,
	@pmtRestante float,
	@pmtResta_inventario int

AS
BEGIN	
	SET NOCOUNT ON;

			declare @Existe_Item int, @Id_encabezado int, @Venta int,@Stock int;

			select @Id_encabezado = max(Id) from tblFacturaEncabezadoVenta;

			INSERT INTO dbo.tblFacturaDetalleVenta(Id_encabezado_venta, Id_producto,Id_unidad,Tipo,Id_fraccion,Cantidad,Precio_unidad,Descuento,Iva,Estado)
			VALUES (@Id_encabezado, @pmtId_producto,@pmtId_unidad,@pmtTipo,@pmtId_fraccion,@pmtCantidad,@pmtPrecio_unidad,@pmtDescuento,@pmtIva,@pmtEstado);
			/* Id fraccion puedo guardarlo como 0 */


			/* Ganancia */
						declare @maxIdCompra int, @maxIdInventario int,
						 @Ganancia int, @Diferencia float, @Precio_venta_inventario int;


						 /* Id usado para obtener precio de venta del producto */
						select @maxIdInventario = max(Id) from tblInventario 
						where Id_producto = @pmtId_producto and Id_unidad_medida = @pmtId_unidad;
						
						select @Precio_venta_inventario = Precio_venta from tblInventario where Id = @maxIdInventario;  

						select @maxIdCompra = max(Id) 
						from tblFacturaDetalle 
						where Id_producto = @pmtId_producto and Id_unidad = @pmtId_unidad;
				
						/* Se coloca por defecto en cero y cambia, si el producto se ha ingresado a inventario
							por medio de una factura */
						set @Diferencia = 0;
							
							/* Establece si este producto se ha comprado alguna vez o no */
							if(@maxIdCompra>0)
								begin/* Obtiene el margen de ganancia real del producto*/

										declare @Precio_compra float;

										select @Precio_compra = Precio_unidad 
										from tblFacturaDetalle where Id = @maxIdCompra;
										
										/* Calcula precio de compra de fracciones o gramos */
										if(@pmtTipo>0)
											begin /* Fraccion */
												/* Hallar proporcion */
													declare @proporcion float;
													
													select @proporcion = proporcion 
													from tblFraccionamiento where Id = @pmtId_fraccion;

														if(@proporcion=1)
															begin/* Gramo: Peso */
																declare @peso int;
																select @peso = peso from tblPeso 
																where Id_producto = @pmtId_producto and Id_unidad_medida = @pmtId_unidad;

																/* Calcula el precio de compra de cada gramo */
																set @Precio_compra = (@Precio_compra/@peso);
															end
														else
															begin/* Fración proporcionada normalmente 0 - 0.999 */
															/* Calcula el precio de compra de la fracción */
																set @Precio_compra = @Precio_compra*@proporcion;
															end
											end/* Fin tipo */

										/* Calcula margen de ganancia real teniendo en cuenta el precio de venta final */
										set @Diferencia = @pmtPrecio_unidad - @Precio_compra;
								end
									/* Sekecciona la ganancia acumulada de la factura */
									select @Ganancia = Ganancia from tblGanancia where Id_factura = @Id_encabezado;

									if(@Diferencia=0)
										begin/* Calcula diferencia: Precio venta / 19(Iva) + 100(%) + 25(Ganancia) */
											set @Diferencia = @pmtPrecio_unidad - @Precio_venta_inventario*100/(100 + (@pmtIva*100)+25);
										end

									/* Acumula Ganancia final de la factura */
								set @Ganancia = @Ganancia + @Diferencia*@pmtCantidad;
									
									/* Actualiza ganancia en esa factura */
									update tblGanancia set Ganancia = @Ganancia 
									where Id_factura = @Id_encabezado;
			
			if(@pmtTipo>0)
					begin/* Fraccion: Solo inserto en esta tabla si el registro corresponde a una fracción */
						
						/* Items empezados: 1. Verificar si existe */

									select @Existe_Item = count(*) 
									from tblProductoEmpezado
									where Id_producto = @pmtId_producto and Id_unidad_medida = @pmtId_unidad;

									if(@Existe_Item>0)
										begin/* Item está registrado en la tabla: Debemos actualizar */
											

											declare @Estado int;
											
											if(@pmtRestante>0)/*  */
												begin
													set @Estado = 1;									
												end
											else
												begin
													set @Estado = 0;
											end

											
											UPDATE tblProductoEmpezado
											SET Restante = @pmtRestante,
												Estado   = @Estado,
												Fecha_modificacion = CONVERT (date, SYSDATETIME())
											WHERE Id_producto = @pmtId_producto and Id_unidad_medida = @pmtId_unidad;


											if(@pmtResta_inventario>0)/* Restar de inventario  */
												begin
													set @pmtCantidad = @pmtResta_inventario;
												end
											else/* No hay nada que restar */
												begin
													set @pmtCantidad = 0;
												end

										end
									else
										begin/* No existe: Hay que insertar */
					
											INSERT INTO dbo.tblProductoEmpezado(Id_producto,Id_unidad_medida,Restante,Estado,Fecha_apertura,Fecha_modificacion)
											VALUES (@pmtId_producto,@pmtId_unidad,@pmtRestante,1,CONVERT (date, SYSDATETIME()),CONVERT (date, SYSDATETIME()));
					
									end
					end
			
											declare @Existe_disponibilidad_inventario int;

											select @Existe_disponibilidad_inventario = count(*) from tblInventario 
											where Id_producto = @pmtId_producto and Id_unidad_medida = @pmtId_unidad and Estado = 0;

											if(@Existe_disponibilidad_inventario>0)
												begin
													select @Venta = Venta, @Stock = Stock  from tblInventario
													where Id_producto = @pmtId_producto and Id_unidad_medida = @pmtId_unidad and Estado = 0;

													set @Venta = @Venta + @pmtCantidad;
													set @Stock = @Stock - @pmtCantidad;


													UPDATE tblInventario 
													SET Venta = @Venta,
														Stock = @Stock
													WHERE Id_producto = @pmtId_producto and Id_unidad_medida = @pmtId_unidad and Estado = 0;

												end
												else
													begin
														declare @maxId int

														/* Selecciono maximo Id del ultimo inventario a este producto */
														select @maxId = max(Id) from tblInventario 
														WHERE Id_producto = @pmtId_producto and Id_unidad_medida = @pmtId_unidad and Estado = 1;

															/* Variables a utilizar */
															declare @Precio_venta int,
															@Iva numeric(2,2)

															/* Seteo en variables valores del ultimo inventario */
															SELECT @Stock = Stock, @Precio_venta = Precio_venta, @Iva = Iva FROM tblInventario 
															WHERE  Id = @maxId;

															/* Valores de venta y resta de inventario */
															set @Venta = @pmtCantidad;
															set @Stock = @Stock - @pmtCantidad;

															/* Inserto una nueva fila pero le cambio el estado a 0, para que me permita descontar */
														INSERT INTO dbo.tblInventario (Id_producto,Id_unidad_medida,Compra,Venta,Stock,Perdida,Estado,Precio_venta,Iva,Fecha,Fecha_modificacion)
														VALUES(@pmtId_producto,@pmtId_unidad,0,@Venta,@Stock,0,0,@Precio_venta,@Iva, CONVERT (date, SYSDATETIME()), CONVERT (date, SYSDATETIME()))

													end



END

							
			select distinct fd.Id,fd.Id_encabezado_venta,fd.Id_unidad,fd.Tipo,
							fd.Id_fraccion,fd.Cantidad,fd.Precio_unidad,fd.Descuento,
							fd.Iva,fd.Estado,fd.Id_producto,fd.Id_formula,p.Descripcion,
							p.Codigo,um.Valor as Unidad
			from tblFacturaDetalleVenta as fd, tblProducto as p, tblUnidadMedida as um
			where fd.Id_encabezado_venta = 2845 and fd.Id_producto = p.Id and fd.Id_unidad = um.Id

			UNION
										
		select distinct fd.Id,fd.Id_encabezado_venta,0 as Id_unidad,fd.Tipo,
							0 as Id_fraccion,fd.Cantidad,fd.Precio_unidad,fd.Descuento,
						fd.Iva,fd.Estado,0 as Id_producto,fd.Id_formula,
							fm.Descripcion as Descripcion,
						'FORMULA'Codigo,'unidad' as Unidad
		from tblFacturaDetalleVenta as fd,  tblFormula as fm
		where fd.Id_encabezado_venta = 2845 and fm.Id = fd.Id_formula and Tipo=3;
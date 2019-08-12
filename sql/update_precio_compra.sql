UPDATE I 
    SET I.Precio_compra = IP.Precio_compra
    FROM tblInventario as I
INNER JOIN tblInventario AS IP ON (IP.Id_producto=I.Id_producto AND IP.Id_unidad_medida=I.Id_unidad_medida )
WHERE  IP.Id = (select max(I2.Id) from tblInventario I2 where I2.Id_producto=IP.Id_producto and I2.Id_unidad_medida=IP.Id_unidad_medida and I2.Precio_compra>0  AND I2.Precio_compra is not null)
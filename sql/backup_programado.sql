USE paintSoft;
GO
declare @fecha varchar(MAX)
declare @archivo varchar(MAX)
set @fecha = CONVERT(VARCHAR(20),GETDATE(),112) + '_' + REPLACE(CONVERT(VARCHAR(20),GETDATE(),108),':','')
set @archivo = 'D:\paintSoft\backups\paintSoft'+@fecha+'.bak';
BACKUP DATABASE paintSoft
TO DISK = @archivo
 WITH FORMAT,
 MEDIANAME ='D_SQLServersBackups',
 NAME = 'Full Backup de DB_PaintSoft';
GO
-- https://www.youtube.com/watch?v=3mUbKSd1yq8
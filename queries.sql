
/*
SELECT
* 
FROM
descripciones_programas
GO


select * FROM   INFORMATION_SCHEMA.Columns where table_name = 'descripciones_programas';


SELECT
  *
FROM
  INFORMATION_SCHEMA.TABLES;
GO 


/*exec sp_columns incapacidad*/

/*
ALTER TABLE cronicos
ADD CONSTRAINT PK_cronicos PRIMARY KEY (id);


select *
from INFORMATION_SCHEMA.COLUMNS
where TABLE_NAME='cronicos'

select *
from INFORMATION_SCHEMA.COLUMNS
where TABLE_NAME='TSIC_DATOS_COMUNES'


SELECT
  *
FROM
  INFORMATION_SCHEMA.TABLES
GO
*/

-- Get a list of tables and views in the current database
SELECT table_catalog [database], table_schema [schema], table_name name, table_type type
FROM INFORMATION_SCHEMA.TABLES
GO
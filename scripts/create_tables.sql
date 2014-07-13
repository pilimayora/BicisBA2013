CREATE TABLE recorridos_2013 
(
trip_id INT NOT NULL AUTO_INCREMENT,
usuario_id INT NOT NULL,
bicicleta_id INT NOT NULL,
origen_fecha DATETIME,
origen_estacion_id INT,
origen_nombre VARCHAR(200),
destino_fecha DATETIME,
destino_estacion_id INT,
destino_nombre VARCHAR(200),
tiempo_uso INT,
PRIMARY KEY ( trip_id )
);

CREATE TABLE `estaciones` 
(
estacion_id INT NOT NULL, 
estacion_nombre VARCHAR(100),
latitud FLOAT(10,6),
longitud FLOAT(10,6),
PRIMARY KEY ( estacion_id )
);

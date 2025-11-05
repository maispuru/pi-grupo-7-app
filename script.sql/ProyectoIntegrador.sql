CREATE SCHEMA proyectoIntegrador ;
USE proyectoIntegrador; 

CREATE TABLE usuarios (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
email VARCHAR (500) NOT NULL,
contrasena VARCHAR (500) NOT NULL,
foto_perfil  VARCHAR (500), 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deleted_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP

);

CREATE TABLE productos (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
id_usuario  INT UNSIGNED ,
imagen_archivo  VARCHAR(500),
nombre VARCHAR(500) NOT NULL,
descripcion TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deleted_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

 FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE comentarios(
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
id_usuario  INT UNSIGNED,
id_producto  INT UNSIGNED, 
comentario TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
deleted_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,

 FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
 FOREIGN KEY (id_producto) REFERENCES productos(id)
);


-- INSERT 

INSERT INTO usuarios (id,email,contrasena, foto_perfil, created_at, updated_at, deleted_at ) VALUES ( DEFAULT, "mariaaspuru@gmail.com", "hola342", "https://i.pinimg.com/originals/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg?nii=t", DEFAULT, DEFAULT, DEFAULT );
INSERT INTO usuarios (id,email,contrasena, foto_perfil, created_at, updated_at, deleted_at ) VALUES ( DEFAULT, "rvillafane@udesa.edu.ar", "chau123", "https://i.pinimg.com/originals/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg?nii=t", DEFAULT,DEFAULT,DEFAULT);
INSERT INTO usuarios (id,email,contrasena, foto_perfil, created_at, updated_at, deleted_at ) VALUES ( DEFAULT, "mateogonzales@gmail.com", "HomeroyBart",  "https://i.pinimg.com/originals/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg?nii=t", DEFAULT , DEFAULT , DEFAULT);
INSERT INTO usuarios (id,email,contrasena, foto_perfil, created_at, updated_at, deleted_at ) VALUES ( DEFAULT, "federicosantos@gmail.com","Lisa200", "https://i.pinimg.com/originals/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg?nii=t", DEFAULT, DEFAULT, DEFAULT);
INSERT INTO usuarios (id,email,contrasena, foto_perfil, created_at, updated_at, deleted_at ) VALUES ( DEFAULT, "matiasblousson@gmail.com", "udesa222", "https://i.pinimg.com/originals/15/0f/a8/150fa8800b0a0d5633abc1d1c4db3d87.jpg?nii=t", DEFAULT, DEFAULT, DEFAULT);


INSERT INTO productos VALUES (DEFAULT,3, "https://www.apple.com/la/iphone/home/images/meta/iphone__cud4q04omsuq_og.png", "iPhone 11 64GB", "Doble camara, Diversos colores" , DEFAULT, DEFAULT , DEFAULT);
INSERT INTO productos VALUES (DEFAULT, 4 , "https://www.apple.com/la/iphone/home/images/meta/iphone__cud4q04omsuq_og.png", "iPhone 12 64GB", "Version mejorada del iphone 11, mejor bateria" , DEFAULT, DEFAULT , DEFAULT);
INSERT INTO productos VALUES (DEFAULT, 5 , "https://www.apple.com/la/iphone/home/images/meta/iphone__cud4q04omsuq_og.png", "iPhone 12 mini 64GB", "Tamaño reducido, 5G" , DEFAULT, DEFAULT , DEFAULT);
INSERT INTO productos VALUES (DEFAULT, 1 , "https://www.apple.com/la/iphone/home/images/meta/iphone__cud4q04omsuq_og.png", "iPhone 13 128GB", "Reconocimiento facial y buena batería" , DEFAULT, DEFAULT , DEFAULT);
INSERT INTO productos VALUES (DEFAULT, 2 , "https://www.apple.com/la/iphone/home/images/meta/iphone__cud4q04omsuq_og.png", "iPhone 14 128GB", "Cámara mejorada" , DEFAULT, DEFAULT , DEFAULT);
INSERT INTO productos VALUES (DEFAULT, 3 , "https://www.apple.com/la/iphone/home/images/meta/iphone__cud4q04omsuq_og.png", "iPhone 14 Plus 128GB", "Pantalla mas grande y gran batería" , DEFAULT, DEFAULT , DEFAULT);
INSERT INTO productos VALUES (DEFAULT, 2 , "https://www.apple.com/la/iphone/home/images/meta/iphone__cud4q04omsuq_og.png", "iPhone 15 128GB", " tiene tipo USB-C" , DEFAULT, DEFAULT , DEFAULT);
INSERT INTO productos VALUES (DEFAULT, 2 , "https://www.apple.com/la/iphone/home/images/meta/iphone__cud4q04omsuq_og.png", "iPhone 15 Pro 256GB", "Titanio y muchos colores" , DEFAULT, DEFAULT , DEFAULT);
INSERT INTO productos VALUES (DEFAULT, 2 , "https://www.apple.com/la/iphone/home/images/meta/iphone__cud4q04omsuq_og.png", "iPhone 13 mini 128GB", "Pequeño y potente" , DEFAULT, DEFAULT , DEFAULT);
INSERT INTO productos VALUES (DEFAULT, 5 , "https://www.apple.com/la/iphone/home/images/meta/iphone__cud4q04omsuq_og.png", "iPhone 14 Pro 128GB" , "Mejor definicion y cámaras Pro." , DEFAULT, DEFAULT , DEFAULT);


INSERT INTO comentarios VALUES (DEFAULT, 1 , 1, "La batería me dura todo el día." , DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 3 , 1, "Funciona muy bien." , DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 2 , 1, "Excelente producto, me encanta este modelo." , DEFAULT, DEFAULT, DEFAULT);

INSERT INTO comentarios VALUES (DEFAULT, 4 , 2, "Funciona con mucha velocidad",  DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 3 , 2, "No me gusto el nuevo diseño" ,  DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 1 , 2, "Deberia tener mas memoria" ,  DEFAULT, DEFAULT, DEFAULT);

INSERT INTO comentarios VALUES (DEFAULT, 1 , 3, "Tamaño chico y cómodo" ,  DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 2 , 3, "Batería justa pero ok" ,  DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 5 , 3, "El temaño es ideal" ,  DEFAULT, DEFAULT, DEFAULT);


INSERT INTO comentarios VALUES (DEFAULT, 4, 4, "La calidad de sonido es sorprendente", DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 2, 4, "El teclado responde muy bien", DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 5, 4, "Me encanta la funcionalidad del reconocimiento facial", DEFAULT, DEFAULT, DEFAULT);


INSERT INTO comentarios VALUES (DEFAULT, 1, 5, "Muy cómodo para largas horas", DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 3, 5, "Llega al final del día la bateria", DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 4, 5, "El material se siente resistente", DEFAULT, DEFAULT, DEFAULT);


INSERT INTO comentarios VALUES (DEFAULT, 2, 6, "La batería es un espectáculo", DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 5, 6, "Pantalla grande cómoda", DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 1, 6, "Muy estable para estudiar", DEFAULT, DEFAULT, DEFAULT);


INSERT INTO comentarios VALUES (DEFAULT, 2, 7, "La pantalla mas grande esta muy bien ", DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 3, 7, "Fotos increíbles", DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 5, 7, "Se nota la mejor definicion", DEFAULT, DEFAULT, DEFAULT);


INSERT INTO comentarios VALUES (DEFAULT, 1, 8, "USB-C súper práctico", DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 3, 8, "Me gusto mucho este modelo", DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 4, 8, "Mi celular favorito", DEFAULT, DEFAULT, DEFAULT);


INSERT INTO comentarios VALUES (DEFAULT, 1, 9, "Mucho mejor que el 12 mini", DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 2, 9, "Liviano y potente", DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 5, 9, "La camara anda muy bien", DEFAULT, DEFAULT, DEFAULT);


INSERT INTO comentarios VALUES (DEFAULT, 3, 10, "La funcion de la camara es genial", DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 4, 10, "Edito y grabo sin problemas", DEFAULT, DEFAULT, DEFAULT);
INSERT INTO comentarios VALUES (DEFAULT, 1, 10, "Tamaño comodo para leer", DEFAULT, DEFAULT, DEFAULT);
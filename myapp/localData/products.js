const productsData = {
  productos: [
    {
      id: 1,
      nombre: "iPhone 11 64GB",
      descripcion: "Doble cámara. Varios colores.",
      imagen: "/images/products/iphone-11.jpeg",
      idUsuario: 1,
      comentarios: [
        { usuario: "Maria",   comentario: "Funciona muy bien",               fotoPerfil: "/images/user/imagen-mujer.jpeg" },
        { usuario: "Rosario", comentario: "La batería me dura todo el día.", fotoPerfil: "/images/user/imagen-mujer.jpeg" }
      ]
    },
    {
      id: 2,
      nombre: "iPhone 12 64GB",
      descripcion: "Más rápido. Mejor batería.",
      imagen: "/images/products/iphone-12-mini.jpeg",
      idUsuario: 3,
      comentarios: [
        { usuario: "María",  comentario: "Velocidad excelente.", fotoPerfil: "/images/user/imagen-mujer.jpeg" },
        { usuario: "Matias", comentario: "No me gustó el diseño.", fotoPerfil: "/images/user/imagen-varon.jpeg" }
      ]
    },
    {
      id: 3,
      nombre: "iPhone 12 mini 64GB",
      descripcion: "Tamaño reducido. 5G.",
      imagen: "/images/products/iphone-12.jpeg",
      idUsuario: 6,
      comentarios: [
        { usuario: "Martin",  comentario: "Chico y cómodo.",    fotoPerfil: "/images/user/imagen-varon.jpeg" },
        { usuario: "Rosario", comentario: "Batería justa, ok.",  fotoPerfil: "/images/user/imagen-mujer.jpeg" }
      ]
    },
    {
      id: 4,
      nombre: "iPhone 13 128GB",
      descripcion: "Face ID y buena batería.",
      imagen: "/images/products/iphone-13.jpeg",
      idUsuario: 2,
      comentarios: [
        { usuario: "Francisco", comentario: "Face ID muy cómodo.", fotoPerfil: "/images/user/imagen-varon.jpeg" },
        { usuario: "Nico",      comentario: "Llega al final del día.", fotoPerfil: "/images/user/imagen-varon.jpeg" }
      ]
    },
    {
      id: 5,
      nombre: "iPhone 13 pro 128GB",
      descripcion: "Pequeño y potente.",
      imagen: "/images/products/iphone-13pro.jpeg",
      idUsuario: 4,
      comentarios: [
        { usuario: "Felix",  comentario: "Ideal bolsillo.",   fotoPerfil: "/images/user/imagen-varon.jpeg" },
        { usuario: "Matias", comentario: "Cámara muy buena.", fotoPerfil: "/images/user/imagen-varon.jpeg" }
      ]
    },
    {
      id: 6,
      nombre: "iPhone 14 128GB",
      descripcion: "Cámara mejorada.",
      imagen: "/images/products/iphone-14.jpeg",
      idUsuario: 7,
      comentarios: [
        { usuario: "Matias",   comentario: "Nocturnas mejores.", fotoPerfil: "/images/user/imagen-varon.jpeg" },
        { usuario: "Federico", comentario: "Muy estable.",       fotoPerfil: "/images/user/imagen-varon.jpeg" }
      ]
    },
    {
      id: 7,
      nombre: "iPhone 14 Plus 128GB",
      descripcion: "Pantalla grande. Gran batería.",
      imagen: "/images/products/iphone14-plus.jpeg",
      idUsuario: 5,
      comentarios: [
        { usuario: "Brian",    comentario: "Batería espectacular.", fotoPerfil: "/images/user/imagen-varon.jpeg" },
        { usuario: "Valentin", comentario: "Pantalla muy cómoda.",  fotoPerfil: "/images/user/imagen-varon.jpeg" }
      ]
    },
    {
      id: 8,
      nombre: "iPhone 14 Pro 128GB",
      descripcion: "Mejor definición. Cámaras Pro.",
      imagen: "/images/products/iphone-14pro.jpeg",
      idUsuario: 2,
      comentarios: [
        { usuario: "Valentin", comentario: "Fotos increíbles.",      fotoPerfil: "/images/user/imagen-varon.jpeg" },
        { usuario: "Rafael",   comentario: "Se nota la definición.", fotoPerfil: "/images/user/imagen-varon.jpeg" }
      ]
    },
    {
      id: 9,
      nombre: "iPhone 15 128GB",
      descripcion: "Ahora con USB-C.",
      imagen: "/images/products/iphone-15.jpeg",
      idUsuario: 6,
      comentarios: [
        { usuario: "Maria",   comentario: "USB-C muy práctico.", fotoPerfil: "/images/user/imagen-mujer.jpeg" },
        { usuario: "Rosario", comentario: "Me gustó este modelo.", fotoPerfil: "/images/user/imagen-mujer.jpeg" }
      ]
    },
    {
      id: 10,
      nombre: "iPhone 15 Pro 256GB",
      descripcion: "Titanio y colores nuevos.",
      imagen: "/images/products/iphone-15pro.jpeg",
      idUsuario: 3,
      comentarios: [
        { usuario: "Matias", comentario: "Edito video sin drama.", fotoPerfil: "/images/user/imagen-varon.jpeg" },
        { usuario: "Martin", comentario: "Liviano y potente.",     fotoPerfil: "/images/user/imagen-varon.jpeg" }
      ]
    }
  ]
};

module.exports = productsData;

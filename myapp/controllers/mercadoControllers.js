const db = require("../database/models");
const bcryptjs = require("bcryptjs");
const Op = db.Sequelize.Op;

let relacion = {
  include: [
    { association: "usuario" },
    {
      association: "comentarios",
      include: [{ association: "usuario" }],
    },
  ],
};

const mercadoController = {
  index: function (req, res) {
    db.Producto.findAll(relacion)
      .then(function (productos) {
        return res.render("index", {
          listaProductos: productos,
        });
      })
      .catch(function (error) {
        return res.send(error);
      });
  },

  Search: function (req, res) {
    let iphone = req.query.search;
    db.Producto.findAll({
        where: {
            nombre: {[Op.like]: '%' + iphone + '%' }
        },
        include: [
         { association: "usuario" }],
    })
      .then(function (ProductosEncontrados) {
        return res.render("search-results", {
          resultados: ProductosEncontrados,
          iphone: iphone,
        });
      })
      .catch(function (error) {
        return res.send(error);
      });
  },

  showElUsuario: function (req, res) {
    res.send("mensaje");
  },
  showPorProducto: function (req, res) {
    let idEnviado = req.params.id;
    db.Producto.findByPk(idEnviado, relacion)
      .then(function (producto) {
        return res.render("product", { listaProducto: producto });
      })
      .catch(function (error) {
        res.send(error);
      });
  },
  agregoComentario: function (req, res) {
    const idProducto = req.params.id;
    const texto = req.body.comentario;
    let usuarioId = null;
    
    if (req.session && req.session.user) {
        usuarioId = req.session.user.id;
    }
        if (texto == undefined) {
        return res.redirect('/mercado/index');
        
    }
    if (texto == undefined || usuarioId == null) {
    res.redirect('/mercado/index');
    return;
  }
    db.Comentarios.create({
        comentario: texto,
        idProducto: idProducto,
        idUsuario: usuarioId,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    .then(function () {
        res.redirect('/mercado/index');
        })
    .catch(function(error) {
            return res.send(error);
        });
    
  },
  storeRegister: function (req, res) {
    return res.render("register", {
      nombreUsuario: usuario.nombre,
      apellidoUsuario: usuario.apellido,
    });
  },
  showLog: function (req, res) {
    return res.render("login", {
      nombreUsuario: usuario.nombre,
      apellidoUsuario: usuario.apellido,
    });
  },
  showResultados: function (req, res) {
    function todoComentarios() {
      let array = [];
      for (let i = 0; i < productos.length; i++) {
        let idP = productos[i].id;
        let comentarios = productos[i].comentarios;
        array.push([idP, comentarios]);
      }
      return array;
    }
    return res.render("search-results", {
      nombreUsuario: usuario.nombre,
      apellidoUsuario: usuario.apellido,
      listaProductos: productos,
      comentariosTotal: todoComentarios(),
    });
  },

  showCreate: function (req, res) {
  if (req.session.user == undefined ) {
    return res.redirect('/users/login');
  }
  let imagen = req.body.imagen;
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  if (imagen == undefined || nombre == undefined || descripcion == undefined) {
    return res.render('product-add', { error: 'Completá todos los campos' });
  }
  db.Producto.create({
    idUsuario: req.session.user.id,     
    imagenArchivo: imagen,   
    nombre: nombre,
    descripcion: descripcion,
    createdAt: new Date(),
  })
  .then(function () {
    return res.redirect('/mercado/index');
  })
  .catch(function (error) {
    return res.send(error);
  });
  },
  showEdit: function (req, res) {
    return res.render("product-edit");
  },
};

module.exports = mercadoController;


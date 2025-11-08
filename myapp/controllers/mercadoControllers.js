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
        if (texto == '' || texto == undefined) {
        return res.redirect('/mercado/index');
        
    }
    if (texto == '' || texto == undefined || usuarioId == null) {
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
  if (req.session.user == undefined || req.session.user == null) {
    return res.redirect('/users/log');
  }
  const imagen = req.body.imagen;
  const nombre = req.body.nombre;
  const descripcion = req.body.descripcion;
  if (imagen == '' || nombre == '' || descripcion == '' || 
      imagen == undefined || nombre == undefined || descripcion == undefined) {
    return res.render('product-add', { error: 'Completá todos los campos' });
  }
  db.Producto.create({
    idUsuario: req.session.user.id,     
    imagenArchivo: '/imgs/' + imagen,   
    nombre: nombre,
    descripcion: descripcion,
    createdAt: new Date(),
  })
  .then(function () {
    return res.redirect('/mercado/index');
  })
  .catch(function (error) {
    console.log(error);
    return res.send('Error al crear el producto');
  });
  },
  showEdit: function (req, res) {
    return res.render("product-edit");
  },
};

module.exports = mercadoController;

/* const dbp = require("../localData/products"); 
const dbu = require("../localData/user");    


let productos = dbp.productos; 
let usuario   = dbu.usuario;

const mercadoController= {
    index : function (req, res) {
        function todoComentarios() {
            let array = [];
            for (let i = 0; i < productos.length; i++) {
                let idP = productos[i].id;
                let comentarios = productos[i].comentarios; 
                array.push([idP, comentarios]);
            }
            return array;
        }
        return res.render("index",{
        nombreUsuario:(usuario.nombre),
        apellidoUsuario:(usuario.apellido),
        listaProductos:productos,
        comentariosTotal:todoComentarios(),
    } );
    },
    showElUsuario: function (req, res) {
        let idEnviado = req.params.id;
        function todoComentarios() {
            let array = [];
            for (let i = 0; i < productos.length; i++) {
                let idP = productos[i].id;
                let comentarios = productos[i].comentarios; 
                array.push([idP, comentarios]);
            }
            return array;
        }
        function productosUruarios() {
            let ids = usuario.id
            let array = [];
            for (let i = 0; i < productos.length; i++) {
                let id = productos[i].idUsuario
                if (ids==id) {
                    array.push(productos[i])
                }
            }
            return array
        }
        return res.render("profile",{
            nombreUsuario:(usuario.nombre),
            apellidoUsuario:(usuario.apellido),
            infoUsuario:usuario,
            produUsuario:productosUruarios(idEnviado),
            comentariosTotal:todoComentarios(idEnviado),
    } );
    },
    showPorProducto: function (req, res) {
        let idEnviado = req.params.id;
        function producto(ids) {
            let array = [];
            for (let i = 0; i < productos.length; i++) {
                let id = productos[i].id;
                if (ids == id) {
                    array.push(productos[i]);
                }
            }
            return array;
        }
        function comentarioProducto(ids) {
            let array = [];
            for (let i = 0; i < productos.length; i++) {
                let id = productos[i].id;
                if (ids == id) {
                    array = productos[i].comentarios;
                }
            }
            return array;
        }
        return res.render("product", {
            nombreUsuario:(usuario.nombre),
            apellidoUsuario:(usuario.apellido),
            listaProducto: producto(idEnviado),
            productoComentarios: comentarioProducto(idEnviado)
        });
    },
    storeRegister: function (req, res) {
        return res.render("register",{
            nombreUsuario:(usuario.nombre),
            apellidoUsuario:(usuario.apellido),
    } );
    },
    showLog: function (req, res) {
        return res.render("login",{
            nombreUsuario:(usuario.nombre),
            apellidoUsuario:(usuario.apellido),
    } );
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
        return res.render("search-results",{
        nombreUsuario:(usuario.nombre),
        apellidoUsuario:(usuario.apellido),
        listaProductos:productos,
        comentariosTotal:todoComentarios(),
    } );
    },
    
    showCreate: function (req, res) {
        return res.render("product-add",{
            nombreUsuario:(usuario.nombre),
            apellidoUsuario:(usuario.apellido),
    } );
    },
    showEdit: function (req, res) {
        return res.render("product-edit",{
            nombreUsuario:(usuario.nombre),
            apellidoUsuario:(usuario.apellido),
    } );
    },
}
module.exports = mercadoController ;

 POR SI CAMBAISTE ALGUNO DESDE EL LUNES
showElUsuario: function (req, res) {
        
        let idEnviado = req.params.id;
        function todoComentarios() {
            let array = [];
            for (let i = 0; i < productos.length; i++) {
                let idP = productos[i].id;
                let comentarios = productos[i].comentarios; 
                array.push([idP, comentarios]);
            }
            return array;
        }
        function productosUruarios() {
            let ids = usuario.id
            let array = [];
            for (let i = 0; i < productos.length; i++) {
                let id = productos[i].idUsuario
                if (ids==id) {
                    array.push(productos[i])
                }
            }
            return array
        }
        return res.render("profile",{
            nombreUsuario:(usuario.nombre),
            apellidoUsuario:(usuario.apellido),
            infoUsuario:usuario,
            produUsuario:productosUruarios(idEnviado),
            comentariosTotal:todoComentarios(idEnviado),
    } );
    },
    showPorProducto: function (req, res) {
        let idEnviado = req.params.id;
        function producto(ids) {
            let array = [];
            for (let i = 0; i < productos.length; i++) {
                let id = productos[i].id;
                if (ids == id) {
                    array.push(productos[i]);
                }
            }
            return array;
        }
        function comentarioProducto(ids) {
            let array = [];
            for (let i = 0; i < productos.length; i++) {
                let id = productos[i].id;
                if (ids == id) {
                    array = productos[i].comentarios;
                }
            }
            return array;
        }
        return res.render("product", {
            nombreUsuario:(usuario.nombre),
            apellidoUsuario:(usuario.apellido),
            listaProducto: producto(idEnviado),
            productoComentarios: comentarioProducto(idEnviado)
        });
    },
    storeRegister: function (req, res) {
        return res.render("register",{
            nombreUsuario:(usuario.nombre),
            apellidoUsuario:(usuario.apellido),
    } );
    },
    showLog: function (req, res) {
        return res.render("login",{
            nombreUsuario:(usuario.nombre),
            apellidoUsuario:(usuario.apellido),
    } );
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
        return res.render("search-results",{
        nombreUsuario:(usuario.nombre),
        apellidoUsuario:(usuario.apellido),
        listaProductos:productos,
        comentariosTotal:todoComentarios(),
    } );
    },
    
    showCreate: function (req, res) {
        return res.render("product-add",{
            nombreUsuario:(usuario.nombre),
            apellidoUsuario:(usuario.apellido),
    } );
    },
    showEdit: function (req, res) {
        return res.render("product-edit",{
            nombreUsuario:(usuario.nombre),
            apellidoUsuario:(usuario.apellido),
    } );
    },
}

*/

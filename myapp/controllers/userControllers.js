const db = require('../database/models');
const bcryptjs = require('bcryptjs');
const op = db.sequelize.Op ;

const userControllers = {

  show: function (req, res) {
    if (req.session.user != undefined) {
      return res.redirect('/users/profile'); 
    }
    return res.render('register', { error: {} });
  },

  create: function (req, res) {
    let usuario = req.body.usuario;
    let email = req.body.email;
    let contrasena = req.body.contrasena;
    let error = {};

    if (usuario === '') {
      error.usuario = 'Nombre de usuario obligatorio';
      return res.render('register', { error });
    }
    if (email === '') {
      error.email = 'Email obligatorio';
      return res.render('register', { error });
    }
    if (contrasena === '' || contrasena.length < 3) {
      error.contrasena = 'La contraseña debe tener al menos 3 caracteres';
      return res.render('register', { error });
    }

    db.Usuario.findOne({ where: { email: email } })
      .then(function (user) {
        if (user != undefined) {
          return res.send("El email ya existe");
        }
        return db.Usuario.findOne({ where: { usuario: usuario } })
          .then(function (usuario_1) {
            if (usuario_1 != undefined) {
              return res.send("El usuario ya existe");
            }

            let nuevoUsuario = {
              usuario: usuario,
              email: email,
              contrasena: bcryptjs.hashSync(contrasena, 10)
            };

            return db.Usuario.create(nuevoUsuario)
              .then(function () {
                return res.redirect("/users/login");
              })
              .catch(function (error) {
                return res.send(error);
              });
          });
      })
      .catch(function (error) {
        console.log(error);
        return res.send(error);
      });
  },

  showLogin: function (req, res) {
    return res.render("login");
  },
  
  createLogin: function (req, res) {
    let email = req.body.email;
    let password = req.body.contrasena;
    if (email == "" || password == "") {
      return res.render('login', { error: 'Completá todos los campos.' });
    }

    db.Usuario.findOne({ where: { email: email } })
      .then(function (user) {
        if (user == undefined) {
          return res.render('login', { error: 'El usuario no existe en la base de datos.' });
        }

        let ok = bcryptjs.compareSync(password, user.contrasena);
        if (ok != true) {
          return res.render('login', { error: 'Email o contraseña inválidos.' });
        }

        req.session.user = {
          id: user.id,
          name: user.usuario,
          email: user.email
        };

        if (req.body.recordarme != undefined) {
          res.cookie('user', req.session.user, { maxAge: 1000 * 60 * 5 });
        }
        return res.redirect('/users/profile');
      })
      .catch(function (error) {
        return res.send(error);
      });
  },

  Perfil: function(req , res) {
    if (req.session.user === undefined) {
      return res.redirect("/users/login");
    }
    db.Usuario.findByPk(req.session.user.id)
      .then(function(UsuarioEncontrado){
        if (!UsuarioEncontrado) {
          return res.redirect("/users/login");
        }
        db.Producto.findAll({
          where: { id_usuario: req.session.user.id }
        })
        .then(function(productosUsuarios){
          let productos = productosUsuarios.length;
          return res.render("profile", { usuario: UsuarioEncontrado, productos, productosUsuarios });
        })
        .catch(function (error) {
          return res.send(error);
        });
      });
  },

  PerfilPorID: function(req, res){
    db.Usuario.findByPk(req.params.id ,{
      include: ['productos']
    })
    .then(function (usuario){
      if(!usuario) return res.send( "este usuario no existe");
      let productos = usuario.productos.length;
      let productosUsuarios = usuario.productos;
      
      res.render("profile",{ usuario, productos, productosUsuarios});
    })
    .catch(function(error){
      res.send(error)
    });
    },
  

  logout: function(req, res){
    req.session.destroy();
    res.clearCookie('user');
    return res.redirect("/");
  }
};

module.exports = userControllers;


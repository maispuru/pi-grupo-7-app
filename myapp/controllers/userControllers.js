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

          return res.send("El email ya existe")
        }

        db.Usuario.findOne({ where: { usuario: usuario } })

          .then(function (usuario_1) {
            if (usuario_1 != undefined) {
              return res.send("El usuario ya existe")
            }
          })


        let nuevoUsuario = {
          usuario: usuario,
          email: email,
          contrasena: bcryptjs.hashSync(contrasena, 10),
          createdAt: new Date()
        };
        db.Usuario.create(nuevoUsuario)
          .then(function () {
            return res.redirect("/users/login");
          })
          .catch(function (error) {
            console.log(error);
            return res.send(error);
          });
      }
      );
  },

  showLogin: function (req, res) {
    return res.render("login");
  },
  
  createLogin: function (req, res) {
    let userInfo = {
      id: req.body.id,
      email: req.body.email,
      contrasena: req.body.contrasena,
      recordarme: req.body.recordarme
    };

    db.Usuario.findOne({ where: { email: userInfo.email } })
      .then(function (user) {
        if (user == undefined) {
          return res.send("este email no existe");
        }

        let validacion = bcryptjs.compareSync(userInfo.contrasena, user.contrasena);
        if (!validacion) {
          return res.send("contrasena incorrecta");
        }

        req.session.user = {
          id: user.id,
          email: user.email,
          usuario: user.usuario
        };
        if (userInfo.recordarme != undefined) {
          res.cookie("user", user, { maxAge: 150000 })
        }

        return res.redirect("/users/profile");
      })
      .catch(function (error) {
        console.log(error);
        return res.send("error en login");
      });
  },
   Perfil: function(req , res) {
    if(req.session.user === undefined){
      return res.redirect("/users/login");
    }
    db.usuario.FindByPk(req.session.user.id)
     .then(function(UsarioEncontrado){
      if(UsarioEncontrado === undefined) {
        return res.redirect("/users/login");
      }
      db.Producto.FindAll({
        where: {
          id_usuario: req.session.user.id
        }
      })
      .then(function(productosUruarios){
        let productos = productosUruarios.length
        res.render ("profile", { UsarioEncontrado, productos, productosUruarios})
      })
      .catch(function (error) {
        res.send(error);
      });
     })
   },
   logout: function(req, res){
        req.session.destroy();
        res.clearCookie('user');

        return res.redirect("/mercado/index");
    }
  
  };

module.exports = userControllers;


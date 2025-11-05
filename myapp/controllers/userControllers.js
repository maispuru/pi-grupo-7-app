const db = require('../database/models');
const bcryptjs = require('bcryptjs');
const op = db.sequelize.Op ;

const userControllers = {

    show: function (req, res) {

    if (req.session.user != undefined) {
      return res.redirect('/users/profile')
    } else {
      return res.render("register", { error: {} });
    }

  },



  create: function (req, res) {
    let email = req.body.email;
    let usuario = req.body.usuario;
    let contrasena = req.body.contrasena;
    let error = {};

    if (usuario == "") {
      error.usuario = "Nombre de usuario  obligatorio";
      return res.render("register", { error });

    }

    if (email == "") {
      error.email = "Email obligatorio";
      return res.render("register", { error });

    }

    if (contrasena == "" || contrasena.length < 3) {
      error.contrasena = "La contraseña debe tener al menos 3 caracteres";
      return res.render("register", { error });
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
}}; 

module.exports = userControllers;


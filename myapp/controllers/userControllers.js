const db = require('../database/models');
const bcryptjs = require('bcryptjs');
const op = db.sequelize.Op ;

const userControllers = {

  show: function (req, res) {

    if (req.session.user != undefined) {
      return res.redirect('/users/register')
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
}, 

  showLogin: function (req, res) {
    return res.render("login");
  },
  createLogin: function (req, res) {
    let userInfo = {
      id: req.body.id,
      email: req.body.email,
      password: req.body.contrasena,
      recordarme: req.body.recordarme
    };

    db.Usuario.findOne({ where: { email: userInfo.email } })

        .then(function(user){
            if(user){
                let passwordOk = bcryptjs.compareSync(userInfo.password, user.contrasena); 
                if(passwordOk){ 
                    req.session.user = userInfo
                }
                if (userInfo.recordarme != undefined) {
                    res.cookie("user", infoUser, {maxAge: 600000})
                }

                return res.redirect("/users/profile");
                
        }})

      .catch(function (error) {
        console.log(error);
        return res.send("error en login");
      });
    },
  
   logout: function(req, res){
        req.session.destroy();
        res.clearCookie('user');

        return res.redirect("/mercado/index");
    }
  
  };

module.exports = userControllers;


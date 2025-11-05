var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//recuperar session
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let mercado = require("./routes/mercado");//nuestra

var app = express();

app.use(cookieParser()); 

//middleware de configuracion de session
app.use(session({
  secret: 'Codigo Secreto',
  resave: false,
  saveUninitialized: true,
}));
//middleware para tener session disponible en las vistas
app.use(function(req, res, next){
  if(req.session.user != undefined){ //el user esta logueado
    res.locals.user = req.session.user; //si estoy logueaddo que aca en esta linea ya estoy, envio la info en las vistas
  }
  return next();
});
//middleware para tener la cookie disponible en las vistas
// middleware de Cookies hacia Vistas
app.use(function(req, res, next) {

console.log(req.cookies.user);
  
  
if (req.cookies.user != undefined && req.session.user == undefined) {
    res.locals.user = req.cookies.user;   // uno lo envia a las vistas (partials)
    req.session.user = req.cookies.user;  // otro lo vuelve a poner en session
  }

  return next();
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/mercado", mercado)// ESTA ES LA NUESTRA



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

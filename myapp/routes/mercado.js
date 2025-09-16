const express = require('express');
const router = express.Router();



//Traer constrolador 
const pc = require("../controllers/mercadoControllers");

router.get('/',pc.showListadoProductos);

router.get('/detalle/id?',pc.showPorProducto);

router.get('/cargar');

router.get('/nombre/id?',pc.showElUsuario);

router.get('/cerrar');

router.get('/crear');

router.get('/ingresar');
module.exports = router;
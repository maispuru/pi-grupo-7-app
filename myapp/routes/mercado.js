const express = require('express');
const router = express.Router();

const pc = require('../controllers/mercadoControllers');

router.get('/index', pc.showListadoProductos);
router.get('/detalle/:id?', pc.showPorProducto);
router.get('/register', pc.showRegister);
router.get('/log', pc.showLog);
router.get('/nombre/:id?', pc.showElUsuario);
router.get('/resultados', pc.showResultados);
router.get('/add', pc.showCrear);
router.get('/edit', pc.showEditar);

module.exports = router;
//http://localhost:3000
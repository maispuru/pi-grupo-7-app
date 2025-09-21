const express = require('express');
const router = express.Router();

const pc = require('../controllers/mercadoControllers');

router.get('/index', pc.index);
router.get('/index/detalle/:id?', pc.showPorProducto);
router.get('/register', pc.storeRegister);
router.get('/log', pc.showLog);
router.get('/name/:id?', pc.showElUsuario);
router.get('/resultados', pc.showResultados);
router.get('/add', pc.create);
router.get('/detalle/edit', pc.edit);

module.exports = router;
//http://localhost:3000
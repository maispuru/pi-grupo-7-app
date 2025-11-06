const express = require('express');
const router = express.Router();

const pc = require('../controllers/mercadoControllers');

router.get('/', pc.index); 
router.get('/index', pc.index);
router.get('/register', pc.storeRegister);
router.get('/log', pc.showLog);
router.get('/resultados', pc.Search);
router.get('/add', pc.showCreate);
router.get('/detail/edit', pc.showEdit);
router.get('/name/:id?', pc.showElUsuario);
router.get('/index/detalle/:id?', pc.showPorProducto);
module.exports = router;
//http://localhost:3000
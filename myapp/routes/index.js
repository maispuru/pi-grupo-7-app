var express = require('express');
var router = express.Router();
const pc = require('../controllers/mercadoControllers');

/* GET home page. */
router.get('/', pc.index);

module.exports = router;
const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

router.get('/register', userControllers.show);
router.post('/register', userControllers.create)

module.exports = router;
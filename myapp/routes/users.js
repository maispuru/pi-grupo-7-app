const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

router.get('/register', userControllers.show);
router.post('/register', userControllers.create);

router.get('/login', userControllers.showLogin);
router.post('/login', userControllers.createLogin);
router.get('/logout', userControllers.logout);

module.exports = router;
const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

router.get('/register', userControllers.show);
router.post('/register', userControllers.create);
router.get ("/profile", userControllers.Perfil)
router.get('/login', userControllers.showLogin);
router.post('/login', userControllers.createLogin);
router.get('/logout', userControllers.logout);
router.get ("/profile/:id", userControllers.PerfilPorID);

module.exports = router;
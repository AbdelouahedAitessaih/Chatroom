const {Router} = require('express');
const {signup, login, logout,verifyuser} = require('../controllers/authControllers')
const router = Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/verifyuser',verifyuser);
module.exports = router;
require('dotenv').config();
const { Router} = require('express');
const {register, login, quote} = require('../controllers/Register')
const router = Router();

router.post('/register', register)
router.post('/login', login)
router.get('/quote', quote)

module.exports = router;

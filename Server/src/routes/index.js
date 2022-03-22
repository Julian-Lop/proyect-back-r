require('dotenv').config();
const { Router} = require('express');
const {register, login, quote} = require('../controllers/Register')
const {setUser} = require('../controllers/SetUser')
const router = Router();

router.post('/register', register)
router.post('/login', login)
router.put('/setuser', setUser)
router.get('/quote', quote)


module.exports = router;

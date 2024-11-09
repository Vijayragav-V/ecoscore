const router = require('express').Router();
const userController = require('../controllers/userController');
const authHandler = require('../middleware/authHandler');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', authHandler, userController.getUser);
router.put('/update', authHandler, userController.updateUser);
router.get('/check', authHandler, userController.checkAuth); 

module.exports = router;
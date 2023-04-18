const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

const { isAdmin } = require('../middlewares/auth.middleware');

router.post('/login', authController.login);
router.post('/register', authController.register);

router.get('/get/:id', [isAdmin], authController.getUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userMiddleware = require('../middleware/authMiddleware');
const validation = require('../validations/validation');

router.post('/signup', validation.signupValidation, userController.signup);
router.post('/login', validation.loginValidation, userController.login);

// router.get('/home', userMiddleware.verifyToken, (req, res) => {
//     res.json({ message: 'Access granted to protected route', user: req.user });
// });

router.get('/home', userController.getAllUsers);

module.exports = router;
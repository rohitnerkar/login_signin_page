const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const secretKey = 'your_secret_key';

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
          name: name,
          email: email,
          password: hashedPassword,
        });
    
        res.status(200).json({ message: 'Registration successful', user: newUser });
    } catch (error) {
        console.error('Registration failed: ', error);
        res.status(500).json({ message: 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try { 
        const user = await User.findOne({ where: { email } });
    
        if (!user) {
          res.status(404).json({ message: 'User not found' });
        } 

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email}, secretKey, { expiresIn: '1h' });
        res.cookie('token', token, {
          httpOnly: true,
          secure: true, 
          sameSite: 'strict', 
          maxAge: 60 * 60 * 1000,
        });
        res.status(200).json({ message: 'Login Successfull', token: token });
      } catch (error) {
        console.error('Login failed: ', error);
        res.status(500).json({ message: 'Login failed' });
      }
};

exports.getAllUsers = async(req, res) => {
  try {
      const getAll = await User.findAll();
      res.json(getAll);
  } catch (error) {
      res.status(300).json({ error: 'Failed to fetch users.' });
  }
};




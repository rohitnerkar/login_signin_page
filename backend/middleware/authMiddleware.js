const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

module.exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if(!token)
    {
        return res.status(400).json({ message: 'Access denied. Token not provided.' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if(err)
        {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        req.user = user;
        next();
    });
};

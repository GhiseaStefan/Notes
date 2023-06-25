const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

const authenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'Authentication token not found!' });
        }

        const decoded = jwt.verify(authHeader, process.env.SECRET_KEY);
        const userId = decoded._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        req.user = user;
        
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Invalid authentication token!' });
    }
};

module.exports = authenticateUser;

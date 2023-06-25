const { User } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email.length === 0) {
            return res.status(400).json({ error: 'You have to add an email!' })
        }
        if (!String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return res.status(400).json({ error: 'Email format is not valid!' })
        }
        const user = await User.findOne({ 'email': email });
        if (user) {
            return res.status(400).json({ error: 'Email is already used!' });
        }
        if (password.length === 0) {
            return res.status(400).json({ error: 'You have to add a password!' })
        }
        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must contain atleast 8 characters!' })
        }
        if (!(/[A-Z]/.test(password))) {
            return res.status(400).json({ error: 'Password must contain atleast 1 uppercase character!' })
        }
        if (!(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password))) {
            return res.status(400).json({ error: 'Password must contain atleast 1 symbol!' })
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email: email.toLowerCase(), password: encryptedPassword });
        const payload = {
            _id: newUser._id,
            email: newUser.email
        };
        const options = { expiresIn: '1h' };
        const token = jwt.sign(payload, process.env.SECRET_KEY, options);
        return res.cookie('auth-token', token, { httpOnly: true, sameSite: 'None', secure: true }).status(201).json({ token, payload });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: 'Server error when registering!' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;
        if (email.length === 0) {
            return res.status(400).json({ error: 'You have to add an email!' })
        }
        if (!String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return res.status(400).json({ error: 'Email format is not valid!' })
        }
        const user = await User.findOne({ 'email': email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ error: "Email is not registered!" });
        }
        if (password.length === 0) {
            return res.status(400).json({ error: 'You have to add a password!' });
        }
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Wrong password!' });
        }
        const payload = {
            _id: user._id,
            email: user.email.toLowerCase()
        };
        const options = rememberMe ? { expiresIn: '30d' } : { expiresIn: '1h' };
        const token = jwt.sign(payload, process.env.SECRET_KEY, options);
        return res.cookie('auth-token', token, { httpOnly: true, sameSite: 'None', secure: true }).status(200).json({ token, payload });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error when logging in!' });
    }
}

const isUserAuthenticated = async (req, res) => {
    try {
        const token = req.cookies['auth-token'] || req.query.token;

        if (!token) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decodedToken._id;

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        return res.status(200).json({ _id: decodedToken._id, email: decodedToken.email, token: token });
    } catch (err) {
        return res.status(403).json({ error: 'Invalid Token!' });
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('auth-token');
    res.sendStatus(200);
};

module.exports = { registerUser, loginUser, isUserAuthenticated, logoutUser };
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from './userModel.js';
import bcrypt from "bcryptjs";
import cookieParser from 'cookie-parser';
import { createError } from './customError.js';
const router = Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, 'You are not authenticated!'));

    jwt.verify(token, 'secret-key', (err, user) => {
        if (err) return next(createError(403, 'Token is not valid!'));
        req.user = user;
        next();
    });
};

// Register --> http://localhost:5000/api/auth/register
router.post('/register', async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const newUser = new User({ username: req.body.username, password: hash });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (err) {
        next(err)
    }
});

// Login --> http://localhost:5000/api/auth/login
router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, 'User Not Found!!'))
        const correctPass = await bcrypt.compare(req.body.password, user.password)
        if (!correctPass) return next(createError(400, 'Wrong Password Or Username'))
        const token = jwt.sign({ id: user._id }, 'secret-key')
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(user)
    } catch (err) {
        next(err)
    }
});
// Update Username --> http://localhost:5000/api/auth/:id/update-username
// code for the route to update the username of a user, ensuring that the user is authenticated by verifying their JWT token
router.put('/:id/update-username', verifyToken, async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            return next(createError(403, 'You can update only your account!'));
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { username: req.body.username },
            { new: true }
        );

        if (!updatedUser) return next(createError(404, 'User not found!'));

        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
});
export default router

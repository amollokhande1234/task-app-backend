// src/controllers/auth-controller.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from '../models/user-models.js';

export async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        const isPresent = await userModel.findOne({ email });
        if (isPresent) {
            return res.status(409).json({
                message: "Email already exists, try to login",
            });
        }

        const encryptPass = await bcrypt.hash(password, 10);
        const user = await userModel.create({ name, email, password: encryptPass });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

        res.status(201).json({
            message: "User Created Successfully",
            token,  // optional: send token on register
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error" });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized, User not found" });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

        return res.status(200).json({
            message: "Login Successfully",
            token,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error" });
    }
}
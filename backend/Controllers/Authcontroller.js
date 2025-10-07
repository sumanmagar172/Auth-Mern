const userModel = require("../Models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists, you can login",
                success: false,
            });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new userModel({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true,
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user doesn't exist
        const existingUser = await userModel.findOne({ email: email.toLowerCase() });
        const errorMsg = "Auth failed email or password is wrong"
        if (!existingUser) {
            return res.status(403).json({
                message: errorMsg,
                success: false,
            });
        }

        // decrypt the checkng the password
        const isPasswordEqual = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordEqual) {
            return res.status(403).json({
                message: errorMsg,
                success: false,
            });
        }

        const jwtToken = jwt.sign(
    { id: existingUser._id, email: existingUser.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
);



        res.status(200).json({
            message: "login successful",
            success: true,
            jwtToken,
            email,
            name: existingUser.name
        });
    } catch (error) {
        console.error("login error:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

module.exports = {signup, login};

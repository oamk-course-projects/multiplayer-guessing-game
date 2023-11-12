import bcrypt from 'bcryptjs';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/UserModel.js';


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    console.log("Login endpoint hit", req.body);
  
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    console.log(`Found user: ${user ? user.username : 'not found'}`);

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id);

        res.json({
        _id: user._id,
        username: user.username,
        token
        });
    } else {
        console.error("Error in login endpoint", error);

        res.status(401).json({ message: 'Invalid username or password' });
    }
});

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    console.log("Register endpoint hit", req.body);
    
    const { username, password } = req.body;

    const userExists = await User.findOne({ username });
    console.log(`Found user: ${userExists ? userExists.username : 'not found'}`);

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
    } else {
        const user = await User.create({
        username,
        password,
        });

        if (user) {
        const token = generateToken(user._id);

        res.status(201).json({
            _id: user._id,
            username: user.username,
            token
        });
        } else {
        res.status(400).json({ message: 'Invalid user data' });
        }
    }
});

// ... Other controllers ...

export {
  loginUser,
  registerUser,
};

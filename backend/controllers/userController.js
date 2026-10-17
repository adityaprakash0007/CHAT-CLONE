import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

// Signup..........
export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;

    try {
        if (!fullName || !email || !password || !bio) {
            return res.json({
                success: false,
                message: "Missing Details"
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            bio
        });

        const token = generateToken(newUser._id);

          const safeUser = {
    _id: newUser._id,
    fullName: newUser.fullName,
    email: newUser.email,
    bio: newUser.bio,
    profilePic: newUser.profilePic
};

res.json({
    success: true,
    userData: safeUser,
    token,
    message: "Account created successfully"
});

    } catch (error) {
        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });
    }
};

// Login a user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await User.findOne({ email });

        // Check if user exists
        if (!userData) {
            return res.json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            userData.password
        );

        if (!isPasswordCorrect) {
            return res.json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = generateToken(userData._id);

         const safeUser = {
    _id: userData._id,
    fullName: userData.fullName,
    email: userData.email,
    bio: userData.bio,
    profilePic: userData.profilePic
};

res.json({
    success: true,
    userData: safeUser,
    token,
    message: "Login successful"
});

    } catch (error) {
        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });
    }
};

export const checkAuth = (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
};
//Update...........
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, fullName, bio } = req.body;
        const userId = req.user._id;

        let updateData = {
            fullName,
            bio
        };

         if (profilePic && typeof profilePic === "string") {
            const upload = await cloudinary.uploader.upload(profilePic);
            updateData.profilePic = upload.secure_url;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        res.json({
            success: true,
            user: updatedUser
        });

    } catch (error) {
        console.log(error.message);

        res.json({
            success: false,
            message: error.message
        });
    }
};
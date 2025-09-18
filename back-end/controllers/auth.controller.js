import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

let refreshTokens = [];
export const signUp = async (req, res) => {
  try {
    const { email, password, fullName, userName } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }
    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: "Full name is required",
      });
    }
    if (!userName) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }
    // Check if user already exists
    const existingUser = await User.findOne({
      email,
    })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      })
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      fullName,
      userName,
    })
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
    // Check if password is correct
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    refreshTokens.push(refreshToken);
    await User.findByIdAndUpdate(user._id, {
      refreshToken: refreshToken,
    });

    return res.status(200).json({
      success: true,
      message: "User signed in successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const refreshAccessToken = async(req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not provided",
      });
    }
    // Check if refresh token is stored in the database
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
    // Verify refresh token
    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        // Remove the invalid refresh token from the database
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        return res.status(403).json({
          success: false,
          message: "Invalid refresh token",
        });
      }
    });
    const user = await User.findById(user.id);
    if(!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const newAccessToken = generateAccessToken(user);
    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const signOut = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }
    // Remove the refresh token from the database
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: null });
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

import express from "express";
import { signIn, signUp, refreshAccessToken, signOut } from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/sign-in", signIn);
authRoute.post("/sign-up", signUp);
authRoute.post("/refresh-token", refreshAccessToken);
authRoute.post("/sign-out", signOut);

export default authRoute;
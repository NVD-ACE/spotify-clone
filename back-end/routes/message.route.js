import express from "express";
import { getMessages } from "../controllers/message.controller.js";

const messageRoute = express.Router();
messageRoute.get("/:id/:userId", getMessages);

export default messageRoute;
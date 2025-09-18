import express from "express";
import { getStats } from "../controllers/stat.controller.js";

const statRoute = express.Router();
statRoute.get("/", getStats);
export default statRoute;
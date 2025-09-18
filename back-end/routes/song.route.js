import express from "express";
import { getFeaturedSongs, getMadeForYouSongs, getSongById, getSongs, getTrendingSongs } from "../controllers/song.controller.js";

const songRoute = express.Router();
songRoute.get("/", getSongs);
songRoute.get("/:id", getSongById);
songRoute.get("/featured", getFeaturedSongs);
songRoute.get("/made-for-you", getMadeForYouSongs);
songRoute.get("/trending", getTrendingSongs);
export default songRoute;
import { Router } from "express";
import { createAlbum, deleteAlbum } from "../controllers/album.controller.js";
import { createSong, deleteSong } from "../controllers/song.controller.js";
const adminRoute = Router();


adminRoute.post("/albums", createAlbum);
adminRoute.delete("/albums/:id", deleteAlbum);

adminRoute.post("/songs", createSong);
adminRoute.delete("/songs/:id", deleteSong);
export default adminRoute;
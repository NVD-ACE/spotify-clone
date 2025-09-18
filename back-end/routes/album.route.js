import express from "express";
import { getAlbumbyId, getAlbums } from "../controllers/album.controller.js";

const albumRoute = express.Router();

albumRoute.get("/", getAlbums);
albumRoute.get("/:id", getAlbumbyId);

export default albumRoute;
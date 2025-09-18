import { Album } from "../models/album.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { Song } from "../models/song.model.js";
export const getAlbums = async (req, res, next) => {
    try {
        const albums = await Album.find();
        res.status(200).json(albums);
    }
    catch (error) {
        next(error);
    }
}
export const getAlbumbyId = async (req, res, next) => {
    try {
        const albumId = req.params.id;
        const album = await Album.findById(albumId).populate('songs');
        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }
        res.status(200).json(album);
    } catch (error) {
        next(error);
    }
}
export const createAlbum = async (req, res, next) => {
    try { 
        const { title, artist, releaseYear } = req.body;
        const { imageFile } = req.files;

        // Validate and process files
        if (!imageFile) {
            return res.status(400).json({ message: "Image file is required" });
        }

        // Upload image to Cloudinary
        const imageUrl = await uploadToCloudinary(imageFile);

        // Create new album
        const newAlbum = new Album({
            title,
            artist,
            releaseYear,
            imageUrl
        });

        await newAlbum.save();
        res.status(201).json(newAlbum);
    }
    catch (error) {
        next(error);
    }
}
export const deleteAlbum = async (req, res, next) => { 
    try {
        const { id } = req.params;
        await Song.deleteMany({
            albumId: id
        });
        await Album.findByIdAndDelete(id);
        res.status(200).json({ message: "Album deleted successfully" });
    } catch (error) {
        next(error);
    }
}
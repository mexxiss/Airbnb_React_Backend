import mongoose from "mongoose";
import { GalleryModel } from "../models/Gallery.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

export const createGalleryContent = async (req, res) => {
  try {
    const { key, img_url, type } = req.body;
    const newGallery = new GalleryModel({ key, img_url, type });
    const savedGallery = await newGallery.save();

    res
      .status(201)
      .json({ msg: "amenities created successfully", data: savedGallery });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

export const getGalleryImagesByQuery = async (req, res) => {
  try {
    const { type } = req.query;
    const query = {};

    if (type) {
      query.type = new mongoose.Types.ObjectId(type)
    }

    const galleryData = await GalleryModel.find(query).populate("type");

    return res.status(200).json({
      success: true,
      count: galleryData.length,
      data: galleryData,
    });
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const UpdateGallary = async (req, res, next) => {
  const { type } = req.body;
  const { id } = req.params;

  if (!id) {
    return next(new apiError(400, "Please provide valid document ID"));
  }

  try {
    const gallaryDoc = await GalleryModel.findByIdAndUpdate(id, { $set: { type } }, { new: true, runValidators: true });
    return res.status(200).json(new apiResponse(200, gallaryDoc, "Done"));
  } catch (error) {
    return next(new apiError(500, `Server Error: ${error}`));
  }
}
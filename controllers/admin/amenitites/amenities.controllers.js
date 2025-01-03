import { AmenitiesModel } from "../../../models/Amenities.js";

export const createAmenities = async (req, res) => {
  // #swagger.tags = ['Admin']
  // #swagger.summary = "AUTHORIZED Admin can add new amenities to the list"
  // #swagger.description = "> #TODO: Created document is being sent back through response that may be unnecessary",
  /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/AmenitiesRequest" }  
              }
          }
      }
  */
  try {
    const { title, icon } = req.body;

    if (!title || !icon) {
      return res.status(400).json({ error: "Title and icon are required." });
    }

    const newAmenity = new AmenitiesModel({ title, icon });
    const savedAmenity = await newAmenity.save();

    res.status(201).json({
      msg: "amenities created successfully",
      data: savedAmenity,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllAmenities = async (req, res) => {
  // #swagger.tags = ['Admin']
  // #swagger.summary = "AUTHORIZED Admin can retrieve all amenities from the list"
  // #swagger.description = "> #TODO: Retrieved documents are being sent back through response that may contain unnecessary information",

  try {
    const amenities = await AmenitiesModel.find();
    res.status(200).json({ msg: "data feched succefully", data: amenities });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAmenitiesById = async (req, res) => {
  // #swagger.tags = ['Admin']
  // #swagger.summary = "AUTHORIZED Admin can retrieve amenity by passing ID within path"
  // #swagger.description = "> #TODO: Retrieved document is being sent back through response that may contain unnecessary information",

  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid amenity ID." });
    }

    const amenity = await AmenitiesModel.findById(id);
    if (!amenity) {
      return res.status(404).json({ error: "Amenity not found." });
    }

    res.status(200).json(amenity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAmenities = async (req, res) => {
  // #swagger.tags = ['Admin']
  // #swagger.summary = "AUTHORIZED Admin can update existing amenities by passing ID within path"
  // #swagger.description = "> #TODO: Updated document is being sent back through response that may be unnecessary",
  /* #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: { $ref: "#/components/schemas/AmenitiesRequest" }  
              }
          }
      }
  */

  try {
    const { id } = req.params;
    const { title, icon } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid amenity ID." });
    }

    if (!title && !icon) {
      return res.status(400).json({
        error: "At least one field (title or icon) is required to update.",
      });
    }

    const updatedAmenity = await AmenitiesModel.findByIdAndUpdate(
      id,
      { title, icon },
      { new: true, runValidators: true }
    );

    if (!updatedAmenity) {
      return res.status(404).json({ error: "Amenity not found." });
    }

    res.status(200).json(updatedAmenity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAmenities = async (req, res) => {
  // #swagger.tags = ['Admin']
  // #swagger.summary = "AUTHORIZED Admin can delete non-required amenity by passing ID within path"
  // #swagger.description = "> #TODO: Deleted document is being sent back through response that may contain unnecessary information",

  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid amenity ID." });
    }

    const deletedAmenity = await AmenitiesModel.findByIdAndDelete(id);

    if (!deletedAmenity) {
      return res.status(404).json({ error: "Amenity not found." });
    }

    res.status(200).json({ message: "Amenity deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
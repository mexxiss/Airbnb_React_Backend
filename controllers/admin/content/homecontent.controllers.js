import { HomeContentModel } from "../../../models/HomeContent.js";
import { apiError } from "../../../utils/apiError.js";
import { apiResponse } from "../../../utils/apiResponse.js";

export const SetHomeContent = async (req, res, next) => {
  // #swagger.tags = ['Admin']
  // #swagger.summary = "AUTHORIZED Admin can add Home Content to be retrieved on Home page on frontend"
  // #swagger.description = "> #TODO: Created document is being sent back through response that may be unnecessary",
  /* #swagger.requestBody = {
      required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/HomeContentRequest" }  
          }
        }
    } 
  */
  const {
    banner_images,
    what_people_says,
    features,
    cleaning_maintenance,
    interior_design_page,
    listing_management,
    management_support,
  } = req.body;

  if (!banner_images || !Array.isArray(banner_images)) {
    return next(new apiError(400, "Banner Images not found"));
  }

  if (!what_people_says || !features) {
    return next(new apiError(400, "Incomplete information"));
  }

  try {
    const doc = await HomeContentModel.create({
      banner_images,
      what_people_says,
      features,
      cleaning_maintenance,
      interior_design_page,
      listing_management,
      management_support,
    });
    return res
      .status(200)
      .json(new apiResponse(200, doc, "Home Content Added Successfully"));
  } catch (error) {
    return next(new apiError(500, "Server Error"));
  }
};

export const UpdateHomeContent = async (req, res, next) => {
  // #swagger.tags = ['Admin']
  // #swagger.summary = "AUTHORIZED Admin can update Home Content to be retrieved on Home page on frontend"
  // #swagger.description = "> #TODO: Updated document is being sent back through response that may be unnecessary, and requestBody is not well-structured",
  /* #swagger.requestBody = {
      required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/HomeContentRequest" }  
          }
        }
    } 
  */
  const { id } = req.params;
  const { banner_images, what_people_says, features } = req.body;

  if (!banner_images || !Array.isArray(banner_images)) {
    return next(new apiError(400, "Banner Images not found"));
  }

  if (!id || !what_people_says || !features) {
    return next(new apiError(400, "Incomplete information"));
  }

  try {
    const doc = await HomeContentModel.updateOne(
      { _id: id },
      { banner_images, what_people_says, features }
    );

    return res
      .status(200)
      .json(new apiResponse(200, doc, "Home Content updated successfully"));
  } catch (error) {
    return next(new apiError(500, "Server Error"));
  }
};

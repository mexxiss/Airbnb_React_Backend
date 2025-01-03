import { VideoGuidesModel } from "../../../models/VideoGuides.js";
import { apiError } from "../../../utils/apiError.js";
import { apiResponse } from "../../../utils/apiResponse.js";

export const GetVideoGuides = async (req, res, next) => {
    // #swagger.tags = ['General']
    // #swagger.summary = "Get all video guides for mapping on website's UI - Videos Page", 
    try {
        const guides = await VideoGuidesModel.find();
        return res.status(200).json(new apiResponse(200, guides, "Guide Retrieved Successfully"))
    } catch (error) {
        return next(new apiError(500, `Server Error: ${error}`));
    }
}
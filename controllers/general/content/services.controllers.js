import { ServicesModel } from "../../../models/Services.js";
import { apiError } from "../../../utils/apiError.js";
import { apiResponse } from "../../../utils/apiResponse.js";

export const GetServices = async (req, res, next) => {
    // #swagger.tags = ['General']
    // #swagger.summary = "Get all services for mapping on website's UI - Services Dropdown on Navbar"

    try {
        const services = await ServicesModel.find();
        return res.status(200).json(new apiResponse(200, services, "Services Retrieved Successfully"));
    } catch(error) {
        return next(new apiError(500, "Server Error"));
    }
}
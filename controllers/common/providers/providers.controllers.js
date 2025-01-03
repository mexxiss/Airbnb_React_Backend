import { ProvidersModel } from "../../../models/ServiceProviders.js";
import { apiError } from "../../../utils/apiError.js";
import { apiResponse } from "../../../utils/apiResponse.js";

export const GetProviders = async (req, res, next) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = "Get All Service Providers List from the Database Collection"
    // #swagger.description = "Retrieved documents may contain unnecessary fields."
    try {
        const providers = await ProvidersModel.find();
        return res.status(200).json(new apiResponse(200, providers, "Services Retrieved Successfully"));
    } catch(error) {
        return next(new apiError(500, "Server Error"));
    }
}

import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function RequestsDao() {
    const createRequest = (request) => {
        const newRequest = {...request, _id: uuidv4() };
        return model.create(newRequest);
    }
    const deleteRequest = (requestId) => model.findByIdAndDelete(requestId);

    const findAllRequests = () => model.find().populate("userId", "username").exec();



    return {
        findAllRequests, createRequest, deleteRequest
    }

}
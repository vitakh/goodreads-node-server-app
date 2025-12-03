import mongoose from "mongoose";
import requestSchema from "./schema.js";

const RequestModel = mongoose.model('RequestModel', requestSchema);

export default RequestModel;
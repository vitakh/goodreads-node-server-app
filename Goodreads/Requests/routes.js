import RequestsDao from "./dao.js";

export default function RequestRoutes(app) {
    const dao = RequestsDao();

    const createRequest = async (req, res) => {
        const request = req.body;
        const currentUser = req.session["currentUser"];
        request.userId = currentUser._id;
        const requestToPost = await dao.createRequest(request);
        res.json(requestToPost);
    }

    const deleteRequest = async (req, res) => {
        const requestId = req.params.requestId;
        const status = await dao.deleteRequest(requestId);
        res.json(status);
    }

    const findAllRequests = async (req, res) => {
        const requests = await dao.findAllRequests();
        res.json(requests);
    }

    app.post("/api/requests", createRequest);
    app.get("/api/requests", findAllRequests)
    app.delete("/api/requests/delete/:requestId", deleteRequest);
}
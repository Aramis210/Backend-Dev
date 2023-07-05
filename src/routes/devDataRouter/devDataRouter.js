const { Router } = require("express");

const { getDevDataHandler, postDevDataHandler, getDevDataByIdHandler, updateDevDataHandler}  = require("../../handlers/devDataHandlers/devDataHandlers.js");

// const {deleteDevDatas} = require("");

const devDataRouter = Router();


devDataRouter.get("/", getDevDataHandler);
devDataRouter.post("/", postDevDataHandler);
devDataRouter.get("/:id", getDevDataByIdHandler);
devDataRouter.put("/:id", updateDevDataHandler);
// devDataRouter.delete("/:id", deleteDevData);


module.exports= devDataRouter;
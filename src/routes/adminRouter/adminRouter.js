const { Router } = require("express");

const { getAdminsHandler, getAdminByIdHandler, createAdminHandler, updateAdminHandler, setAdminHandler }  = require("../../handlers/adminHandler/adminHandler")

const adminRouter = Router();

adminRouter.get("/", getAdminsHandler); 
adminRouter.get("/:id", getAdminByIdHandler); 
adminRouter.post("/", createAdminHandler);
adminRouter.put("/:id", updateAdminHandler);
adminRouter.patch("/", setAdminHandler);

module.exports = adminRouter;
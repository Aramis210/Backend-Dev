const { Router } = require("express");

const {
    getCompanyHandler,
    getCompanyHandlerId,
    createCompanyHandler,
    updateCompanyPremiumHandler,
    updateCompanyActiveHandler,
    updateCompanyDesactiveHandler,
    deleteCompanyHandler
 } = require("../../handlers/companyHandlers/companyHandlers")


const companyRouter = Router();

companyRouter.get("/", getCompanyHandler);
companyRouter.post("/", createCompanyHandler);
companyRouter.get("/:id", getCompanyHandlerId)
companyRouter.put("/:full_name", updateCompanyPremiumHandler);
companyRouter.patch("/active/:full_name", updateCompanyActiveHandler);
companyRouter.patch("/desactive/:full_name", updateCompanyDesactiveHandler);
companyRouter.delete("/:id", deleteCompanyHandler);


module.exports = companyRouter;
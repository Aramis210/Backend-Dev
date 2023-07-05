const { Router } = require('express');
const authGoogleHandler  = require("../../handlers/authGoogleHandler/authGoogleHandler")

const authRouter = Router();

authRouter.post('/google', authGoogleHandler);

module.exports = authRouter;
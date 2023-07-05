const { Router } = require("express");
const { Users } = require("../../db");
const jwt = require("jsonwebtoken");

const confirmEmailRouter = Router();

confirmEmailRouter.get('/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, 'secret_key');

    const user = await Users.findOne({ where: { email: decoded.email } });

    if (user) {
        user.emailConfirmed = true;
        await user.save();
        res.status(200).send('<h1 style="color: green;">¡La confirmación de correo electrónico ha sido exitosa!</h1>');
      } 
    } catch (error) {
        res.status(400).send('<h1 style="color: red;">Ha ocurrido un error durante la confirmación de correo electrónico.</h1>');
    }
  });
  
  module.exports = confirmEmailRouter;
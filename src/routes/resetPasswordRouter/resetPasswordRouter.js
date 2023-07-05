const { Router } = require("express");
const { Users } = require("../../db");
const crypto = require('crypto');

const resetPasswordRouter = Router();

resetPasswordRouter.put('/', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Busca al usuario por su dirección de correo electrónico
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      // El usuario no existe en la base de datos
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Genera un token seguro para el restablecimiento de contraseña
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Establece el token de restablecimiento y su fecha de caducidad para el usuario
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora de validez para el token

    // Guarda los cambios en el usuario en la base de datos
    await user.save();

    // Envía el token de restablecimiento al usuario (debes implementar tu propio método de envío, como enviar un correo electrónico)

    // Actualiza la contraseña del usuario con la nueva contraseña proporcionada
    user.password = newPassword;

    // Limpia el token de restablecimiento y su fecha de caducidad
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    // Guarda los cambios en el usuario en la base de datos
    await user.save();

    // Restablecimiento de contraseña exitoso
    return res.status(200).json({ message: 'Contraseña restablecida exitosamente' });
  } catch (error) {
    // Manejo de errores
    console.error('Error al restablecer la contraseña:', error);
    return res.status(500).json({ error: 'Ha ocurrido un error al restablecer la contraseña' });
  }
});

module.exports = resetPasswordRouter;
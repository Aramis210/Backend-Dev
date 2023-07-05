const jwt = require("jsonwebtoken");

const generateConfirmationToken = (email) => {
    const payload = {
      email: email,
    };
    const token = jwt.sign(payload, 'secret_key', { expiresIn: '1h' });
  
    return token;
  };

  
module.exports = {generateConfirmationToken};
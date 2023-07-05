const { Users } = require("../../db");

const authGoogleUserCreate = async (userName, email) => {
    const password = "userGoogle"
    await Users.findOrCreate({
      where: {
        userName: `${userName}`,
        email: `${email}`,
        password: `${password}`
      }
    })
  }

module.exports = {
    authGoogleUserCreate
}
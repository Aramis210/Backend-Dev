const { authGoogleUserCreate } = require("../../controllers/authController/authController");

const authGoogleHandler = async (req, res) => {
    try {
        const { userName, email } = req.body;
        
        const userGoogle = await authGoogleUserCreate( userName, email );

        res.status(200).json(userGoogle);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message })
    }
}

module.exports = authGoogleHandler;
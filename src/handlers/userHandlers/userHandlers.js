const { createUser, getAllUsers, searchUsersByUserName, searchUserById } = require("../../controllers/usersControllers/usersControllers")


const getUserHandler = async (req, res) => {

    const {userName} = req.query;      
    try {     

        const results = userName ? await searchUsersByUserName(userName) : await getAllUsers()
        if (results.length === 0) throw Error ({message: "No se encontraron usuarios"})
        res.status(200).json(results);
    } catch (error) {
        res.status(400).json({ error: `Error occurred while found users`, detail: error.message })
    }
}


const postUserHandler = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        await createUser(userName, email, password)
        const newUser = await searchUsersByUserName(userName)
        
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getUserByIdHandler = async (req, res) => {
    const {id} = req.params;
    try{
      if(isNaN(id)) {
        let userById = await searchUserById(id)

        if (!userById) throw Error('Error occurred while found user');
        return res.status(200).json(userById);
      }
    } catch(error) {
      return res.status(400).json({ details: error.message });
    }
}

module.exports = {
    getUserHandler,
    postUserHandler,
    getUserByIdHandler
}
const { Users, User_data, Posts, Devdata } = require("../../db");
const { Op } = require("sequelize")

const createUser = async (userName, email, password) => {
    await Users.create({
        userName, email, password
      })
}

const getAllUsers = async () => {
    return await Users.findAll({
        attributes: ['id_users', 'userName', 'email', 'password'],
        include: {
            model: User_data,
            include: {
              model: Devdata
            }
        }
    });
}

const searchUsersByUserName = async (userName) => {
    const users = await Users.findOne({
      where: {
        userName: { [Op.iLike ]: `%${userName}%`}
      },
      attributes: ['id_users', 'userName', 'email', 'password'],
      include: {
        model: User_data,
        include: {
          model: Posts
        }
      }
    })
    return users;
  }

  const searchUserById = async (id) => {
    const UserById = await Users.findByPk(id,
      {  
        attributes: ['id_users', 'userName', 'email'],
        include: {
          model: User_data,
          include: {
            model: Posts
          }
        }
      })

      return UserById;
  };

module.exports = {
    createUser,
    getAllUsers,
    searchUsersByUserName,
    searchUserById
}
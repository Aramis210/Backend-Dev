const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'users',
        {
            id_users: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [6, 20] 
                  }
            },
            emailConfirmed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
              },
        },
        {
            timestamps:false
        });
}
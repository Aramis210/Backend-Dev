const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'comments',
        {
            id_comments: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [0, 500] 
                  }
            },
            likes: {
                type: DataTypes.INTEGER,
                defaultValue: 0
              },
        },
        {
            timestamps:false
        });
}
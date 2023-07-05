const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'roles',
        {
            id_roles: {
                type: DataTypes.INTEGER,                
                primaryKey: true,
                autoIncrement: true,
            },
            rol_type: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            timestamps: false,
        }
    )
}
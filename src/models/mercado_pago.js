const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
      'mercado_pago',
        {
            id_pay: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            PaymentDate: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4
            },
            PaymentAmount: {
                type: DataTypes.DATE,
                allowNull: false
            },
            TypeOfService: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            timestamps: false
        });
    
};
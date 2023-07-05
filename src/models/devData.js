const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
        'devdata',
        {
            id_devData: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            aboutMe: {
                type: DataTypes.STRING,                
                allowNull: true
            },
            experience: {
                type: DataTypes.JSONB,
                allowNull: true
            },
            education: {
                type: DataTypes.JSONB,  
                allowNull: true              
            },
            skills: {
                type: DataTypes.JSON,    
                allowNull: true            
            },
            ratings: {
                type: DataTypes.STRING, 
                allowNull: true
                          
            },
            curriculumVitae: {
                type: DataTypes.JSONB,     
                allowNull: true           
              },
        },
        {
            timestamps: false
        });
}
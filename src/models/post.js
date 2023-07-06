const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define(
      'posts',
      {
        id_post: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [3, 250] // Establece que la longitud máxima es de 250 caracteres
            }
          },
        body: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            len: [10, 500] // Establece que la longitud máxima es de 500 caracteres
          }
        },
        likes: {
          type: DataTypes.INTEGER,
          defaultValue: 0
        },
        date_register: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
        state: {
          type: DataTypes.ENUM (["In Progress", "Finished"]),
          allowNull: true,
        },
        image: {
          type: DataTypes.JSONB,
          allowNull: true
        },
        typePost: {
          type: DataTypes.ENUM (["Job", "Community", "tech"]),
          allowNull: true,
        },
        full_name: {
          type: DataTypes.STRING,
          allowNull: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true          
        },
        interviewerImage: {
          type: DataTypes.JSONB,
          allowNull: true
          },
        resume: {
          type: DataTypes.STRING,
          allowNull: true
        },
        interviewerName: {
          type: DataTypes.JSONB,
          allowNull: true
        }
      },
      {
        paranoid: true, // Habilita soft deletes
        timestamps: false,
      }
    );

  
  };


  
  
  
  
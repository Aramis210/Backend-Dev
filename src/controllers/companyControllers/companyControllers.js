const { User_data, Roles, Posts, Comments, Users} = require("../../db");
const { Op } = require("sequelize");
const cloudinary = require("../../utils/cloudinary");

const createCompany = async (
  full_name,
  backup_email,
  description,
  date_birthday,
  address,
  phone_number,
  profile_image,
  authentication,
  rol_type,
  image
) => {
  let imageUploadResult;

  if (typeof image === 'string') {
    // `image` es una ruta de archivo, usar cloudinary.uploader.upload
    imageUploadResult = await cloudinary.uploader.upload(image, {
      folder: 'company',
    });
  } else if (typeof image === 'object'  && image.url) {
    // `image` es un objeto de imagen con url, usar directamente
    imageUploadResult = image;
  } else {
    throw new Error('Invalid image data');
  }

  return await User_data.create({
    full_name,
    backup_email,
    description,
    date_birthday,
    address,
    phone_number,
    profile_image,
    authentication,
    rol: rol_type,
    image: imageUploadResult ? { url: imageUploadResult.url } : null,
  });
};

const createCompanyUser = async (userName, email, password) => {
  await Users.create({
    userName, email, password
  })
}

const setCompanyUsers = async (userName, full_name) => {
  const companyUser = await Users.findOne({
    where: {
      userName: `${userName}`,
    }
  })  
  const usersToSet = companyUser.dataValues.id_users
  await User_data.update({ id_users: `${usersToSet}`}, {
    where: {
      full_name: `${full_name}`
    }
  })
}


const setCompanyRol = async (rol_type, full_name) => {
  const [companyRol, created] = await Roles.findOrCreate({
    where: {
      rol_type: `${rol_type}`
    }
  })
  const atributoToSet = companyRol.dataValues.id_roles
  await User_data.update({ id_roles: `${atributoToSet}` }, {
    where: {
      full_name: `${full_name}`
    }
  })
}

const setCompanyPremium = async (full_name) => {
  await User_data.update({ isPremium: true }, {
    where: {
      full_name: `${full_name}`
    }
  })
}

const setCompanyDesactive = async (full_name) => {
  await User_data.update({ isActive: false }, {
    where: {
      full_name: `${full_name}`
    }
  })
}

const setCompanyActive = async (full_name) => {
  await User_data.update({ isActive: true }, {
    where: {
      full_name: `${full_name}`
    }
  })
}



// //?Trae las empresas de la DB
const getAllCompanies = async () => {
  return await User_data.findAll({
    include: {
      model: Posts,
      include: {
        model: Comments
      }
    }});
};


//? Obtiene la empresa por ID especifico mas los posteos
const getCompanyById = async (id) => {
      const companyById = await User_data.findByPk(id, {
        include: {
          model: Posts,
          include: {
            model: Comments
          }
        }
        });    
      return companyById;
    }

//* Obtiene la empresa por nombre
const searchCompanyByName = async (full_name) => {
        const companies = await User_data.findAll({
        where: {
          full_name: { [Op.iLike]: `%${full_name}%` }
        },
        include: {
          model: Posts,
          include: {
            model: Comments
          }
        }
        });
        
return companies;
};



module.exports = {
  createCompany,
  setCompanyRol,
  createCompanyUser,
  setCompanyUsers,
  setCompanyPremium,
  setCompanyActive,
  setCompanyDesactive,
  getAllCompanies,
  getCompanyById,
  searchCompanyByName,
 
}



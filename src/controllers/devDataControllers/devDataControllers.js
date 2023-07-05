const { Devdata } = require('../../db');
const cloudinary = require("../../utils/cloudinary");

const createDevData = async (id_user_data, aboutMe, experience, education, skills, ratings, curriculumVitae) => {
    let curriculumVitaeUploadResult;

    if (curriculumVitae) {
      if (typeof curriculumVitae === 'string') {
        // `curriculumVitae` es una ruta de archivo, usar cloudinary.uploader.upload
        curriculumVitaeUploadResult = await cloudinary.uploader.upload(curriculumVitae, {
          folder: 'devDataCV',
        });
      } else if (typeof curriculumVitae === 'object' && curriculumVitae.url) {
        // `curriculumVitae` es un objeto de curriculumVitaen con url, usar directamente
        curriculumVitaeUploadResult = curriculumVitae;
      } else {
        throw new Error('Invalid curriculumVitae data');
      }
    }

    const NewDevData = await Devdata.create({
        id_user_data, aboutMe, experience, education, skills, ratings, 
        curriculumVitae: {
            url: curriculumVitaeUploadResult.url
        }
    });
    return NewDevData;
}


const getAllDevData = async () => {
    const AllDevData = await Devdata.findAll()
    return AllDevData;
};

const getDevDataById = async (id) => {
    const DevDataById = await Devdata.findByPk(id)
    return DevDataById;
};


const updateDevData = async (id_devData, id_user_data, aboutMe, experience, education, skills, ratings) => {
    const DevDataUpdate = await Devdata.update(
        { aboutMe: aboutMe, experience: experience, education: education, skills: skills, ratings: ratings },
        { where: { id_devData: id_devData, id_user_data: id_user_data } }
    );
    return DevDataUpdate;
};

const searchByDevDataName = async (req, res) => {

};





module.exports = {
    createDevData,
    getAllDevData,
    updateDevData,
    getDevDataById,
    searchByDevDataName
}
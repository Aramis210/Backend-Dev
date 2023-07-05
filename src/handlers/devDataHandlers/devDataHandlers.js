const { createDevData, getAllDevData, searchByDevDataName, getDevDataById } = require("../../controllers/devDataControllers/devDataControllers");

const getDevDataHandler = async (req, res) => {
    try {
        const DevData = await getAllDevData();        
        return res.status(200).json(DevData);
      } catch (error) {
        console.error("Error occurred while fetching all DevData", error);
        return res.status(400).json({ details: error.message });
      }
    };

const postDevDataHandler = async (req, res) => {
    try {
        const { id_user_data, aboutMe, experience, education, skills, ratings, curriculumVitae } = req.body;
    
        const newDevData = await createDevData(id_user_data, aboutMe, experience, education, skills, ratings, curriculumVitae);
    
        return res.status(200).json({ newDevData }); 
             
    } catch (error) {
      console.log(error.message)
      return res.status(400).json({ error: error.message });
      
    }
    };

const  getDevDataByIdHandler = async (req, res) => {
    const {id} = req.params;
    try{
      if(isNaN(id)) {
        let devDataById = await getDevDataById(id)

        if (!devDataById) throw Error("The Dev Data post was not found.");
        return res.status(200).json({ devDataById });
      }
    } catch(error) {
      return res.status(400).json({ details: error.message });
    }
    };

const updateDevDataHandler = async (req, res) => {
    const {id_devData, id_user_data, aboutMe, experience, education, skills, ratings} = req.body;

      if (!id_devData && !aboutMe && !experience && !education && !id_user_data && !skills && !ratings) throw new Error("Missing required data");
  
    try {
      if(isNaN(id)) {
        let devDataById = await getDevDataById(id)

        if (!devDataById) throw Error("Dev Data was not found.");
      
      }
      const devDataChanges = await updatePost(id_devData, id_user_data, aboutMe, experience, education, skills, ratings);
  
      return res.status(200).json({ message: "The Dev Data was updated successfully.", devDataChanges });
  
    } catch (error) {
      return res.status(500).json({ error: "An error occurred while updating the Dev Data.", details: error.message });
    }
    };


module.exports = {
    getDevDataHandler,
    postDevDataHandler,
    getDevDataByIdHandler,
    updateDevDataHandler
}
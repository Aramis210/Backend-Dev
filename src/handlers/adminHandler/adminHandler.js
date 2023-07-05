const { getAdmin, updateAdmin, setToAdmin } = require('../../controllers/adminControllers/adminControllers');
const { createCompany, setCompanyUsers, getCompanyById } = require('../../controllers/companyControllers/companyControllers');
const { sendNotification } = require('../../utils/sendEmail')


const getAdminsHandler = async (req, res) => {
    try {
        const allAdmin = await getAdmin();
        res.status(200).json(allAdmin)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAdminByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        if (isNaN(id)) {
            let AdminById = await getCompanyById(id)

            if (!AdminById) throw Error("The Admin was not found.");
            return res.status(200).json(AdminById);
        }
    } catch (error) {
        return res.status(400).json({ details: error.message });
    }
};

const createAdminHandler = async (req, res) => {
    try {
        const { userName, email, full_name, backup_email, date_birthday, address, phone_number, profile_image, authentication, image } = req.body;

        const adminData = await createCompany(
            full_name,
            backup_email,
            date_birthday,
            address,
            phone_number,
            profile_image,
            authentication,
            image,
            rol_type
        );

        await setCompanyUsers(userName, full_name);
        await setCompanyRol(rol_type, full_name);

        sendNotification(email, full_name, rol_type)

        res.status(200).json(adminData);

    } catch (error) {
        res.status(400).json({ details: error.message });
    }
};

const updateAdminHandler = async (req, res) => {
    try {
        const { id, full_name, backup_email, date_birthday, address, phone_number, profile_image, authentication, image, rol } = req.body;

        if (isNaN(id)) {
            let AdminById = await getCompanyById(id)
            if (!AdminById) throw Error("The Admin was not found.");
        }

        const changeAdmin = updateAdmin(id, full_name, backup_email, date_birthday, address, phone_number, profile_image, authentication, image, rol)

        res.status(200).json(changeAdmin);
    } catch (error) {
        res.status(400).json({ details: error.message });
    }
};

const setAdminHandler = async (req, res) => {
    const { id, rol } = req.body
    try {

        const setAdmin = setToAdmin(id, rol)

        res.status(200).json( setAdmin );
    } catch (error) {
        res.status(400).json({ details: error.message });
    }
}

module.exports = {
    getAdminsHandler,
    getAdminByIdHandler,
    createAdminHandler,
    updateAdminHandler,
    setAdminHandler
}
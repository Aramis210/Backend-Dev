const { createNewComment, getCommentById, updateComents, deleteComment } = require('../../controllers/commentsControllers/commentsControllers'); 

const createCommentHandler = async (req, res) => {
        const { description, id_post, id_user_data } = req.body;
    try{
        if (!description, !id_post) throw new Error ('Falta description y id')
        const newCommet = await createNewComment ( description, id_post, id_user_data )
        return res.status(201).json({ message: 'Comentario Creado', newCommet});
    } catch (error){
        return res.status(404).json({ error: error.message })
    }
};

const commentByIdHandler = async (req, res) => {
        const {id} = req.params;
    try{
        if(isNaN(id)){
            let commentById = await getCommentById(id)
            
            if (!commentById) throw Error ('No se encontro el comentario del usuario');
            return res.status(200).json(commentById);
        }
    }catch (error) {
        return res.status(400).json(error.message);
    }
}

const updateCommentHandler = async (req, res) => {
try {
    const { id } = req.params; 
    const { description } = req.body; 
          
    const cometUpdate = await updateComents.findById(id);
    if (!cometUpdate) {
    return res.status(404).json({ error: 'Comentario no encontrado' });
    }

    description = description;
    await updateComents.save();
    return res.status(200).json({message: 'Comentario actualizado con exito'}) 

    } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el comentario' });
    }
}

const deleteCommentHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await deleteComment (id);
        if (!comment) {
            return res.status (404).json ({error: 'El comentario no existe'});
        }

        // const commentDelete = await deleteComment(comment);
        return res.status(200).json ({ message: 'El comentario ha sido eliminado correctamente', 
        // commentDelete
    });

    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}



module.exports = {
    createCommentHandler,
    commentByIdHandler,
    updateCommentHandler,
    deleteCommentHandler
}
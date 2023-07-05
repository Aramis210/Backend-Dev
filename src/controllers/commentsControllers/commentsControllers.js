const {Comments} = require('../../db');

const createNewComment = async (description, id_post, id_user_data) => {
        const newComment = await Comments.create({description, id_post, id_user_data});
        return newComment;
}

const getCommentById = async (id_coments) => {
        const commentsById = await Comments.findByPk(id_coments)
        return commentsById;
} 

const updateComents = async (id, description, id_posts) => {
        const commentsUpdateResult = await Comments.update(
          { description: description },
          { where: { id_coments:  id, id_posts: id_posts } }
        );
        return commentsUpdateResult;
}


// const deleteComment = async (comment) => {
//         const comentDelete = await Comments.destroy(comment);
//         return comentDelete;
// } 
const deleteComment = async (commentId) => {
        const options = {
          where: {
            id_comments: commentId
          }
        };      
        const commentDelete = await Comments.destroy(options);
        return commentDelete;
      };
      


module.exports = {
    createNewComment,
    getCommentById,
    updateComents,
    deleteComment
}
const { Router } = require('express');
const { createCommentHandler, commentByIdHandler, updateCommentHandler, deleteCommentHandler } = require('../../handlers/commentsHandlers/commentsHandlers');

const CommentRouter = Router();

CommentRouter.post ( "/", createCommentHandler ); //Crear nuevo comentario 
CommentRouter.get ( "/:id", commentByIdHandler ); //Encontrar comentario
CommentRouter.put ( "/:comment", updateCommentHandler ); //Actualizar comentario
CommentRouter.delete ( "/:id", deleteCommentHandler ); //Borrar comentario 


module.exports = CommentRouter;
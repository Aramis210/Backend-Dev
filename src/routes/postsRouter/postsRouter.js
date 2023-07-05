const { Router } = require("express");
const {getAllPostsHandler, createPostHandler, getPostByIdHandler, updatePostHandler, deletePostHandler}  = require("../../handlers/postsHandlers/postsHandlers");

const postsRouter = Router();


postsRouter.get("/", getAllPostsHandler);
postsRouter.post("/", createPostHandler);
postsRouter.get("/:id", getPostByIdHandler);
postsRouter.put("/:id",  updatePostHandler);
postsRouter.delete("/:id", deletePostHandler);


module.exports = postsRouter;
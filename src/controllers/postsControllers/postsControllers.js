const { Posts, User_data, Comments } = require ("../../db");
const cloudinary= require ("../../utils/cloudinary")

const createNewPost = async (title, body, state, id_user_data, full_name, email,image, typePost) => {
  let imageUploadResult;

  if (image) {
    if (typeof image === 'string') {
      // `image` es una ruta de archivo, usar cloudinary.uploader.upload
      imageUploadResult = await cloudinary.uploader.upload(image, {
        folder: 'posts',
      });
    } else if (typeof image === 'object' && image.url) {
      // `image` es un objeto de imagen con url, usar directamente
      imageUploadResult = image;
    } else {
      throw new Error('Invalid image data');
    }
  }

  const newPost = await Posts.create({
    title,
    body,
    state: state ? state : null,
    id_user_data,
    image: imageUploadResult ? { url: imageUploadResult.url } : null,
    typePost: typePost ? typePost : null,
    full_name, 
    email
  });

  return newPost;
};

const createNewJobPost = async (title, body, state, id_user_data, image, typePost, resume, interviewerImage, interviewerName) => {
  let imageUploadResult;
  let imageInterviewerUploadResult;

  if (image) {
    if (typeof image === 'string') {
      // `image` es una ruta de archivo, usar cloudinary.uploader.upload
      imageUploadResult = await cloudinary.uploader.upload(image, {
        folder: 'posts',
      });
    } else if (typeof image === 'object' && image.url) {
      // `image` es un objeto de imagen con url, usar directamente
      imageUploadResult = image;
    } else {
      throw new Error('Invalid image data');
    }
  }

  if (interviewerImage) {
    if (typeof interviewerImage === 'string') {
      // `image` es una ruta de archivo, usar cloudinary.uploader.upload
      imageInterviewerUploadResult = await cloudinary.uploader.upload(interviewerImage, {
        folder: 'interviewers',
      });
    } else if (typeof interviewerImage === 'object' && interviewerImage.url) {
      // `image` es un objeto de imagen con url, usar directamente
      imageInterviewerUploadResult = interviewerImage;
    }
  }

  const newPost = await Posts.create({
    title,
    body,
    state: state ? state : null,
    id_user_data,
    image: imageUploadResult ? { url: imageUploadResult.url } : null,
    typePost: typePost ? typePost : null,
    resume: resume ? resume : null,
    interviewer: {
      interviewerImage : imageInterviewerUploadResult ? { url: imageInterviewerUploadResult.url } : null,
      interviewerName : interviewerName ? interviewerName : null
    }
  });

  return newPost;
};



const getAllPosts = async () => {
  const AllPosts = await Posts.findAll(
    { 
      include: [
      { 
        model: User_data, 
        attributes: ['full_name'] 
      },
    {
      model: Comments,
      attributes: ['description', 'id_comments', 'likes'],
      include: {
        model: User_data,
        attributes: ['full_name']
    }}
    ]});
  return AllPosts;
};

const getPostById = async (id) => {
  const PostById = await Posts.findByPk(id,
    { 
      include: [
      { 
        model: User_data, 
        attributes: ['full_name'] 
      },
    {
      model: Comments,
      attributes: ['description', 'id_comments', 'likes'],
      include: {
        model: User_data,
        attributes: ['full_name']
    }}
    ]});
    return PostById;
};


const updatePost = async ( id, title, body, state, id_user_data, image) => {
  const postUpdate = await Posts.update(
        { title: title, body: body, state: state, image:image },
        { where: { id_post:  id, id_user_data:id_user_data  } }
      );
    return postUpdate;
  };

const deletePost = async (post) => {
    const postDelete = await post.destroy();
    return postDelete;
};

const searchPostByType = async (typePost) => {

  const posts = await Posts.findAll({
    where: {
      typePost: `${typePost}`
    },
    include: [{
      model: Comments,
      attributes: ['description', 'id_comments', 'likes'],
      include: [{
        model: User_data,
        attributes: ['full_name']   
      }]
    }]
  });  

  return posts;
};





module.exports = {createNewPost, createNewJobPost, getAllPosts, getPostById, updatePost, deletePost, searchPostByType}

import Post from '../models/postModel.js'

const getAllPosts = async (req, res, next) => {
  try {
    const post = await Post.find()
    res.status(200).json({
      status: 'success',
      results: post.length,
      data: {
        post
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'Get all post fail',
      message: err
    })
  }
}

const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json({
      status: 'success',
      results: post.length,
      data: {
        post
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'Get single post fail',
      message: err
    })
  }
}

const createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        post
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'Create post fail',
      message: err
    })
  }
}

const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(201).json({
      status: 'success',
      data: {
        post
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'Update post fail',
      message: err
    })
  }
}

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: 'success'
    })
  } catch (err) {
    res.status(400).json({
      status: 'Delete post fail',
      message: err
    })
  }
}

export { getAllPosts, getPostById, createPost, updatePost, deletePost }

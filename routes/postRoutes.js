import express from 'express'
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController.js'
import protect from '../middleware/authMiddeware.js'

const router = express.Router()

router.get('/', getAllPosts)
router.get('/:id', getPostById)
router.post('/', protect, createPost)
router.put('/:id', protect, updatePost)
router.delete('/:id', protect, deletePost)

export default router

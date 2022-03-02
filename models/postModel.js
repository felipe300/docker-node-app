import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  body: {
    type: String,
    required: [true, 'Body is required']
  }
})

export default mongoose.model('Post', postSchema)

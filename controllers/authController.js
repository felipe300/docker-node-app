import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js'

const signUp = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = await userModel.create({
      username,
      password: hashedPassword
    })

    req.session.user = newUser

    res.status(201).json({
      status: 'success',
      data: {
        newUser
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'Auth fail',
      message: err
    })
  }
}

const login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await userModel.findOne({ username })

    if (!user) {
      return res.status(404).json({
        status: 'login fail',
        message: 'User not found'
      })
    }

    const isCorrect = await bcrypt.compare(password, user.password)

    if (isCorrect) {
      req.session.user = user
      res.status(200).json({
        status: 'login success'
      })
    } else {
      res.status(400).json({
        status: 'login fail',
        message: 'Incorrect username or password'
      })
    }
  } catch (err) {
    res.status(400).json({
      status: 'login fail',
      message: err
    })
  }
}

export { signUp, login }

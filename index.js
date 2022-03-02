import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import {
  MONGO_IP,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  REDIS_URL,
  REDIS_PORT,
  REDIS_SESSION_SECRET
} from './config/config.js'
import router from './routes/postRoutes.js'
import userRouter from './routes/userRoutes.js'
// use version 3.0.2
import session from 'express-session'
import { createClient } from 'redis'
import store from 'connect-redis'

const RedisStore = store(session)
const redisClient = createClient({
  host: REDIS_URL,
  port: REDIS_PORT
})

redisClient.on('error', function (err) {
  console.log('Could not establish a connection with redis. ' + err)
})
redisClient.on('connect', function (err) {
  console.log('Connected to redis successfully')
})

const app = express()
const PORT = process.env.PORT || 5000
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

// Connect to MongoDB with Retry, NEED WORK
const connectWithRetry = () => {
  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('connected to DB'))
    .catch((err) => {
      console.log('not connected', err)
      setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry()

app.enable('trust proxy')
app.use(cors({}))
app.use(
  session({
    store: new RedisStore({
      client: redisClient,
      ttl: 60
    }),
    secret: REDIS_SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 60_000 // maxAge: 60 * 60 * 1000 // 1 hour
    }
  })
)

app.get('/api/v1', (req, res) => {
  console.log('GET /api/v1')
  res.send('<h2>Hi there from dev!</h2>')
})

app.use(express.json())
app.use('/api/v1/posts', router)
app.use('/api/v1/auth', userRouter)

app.listen(PORT, () => console.log(`Listening on ${PORT}`))

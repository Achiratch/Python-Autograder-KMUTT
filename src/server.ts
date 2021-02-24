import express, { Application, Request, Response } from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import dotenv from 'dotenv'
dotenv.config()
import users from './routes/api/users'
import course from './routes/api/course'


const app: Application = express()

// Body parser middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// DB config
import config from './config/keys'
const db = config.mongoURI;


// Connect to MongoDB
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err))

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users)
app.use('/api/course', course)


// Test Api
app.get('/')

const port: any = 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
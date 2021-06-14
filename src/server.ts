import express, { Application, Request, Response } from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import dotenv from 'dotenv'
dotenv.config()
import users from './routes/api/users'
import course from './routes/api/course'
import question from './routes/api/question'
import assignment from './routes/api/assignment'
import score from './routes/api/score'


import { errorHandler } from './middleware/error'
import fs from 'fs'
import path from 'path'
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
app.use('/api/question', question)
app.use('/api/assignment', assignment)
app.use('/api/score', score)


// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, 'clinet', 'build', 'index.html'))
    })
}
// ErrorHandler
app.use(errorHandler)
const port: any = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))

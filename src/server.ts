import express, { Application, Request, Response } from 'express'
import mongoose from 'mongoose'
import passport from 'passport'

import users from './routes/api/users'

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

// Use Routes
app.use('/api/users', users)

// Test Api
app.get('/')

const port: any = 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
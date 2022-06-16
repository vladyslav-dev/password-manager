import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose, { ConnectOptions } from 'mongoose'
import routes from './routes/index'

// Middleware
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(cors())


// Routes
app.use('/api', routes)

// Enviroment variables

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

// Start server

const start = async () => {
    try {

        if (MONGO_URI) {
            mongoose.connect(MONGO_URI, {
                useCreateIndex: true,
                useFindAndModify: false,
                useNewUrlParser: true,
                useUnifiedTopology: true
            } as ConnectOptions, (err) => {
                if(err) throw err;
                console.log('MongoDB connected!')
            })
        } else {
            throw new Error('Environment variable MONGO_URI is not defined')
        }


        app.listen(PORT, () => console.log('Server has been started on PORT ', PORT))

    } catch (err) {
        console.error(err)
    }
}


start()

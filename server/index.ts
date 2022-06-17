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
// app.use(cors())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));


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

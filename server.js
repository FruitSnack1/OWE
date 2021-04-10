import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import router from './routes/router.js'


const app = express()
app.use(cors())
app.use(express.json())

app.use('/', router)

mongoose.connect('mongodb://localhost/owe', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to database...')
});

app.listen(3001)
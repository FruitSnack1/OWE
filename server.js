import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import router from './routes/router.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('upload'))

app.use('/', router)

mongoose.connect('mongodb+srv://inzeraty:inzeraty@cluster0.orwb0.mongodb.net/owe?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.on('open', () => { console.log('Connected to database...') })

app.listen(80)
import express from 'express'
import cors from 'cors'
import path from 'node:path'
import helmet from 'helmet'
import morgan from 'morgan'
import 'dotenv/config'
import { fileURLToPath } from 'node:url'
import userRoutes from './router/user.js'
import menuRouter from './router/menu.js'
import mongoose from 'mongoose'

const app = express()


//MiddleWare 
app.disable('x-powered-by')
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

// Connection to dabase
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB is running'))
    .catch((err) => console.error(err))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');


//Visual Route


//Backend Route
app.use('/api/users', userRoutes)
app.use('/api/menu', menuRouter)


const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})
import express from 'express'
import dotenv from "dotenv"
import morgan from "morgan"
import connectDB from './config/db.js'
import authRoute from "./routes/authRoute.js"
import categoryRoute from './routes/categoryRoutes.js'
import productRoute from './routes/productRoute.js'
import cors from 'cors'

// configure env
dotenv.config()

// databse config
connectDB()

const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/product',productRoute)



app.get("/", (req, res) => {
    res.send(
        {
            message: "hey world"
        }
    )
})

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`server is running at ${port} on ${process.env.DEV_MODE} mode`.bgCyan.white)
})
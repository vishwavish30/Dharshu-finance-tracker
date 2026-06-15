import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import protect from './middleware/authMiddleware.js'
import transactionRoutes from './routes/transactionRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/profile', protect, (req, res) => {
  res.json({
    message: 'Protected Route Access Granted',
    userId: req.user.id,
  })
})

app.use('/api/auth', authRoutes)

app.use('/api/transactions', transactionRoutes)

app.get('/', (req, res) => {
  res.send('Finance Tracker API Running 🚀')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
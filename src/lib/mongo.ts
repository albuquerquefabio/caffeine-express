import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const dbName = process.env.DB_NAME || 'express-ts'
const uri = process.env.MONGO_URI || `mongodb://localhost:27017/${dbName}`

const mongoConnect = () => async (): Promise<void> => {
  try {
    await mongoose.connect(uri, { autoIndex: true })

    console.log('MongoDB connected')
  } catch (error) {
    console.error(`MongoDB connection error ${new Date().toISOString()}`, error)
    process.exit(1)
  }
}

export default mongoConnect()

import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String
})

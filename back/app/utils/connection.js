import mongoose from 'mongoose'

export default mongoose.connect('mongodb://localhost:27017/api', { useNewUrlParser: true, socketTimeoutMS: 45000 });
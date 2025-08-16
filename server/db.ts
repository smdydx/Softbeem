import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.DATABASE_URL && !process.env.MONGODB_URI) {
      throw new Error('DATABASE_URL or MONGODB_URI environment variable is required');
    }

    const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || 'mongodb://localhost:27017/ramaera';
    const conn = await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
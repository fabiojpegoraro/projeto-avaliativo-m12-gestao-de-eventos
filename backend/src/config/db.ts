import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI não está definida nas variáveis de ambiente.');
  }

  await mongoose.connect(uri);
};

export default connectDB;

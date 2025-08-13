import mongoose from 'mongoose';

interface DatabaseConfig {
  uri: string;
  options: mongoose.ConnectOptions;
}

const config: DatabaseConfig = {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/mydb',
  options: {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }
};

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.uri, config.options);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
};

export default config;
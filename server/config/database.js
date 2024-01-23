import mongoose from 'mongoose';
import winston from 'winston';

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryWrites: true,
        w: 'majority'
      }
    );
    winston.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    winston.error(`MongoDB Connection Error: ${err.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDatabase;

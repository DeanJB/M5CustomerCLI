import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
      try {
            const uri = process.env.MONGO_URI;
            console.log("Connecting to MongoDB..."),
                  await mongoose.connect(uri, {
                        // useNewUrlParser: true,
                        // useUnifiedTopology: true,
                        serverSelectionTimeoutMS: 10000,
                  });
            // console.log(`MongoDB connected...${mongoose.connection.host}`);
            return mongoose.connection;
      } catch (error) {
            console.error(error.message);
            process.exit(1);
      }
};

export default connectDB;

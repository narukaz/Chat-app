import mongoose from 'mongoose'; // ES6 import
import dotenv from 'dotenv'; // ES6 import

dotenv.config(); // Load environment variables

const mongoURI = process.env.DATABASE_URL;

 const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        // Optional: You can add process.exit(1) here if you want to terminate on error
    }
};

export default connectToDatabase;
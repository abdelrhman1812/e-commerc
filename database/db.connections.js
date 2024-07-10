import mongoose from 'mongoose';

const dbConnections = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/e-commerce');
        console.log(' ======= Connected to MongoDB successfully ======= ');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default dbConnections


import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const db = await mongoose.connect('mongodb+srv://admin:root@cluster0.6jc7vwh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`MongoDB Connected: ${url}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;

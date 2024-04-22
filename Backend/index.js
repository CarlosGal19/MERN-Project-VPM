import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import vetRoutes from './routes/vetRoutes.js';

const app = express();

dotenv.config();

connectDB();

app.use('/vet', vetRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});



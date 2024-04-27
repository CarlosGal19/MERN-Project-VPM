import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import vetRoutes from './routes/vetRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

dotenv.config();

connectDB();

const allowDomains = [
    'http://localhost:5173',
];

const corsOptions = {
    origin: allowDomains,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/vet', vetRoutes);
app.use('/patient', patientRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

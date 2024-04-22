import express from 'express';
import connectDB from './config/db.js';

const app = express();

connectDB();

app.listen(4000, () => {
    console.log('Server is running on port 4000')
});

app.use('/', (req, res) => {
    res.send('Hello World!');
});

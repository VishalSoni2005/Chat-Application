import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors(
    {
        origin: 'http://localhost:5173', // Change this to your frontend's URL
        credentials: true,
    }
));
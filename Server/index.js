import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors(
    {
        origin: 'http://localhost:5173', 
        credentials: true,
    }
));
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
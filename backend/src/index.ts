import express from 'express';
import cors from 'cors';
import "reflect-metadata";
import { createConnection } from 'typeorm';
import companyRoutes from './routes/companyRoutes';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', companyRoutes);

createConnection().then(() => {
    console.log("Connected to the database");

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch((error) => console.log("Database connection error: ", error));

// Define routes here...

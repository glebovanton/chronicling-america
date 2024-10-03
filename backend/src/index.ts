import express from 'express';
import cors from 'cors';
import "reflect-metadata";
import { createConnection } from 'typeorm';
import 'module-alias/register';
import 'dotenv/config'
import indexRoutes from 'src/routes/indexRoutes';
import companyRoutes from 'src/routes/companyRoutes';

const app = express();
const PORT = process.env.BASE_PORT || 5002;


app.use(cors());
app.use(express.json());
app.use('/', indexRoutes);
app.use('/api', companyRoutes);

createConnection().then(() => {
    console.log("Connected to the database");

    app.listen(PORT, () => {
        console.log(`Server on http://localhost:${PORT}`);
        console.log(`API on http://localhost:${PORT}/api/companies`);
    });
}).catch((error) => console.log("Database connection error: ", error));


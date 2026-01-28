import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import routes from "./routes/index.js";
import { appDataSource } from "./database/appDataSource.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";

import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6060;

app.set('trust proxy', 1);

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
}));

app.use(helmet({
    contentSecurityPolicy: true
}));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(compression({ threshold: 1024 }))

app.use('/api', routes);

app.use(errorHandler)

// Tentando se conectar com o banco de dados
appDataSource.initialize()
    .then(() => {
        console.log("Conectou com o banco!");

        app.listen(PORT, () => {
            console.log(`Server is running in port: ${PORT}`)
        })

    })
    .catch((error) => {
        console.log(error)
    })


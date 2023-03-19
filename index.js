import express from "express";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

/** MONGOOSE */
import mongoose from 'mongoose';

/** ENV */
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
const appEnv = dotenv.config();
dotenvExpand.expand(appEnv);

/** SWAGGER */
import swaggerUi from "swagger-ui-express";
const swaggerJson = require("./swagger.json");

/** ROUTES */
import events from './routers/events.js';

/** APP */
const app = express();

app.use(express.json());

app.use('/events', events);

app.get('/', (req, res) => {
    res.redirect(301, '/api-docs');
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

mongoose.connect(process.env.CONN_STR)
.then(res => {
    app.listen(process.env.PORT);
    console.log(`Listening: http://${process.env.HOSTNAME}:${process.env.PORT}`);
    console.log(`Swagger UI: http://${process.env.HOSTNAME}:${process.env.PORT}/api-docs`);
})
.catch(err => {
    console.log("Database Error:", err);
});
import express from "express";
import pgClient from './config/db.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

/** SWAGGER */
import swaggerUi from "swagger-ui-express";
const swaggerJson = require("./swagger.json");

/** ROUTES */
import eventRouter from './routers/eventRouter.js';

/** ENV */
const port = process.env.PORT;

/** APP */
const app = express();

app.use(express.json());

app.use('/events', eventRouter);

app.get('/', (req, res) => {
    res.redirect(301, '/api-docs');
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.listen(port, () => {
    pgClient.connect(err => {
        if (err) {
            console.log(`Error: ${err.stack}`);
        } else {
            console.log(`Listening: http://${process.env.HOSTNAME}:${port}`);
            console.log(`Swagger UI: http://${process.env.HOSTNAME}:${port}/api-docs`);
        }
    });
});
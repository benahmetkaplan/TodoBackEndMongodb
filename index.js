import express from "express";
import connection from './config/db.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

/** SWAGGER */
import swaggerUi from "swagger-ui-express";
const swaggerJson = require("./swagger.json");

/** ROUTES */
import events from './routers/events.js';

/** ENV */
const port = process.env.PORT;

/** APP */
const app = express();

app.use(express.json());

app.use('/events', events);

app.get('/', (req, res) => {
    res.redirect(301, '/api-docs');
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.listen(port, () => {
    connection.connect(err => {
        if (err) {
            console.log("Database Error:", err);
        }else{
            console.log(`Listening: http://${process.env.HOSTNAME}:${port}`);
            console.log(`Swagger UI: http://${process.env.HOSTNAME}:${port}/api-docs`);
        }
    });
});
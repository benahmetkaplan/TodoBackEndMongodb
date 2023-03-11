import express from "express";
import postgresClient from './config/db.js';
import eventRouter from './routers/eventRouter.js';
import swaggerUi from "swagger-ui-express";
import swaggerJson from './swagger.json' assert {type: 'json'};

const app = express();

app.use(express.json());

app.use('/events', eventRouter);

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.redirect(301, '/api-docs');
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.listen(PORT, () => {
    postgresClient.connect(err => {
        if (err) {
            console.log(`Error: ${err.stack}`);
        } else {
            console.log(`Listening: http://${process.env.HOSTNAME}:${PORT}`);
            console.log(`Swagger UI: http://${process.env.HOSTNAME}:${PORT}/api-docs`);
        }
    });
});
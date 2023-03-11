import express from "express";
import postgresClient from './config/db.js';
import eventRouter from './routers/eventRouter.js';
import swaggerUi from "swagger-ui-express";
import swaggerJson from './swagger.json' assert {type: 'json'};

const app = express();

app.use(express.json());

app.use('/events', eventRouter);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.redirect(301, '/api-docs');
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.listen(PORT, () => {
    postgresClient.connect(err => {
        if (err) {
            console.log(`Error: ${err.stack}`);
        }
    });
});
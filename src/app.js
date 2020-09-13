const express = require('express');
const { CarController } = require('./module/car/module')

const app = express();
const port = 3000;

const controller = new CarController();
controller.configureRoutes(app);

app.get('/', controller.index.bind(CarController));

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

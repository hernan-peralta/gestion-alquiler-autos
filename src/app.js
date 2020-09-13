const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const { CarController } = require('./module/car/module');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../public')));

// https://mozilla.github.io/nunjucks/getting-started.html#when-using-node
nunjucks.configure('src/module', {
  autoescape: true,
  express: app,
});

const controller = new CarController();
controller.configureRoutes(app);

app.get('/', controller.index.bind(CarController));

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

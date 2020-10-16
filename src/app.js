require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');

const configureDI = require('./config/di');
const { init: initCarModule } = require('./module/car/module');
const { init: initCustomerModule } = require('./module/customer/module');
const { init: initRentalModule } = require('./module/rental/module');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// https://mozilla.github.io/nunjucks/getting-started.html#when-using-node
nunjucks.configure('src/module', {
  autoescape: true,
  express: app,
});

const container = configureDI();
app.use(container.get('Session'));
initCarModule(app, container);
initCustomerModule(app, container);
initRentalModule(app, container);

/**
 * @type {import('./module/car/controller/carController')} controller;
 */
const carController = container.get('CarController');

app.get('/', carController.index.bind(carController));

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

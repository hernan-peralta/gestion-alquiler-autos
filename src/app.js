const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const { CarController, CarService, CarRepository } = require('./module/car/module');
const Sqlite3Database = require('better-sqlite3');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// https://mozilla.github.io/nunjucks/getting-started.html#when-using-node
nunjucks.configure('src/module', {
  autoescape: true,
  express: app,
});

const db = new Sqlite3Database('sample.db', { verbose: console.log })
const repository = new CarRepository(db)

const service = new CarService(repository)
const controller = new CarController(service);
controller.configureRoutes(app);

app.get('/', controller.index.bind(controller));

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const Sqlite3Database = require('better-sqlite3');
const session = require('express-session');
const { CarController, CarService, CarRepository } = require('./module/car/module');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// https://mozilla.github.io/nunjucks/getting-started.html#when-using-node
nunjucks.configure('src/module', {
  autoescape: true,
  express: app,
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 604800000 }, // segundos en una semana
}));

const db = new Sqlite3Database(process.env.DB_PATH, { verbose: console.log });
const repository = new CarRepository(db);
const service = new CarService(repository);
const controller = new CarController(service);
controller.configureRoutes(app);

app.get('/', controller.index.bind(controller));

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));

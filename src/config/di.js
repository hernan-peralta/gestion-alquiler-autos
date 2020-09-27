const {
  default: DIContainer, object, get, factory,
} = require('rsdi');
const { Sequelize } = require('sequelize');
const session = require('express-session');
const { CarController, CarService, CarRepository } = require('../module/car/module');
const CarModel = require('../module/car/model/carModel');

function configureMainDatabaseAdapter() {
  return new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH,
    logging: console.log,
  });
}

/**
 * @param {DIContainer} container
 */
function configureDatabaseModelInstance(container) {
  return CarModel.setup(container.get('MainDatabaseAdapter'));
}

function configureSession() {
  const SECONDS_IN_A_WEEK = 604800000;

  const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: SECONDS_IN_A_WEEK },
  };
  return session(sessionOptions);
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
  container.addDefinitions({
    MainDatabaseAdapter: factory(configureMainDatabaseAdapter),
    Session: factory(configureSession),
    CarModelInstance: factory(configureDatabaseModelInstance),
  });
}

/**
 * @param {DIContainer} container
 */
function addCarModuleDefinitions(container) {
  container.addDefinitions({
    CarController: object(CarController).construct(get('CarService')),
    CarService: object(CarService).construct(get('CarRepository')),
    CarRepository: object(CarRepository).construct(get('CarModelInstance')),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addCarModuleDefinitions(container);
  return container;
};

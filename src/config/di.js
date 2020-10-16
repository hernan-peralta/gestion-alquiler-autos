const {
  default: DIContainer, object, get, factory,
} = require('rsdi');
const { Sequelize } = require('sequelize');
const session = require('express-session');
const { CarController, CarService, CarRepository } = require('../module/car/module');
const { CustomerController, CustomerService, CustomerRepository } = require('../module/customer/module');
const { RentalController, RentalService, RentalRepository } = require('../module/rental/module');
const CarModel = require('../module/car/model/carModel');
const CustomerModel = require('../module/customer/model/customerModel');
const RentalModel = require('../module/rental/model/rentalModel');

function configureMainDatabaseAdapter() {
  return new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH,
  });
}

/**
 * @param {DIContainer} container
 */
function configureCarModel(container) {
  return CarModel.setup(container.get('Sequelize'));
}

/**
 * @param {DIContainer} container
 */
function configureCustomerModel(container) {
  return CustomerModel.setup(container.get('Sequelize'));
}

/**
 * @param {DIContainer} container
 */
function configureRentalModel(container) {
  RentalModel.setup(container.get('Sequelize'));
  RentalModel.setupAssociations(container.get('CarModelInstance'), container.get('CustomerModelInstance'));
  return RentalModel;
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
    Sequelize: factory(configureMainDatabaseAdapter),
    Session: factory(configureSession),
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
    CarModelInstance: factory(configureCarModel),
  });
}

/**
 * @param {DIContainer} container
 */
function addCustomerModuleDefinitions(container) {
  container.addDefinitions({
    CustomerController: object(CustomerController).construct(get('CustomerService')),
    CustomerService: object(CustomerService).construct(get('CustomerRepository')),
    CustomerRepository: object(CustomerRepository).construct(get('CustomerModelInstance')),
    CustomerModelInstance: factory(configureCustomerModel),
  });
}

/**
 * @param {DIContainer} container
 */
function addRentalModuleDefinitions(container) {
  container.addDefinitions({
    RentalController: object(RentalController).construct(get('RentalService')),
    RentalService: object(RentalService).construct(get('RentalRepository')),
    RentalRepository: object(RentalRepository).construct(get('RentalModelInstance'), get('CarModelInstance'), get('CustomerModelInstance')),
    RentalModelInstance: factory(configureRentalModel),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addCarModuleDefinitions(container);
  addCustomerModuleDefinitions(container);
  addRentalModuleDefinitions(container);
  return container;
};

const CarController = require('./controller/carController');
const CarService = require('./service/carService');
const CarRepository = require('./repository/sqlite/carRepository');

module.exports = {
  CarController,
  CarService,
  CarRepository
};

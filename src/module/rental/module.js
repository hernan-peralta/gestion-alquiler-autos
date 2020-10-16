const RentalController = require('./controller/rentalController');
const RentalService = require('./service/rentalService');
const RentalRepository = require('./repository/sqlite/rentalRepository');

/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */
function init(app, container) {
  /**
   * @type {RentalController} controller
   */
  const controller = container.get('RentalController');
  controller.configureRoutes(app);
}

module.exports = {
  init,
  RentalController,
  RentalService,
  RentalRepository,
};

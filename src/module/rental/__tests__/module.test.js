const rentalModule = require('../module');

test('init inicializa el modulo', () => {
  const app = {};
  const controller = { configureRoutes: jest.fn() };

  const get = jest.fn().mockImplementation(() => controller);
  const container = { get };

  rentalModule.init(app, container);

  expect(container.get).toHaveBeenCalledWith('RentalController');
  expect(controller.configureRoutes).toHaveBeenCalledWith(app);
});

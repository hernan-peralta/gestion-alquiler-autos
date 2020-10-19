const customerModule = require('../module');

test('init inicializa el modulo', () => {
  const app = {};
  const controller = { configureRoutes: jest.fn() };

  const get = jest.fn().mockImplementation(() => controller);
  const container = { get };

  customerModule.init(app, container);

  expect(container.get).toHaveBeenCalledWith('CustomerController');
  expect(controller.configureRoutes).toHaveBeenCalledWith(app);
});

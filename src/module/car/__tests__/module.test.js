const carModule = require('../module');

test('init inicializa el modulo', () => {
  const app = {};
  const controller = { configureRoutes: jest.fn() };

  const get = jest.fn().mockImplementation(() => controller);
  const container = { get };

  carModule.init(app, container);

  expect(container.get).toHaveBeenCalledWith('CarController');
  expect(controller.configureRoutes).toHaveBeenCalledWith(app);
});

const AbstractController = require('../abstractController');
const AbstractControllerError = require('../error/abstractControllerError');

test('No se puede instanciar el controlador abstracto', () => {
  try {
    // eslint-disable-next-line no-new
    new AbstractController();
  } catch (e) {
    expect(e).toBeInstanceOf(AbstractControllerError);
  }
});

test('Se puede instanciar una clase que herede del controlador abstracto', () => {
  class Controller extends AbstractController {}

  const instancia = new Controller();

  expect(instancia).toBeInstanceOf(AbstractController);
});

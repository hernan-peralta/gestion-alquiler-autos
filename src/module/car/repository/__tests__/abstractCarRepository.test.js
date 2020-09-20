/* eslint-disable max-classes-per-file */

const AbstractCarRepository = require('../abstractCarRepository');
const AbstractCarRepositoryError = require('../error/abstractCarRepositoryError');
const MethodNotImplementedError = require('../error/methodNotImplementedError');

test('No se puede instanciar un repositorio abstracto', () => {
  let carInstance;
  try {
    carInstance = new AbstractCarRepository();
  } catch (e) {
    expect(e).toBeInstanceOf(AbstractCarRepositoryError);
  } finally {
    expect(carInstance).toBeUndefined();
  }
});

test('Se puede instanciar un repositorio concreto que herede del repositorio abstracto', () => {
  const ConcreteRepository = class extends AbstractCarRepository {};
  const respositoryInstance = new ConcreteRepository();
  expect(respositoryInstance).toBeInstanceOf(ConcreteRepository);
  expect(respositoryInstance).toBeInstanceOf(AbstractCarRepository);
});

test('Llamar a métodos base sin implementación concreta da error', () => {
  const ConcreteRepository = class extends AbstractCarRepository {};
  const instance = new ConcreteRepository();
  expect(() => instance.save()).rejects.toThrowError(MethodNotImplementedError);
  expect(() => instance.delete()).rejects.toThrowError(MethodNotImplementedError);
  expect(() => instance.getAll()).rejects.toThrowError(MethodNotImplementedError);
  expect(() => instance.getById()).rejects.toThrowError(MethodNotImplementedError);
});

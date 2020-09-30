/* eslint-disable max-classes-per-file */

const AbstractCustomerRepository = require('../abstractCustomerRepository');
const AbstractCustomerRepositoryError = require('../error/abstractCustomerRepositoryError');
const MethodNotImplementedError = require('../error/methodNotImplementedError');

test('No se puede instanciar un repositorio abstracto', () => {
  let customerInstance;
  try {
    customerInstance = new AbstractCustomerRepository();
  } catch (e) {
    expect(e).toBeInstanceOf(AbstractCustomerRepositoryError);
  } finally {
    expect(customerInstance).toBeUndefined();
  }
});

test('Se puede instanciar un repositorio concreto que herede del repositorio abstracto', () => {
  const ConcreteRepository = class extends AbstractCustomerRepository {};
  const respositoryInstance = new ConcreteRepository();
  expect(respositoryInstance).toBeInstanceOf(ConcreteRepository);
  expect(respositoryInstance).toBeInstanceOf(AbstractCustomerRepository);
});

test('Llamar a métodos base sin implementación concreta da error', () => {
  const ConcreteRepository = class extends AbstractCustomerRepository {};
  const instance = new ConcreteRepository();
  expect(() => instance.save()).rejects.toThrowError(MethodNotImplementedError);
  expect(() => instance.delete()).rejects.toThrowError(MethodNotImplementedError);
  expect(() => instance.getAll()).rejects.toThrowError(MethodNotImplementedError);
  expect(() => instance.getById()).rejects.toThrowError(MethodNotImplementedError);
});

/* eslint-disable max-classes-per-file */

const AbstractRentalRepository = require('../abstractRentalRepository');
const AbstractRentalRepositoryError = require('../error/abstractRentalRepositoryError');
const MethodNotImplementedError = require('../error/methodNotImplementedError');

test('No se puede instanciar un repositorio abstracto', () => {
  let rentalInstance;
  try {
    rentalInstance = new AbstractRentalRepository();
  } catch (e) {
    expect(e).toBeInstanceOf(AbstractRentalRepositoryError);
  } finally {
    expect(rentalInstance).toBeUndefined();
  }
});

test('Se puede instanciar un repositorio concreto que herede del repositorio abstracto', () => {
  const ConcreteRepository = class extends AbstractRentalRepository {};
  const respositoryInstance = new ConcreteRepository();
  expect(respositoryInstance).toBeInstanceOf(ConcreteRepository);
  expect(respositoryInstance).toBeInstanceOf(AbstractRentalRepository);
});

test('Llamar a métodos base sin implementación concreta da error', () => {
  const ConcreteRepository = class extends AbstractRentalRepository {};
  const instance = new ConcreteRepository();
  expect(() => instance.save()).rejects.toThrowError(MethodNotImplementedError);
  expect(() => instance.delete()).rejects.toThrowError(MethodNotImplementedError);
  expect(() => instance.getAll()).rejects.toThrowError(MethodNotImplementedError);
  expect(() => instance.getById()).rejects.toThrowError(MethodNotImplementedError);
});

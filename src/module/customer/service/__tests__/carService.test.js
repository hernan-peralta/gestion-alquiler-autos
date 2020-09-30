const CustomerService = require('../customerService');
const Customer = require('../../entity/customer');
const CustomerNotDefinedError = require('../error/customerNotDefinedError');
const CustomerIdNotDefinedError = require('../error/customerIdNotDefinedError');

const repositoryMock = ({
  save: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
});

const customerService = new CustomerService(repositoryMock);

test('Guardar un cliente llama al método save del repositorio 1 vez', async () => {
  await customerService.save({});

  expect(repositoryMock.save).toBeCalledTimes(1);
});

test('Llamar a guardar un cliente sin pasar un cliente da un error específico', async () => {
  expect(await customerService.save).rejects.toThrowError(CustomerNotDefinedError);
});

test('Eliminar un cliente llama al método delete del repositorio 1 vez', async () => {
  const customerMock = new Customer({});
  await customerService.delete(customerMock);

  expect(repositoryMock.delete).toBeCalledTimes(1);
});

test('Llamar a eliminar un cliente sin pasar un cliente da un error específico', async () => {
  expect(await customerService.delete).rejects.toThrowError(CustomerNotDefinedError);
});

test('Consultar un cliente por id llama al método get del repositorio 1 vez', async () => {
  await customerService.getById(1);

  expect(repositoryMock.getById).toBeCalledTimes(1);
});

test('Llamar a consultar un cliente sin pasar un cliente da un error específico', async () => {
  expect(await customerService.getById).rejects.toThrowError(CustomerIdNotDefinedError);
});

test('Consultar todos los clientes llama al método getAll del repositorio 1 vez', async () => {
  await customerService.getAll();

  expect(repositoryMock.getAll).toBeCalledTimes(1);
});

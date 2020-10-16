const RentalService = require('../rentalService');
const Rental = require('../../entity/rental');
const RentalNotDefinedError = require('../error/rentalNotDefinedError');
const RentalIdNotDefinedError = require('../error/rentalIdNotDefinedError');

const repositoryMock = ({
  save: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
});

const rentalService = new RentalService(repositoryMock);

test('Guardar un cliente llama al método save del repositorio 1 vez', async () => {
  await rentalService.save({});

  expect(repositoryMock.save).toBeCalledTimes(1);
});

test('Llamar a guardar un cliente sin pasar un cliente da un error específico', async () => {
  expect(await rentalService.save).rejects.toThrowError(RentalNotDefinedError);
});

test('Eliminar un cliente llama al método delete del repositorio 1 vez', async () => {
  const rentalMock = new Rental({});
  await rentalService.delete(rentalMock);

  expect(repositoryMock.delete).toBeCalledTimes(1);
});

test('Llamar a eliminar un cliente sin pasar un cliente da un error específico', async () => {
  expect(await rentalService.delete).rejects.toThrowError(RentalNotDefinedError);
});

test('Consultar un cliente por id llama al método get del repositorio 1 vez', async () => {
  await rentalService.getById(1);

  expect(repositoryMock.getById).toBeCalledTimes(1);
});

test('Llamar a consultar un cliente sin pasar un cliente da un error específico', async () => {
  expect(await rentalService.getById).rejects.toThrowError(RentalIdNotDefinedError);
});

test('Consultar todos los clientes llama al método getAll del repositorio 1 vez', async () => {
  await rentalService.getAll();

  expect(repositoryMock.getAll).toBeCalledTimes(1);
});

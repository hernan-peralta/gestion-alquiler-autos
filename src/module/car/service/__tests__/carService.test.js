const CarService = require('../carService');
const Car = require('../../entity/car');
const CarNotDefinedError = require('../error/carNotDefinedError');
const CarIdNotDefinedError = require('../error/carIdNotDefinedError');

const repositoryMock = ({
  save: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
});

const carService = new CarService(repositoryMock);

test('Guardar un auto llama al método save del repositorio 1 vez', async () => {
  await carService.save({});

  expect(repositoryMock.save).toBeCalledTimes(1);
});

test('Llamar a guardar un auto sin pasar un auto da un error específico', async () => {
  expect(await carService.save).rejects.toThrowError(CarNotDefinedError);
});

test('Eliminar un auto llama al método delete del repositorio 1 vez', async () => {
  const carMock = new Car({});
  await carService.delete(carMock);

  expect(repositoryMock.delete).toBeCalledTimes(1);
});

test('Llamar a eliminar un auto sin pasar un auto da un error específico', async () => {
  expect(await carService.delete).rejects.toThrowError(CarNotDefinedError);
});

test('Consultar un auto por id llama al método get del repositorio 1 vez', async () => {
  await carService.getById(1);

  expect(repositoryMock.getById).toBeCalledTimes(1);
});

test('Llamar a consultar un auto sin pasar un auto da un error específico', async () => {
  expect(await carService.getById).rejects.toThrowError(CarIdNotDefinedError);
});

test('Consultar todos los autos llama al método getAll del repositorio 1 vez', async () => {
  await carService.getAll();

  expect(repositoryMock.getAll).toBeCalledTimes(1);
});

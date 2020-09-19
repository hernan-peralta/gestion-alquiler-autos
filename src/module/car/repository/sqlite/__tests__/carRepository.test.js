const Sqlite3Database = require('better-sqlite3');
const fs = require('fs');
const CarRepository = require('../carRepository');
const CarNotFoundError = require('../../error/carNotFoundError');
const CarIdNotFoundError = require('../../error/carIdNotDefinedError');
const Car = require('../../../entity/car');

let mockDb;

beforeEach(() => {
  mockDb = new Sqlite3Database(':memory:');
  const migration = fs.readFileSync('./src/config/setup.sql', 'utf-8');
  mockDb.exec(migration);
});

test('Guardar un auto nuevo genera un id', () => {
  const carRepository = new CarRepository(mockDb);
  const carMock = new Car({
    marca: 'undefined',
    modelo: 'undefined',
    año: 'undefined',
    kms: 'undefined',
    color: 'undefined',
    aireAcondicionado: 'undefined',
    pasajeros: 'undefined',
    transmision: 'undefined',
  });

  const savedCar = carRepository.save(carMock);
  expect(savedCar.id).toEqual(1);
});

test('Guardar un auto existente actualiza los valores', () => {
  const carRepository = new CarRepository(mockDb);
  const carMock = new Car({
    marca: 'undefined',
    modelo: 'undefined',
    año: 'undefined',
    kms: 'undefined',
    color: 'undefined',
    aireAcondicionado: 'undefined',
    pasajeros: 'undefined',
    transmision: 'undefined',
  });

  let savedCar = carRepository.save(carMock);
  expect(savedCar.id).toEqual(1);

  savedCar.marca = 'nueva_marca';

  savedCar = carRepository.save(savedCar);
  expect(savedCar.id).toEqual(1);
  expect(savedCar.marca).toEqual('nueva_marca');
});

test('Guardar un auto con id que no existe da error', () => {
  const carRepository = new CarRepository(mockDb);
  const carMock = new Car({
    id: 99,
    marca: 'undefined',
    modelo: 'undefined',
    año: 'undefined',
    kms: 'undefined',
    color: 'undefined',
    aireAcondicionado: 'undefined',
    pasajeros: 'undefined',
    transmision: 'undefined',
  });

  expect(() => carRepository.save(carMock).toThrowError(CarNotFoundError));
});

test('Buscar un auto con id que no existe da error', () => {
  const carRepository = new CarRepository(mockDb);
  const carMock = new Car({
    id: 99,
    marca: 'undefined',
    modelo: 'undefined',
    año: 'undefined',
    kms: 'undefined',
    color: 'undefined',
    aireAcondicionado: 'undefined',
    pasajeros: 'undefined',
    transmision: 'undefined',
  });

  expect(() => carRepository.getById(carMock).toThrowError(CarNotFoundError));
});

test('Buscar un auto por id devuelve el auto adecuado', () => {
  const carRepository = new CarRepository(mockDb);
  const carMock = new Car({
    marca: 'undefined',
    modelo: 'undefined',
    año: 'undefined',
    kms: 'undefined',
    color: 'undefined',
    aireAcondicionado: 'undefined',
    pasajeros: 'undefined',
    transmision: 'undefined',
  });

  const savedCar = carRepository.save(carMock);
  expect(carRepository.getById(1)).toEqual(savedCar);
});

test('Eliminar auto elimina un auto existente', () => {
  const carRepository = new CarRepository(mockDb);
  const carMock = new Car({
    marca: 'undefined',
    modelo: 'undefined',
    año: 'undefined',
    kms: 'undefined',
    color: 'undefined',
    aireAcondicionado: 'undefined',
    pasajeros: 'undefined',
    transmision: 'undefined',
  });
  const savedcar = carRepository.save(carMock);

  expect(carRepository.delete(savedcar)).toEqual(true);
  expect(() => {
    carRepository.getById(1);
  }).toThrowError(CarNotFoundError);
});

test('Eliminar auto sin un id da error', () => {
  const carRepository = new CarRepository(mockDb);
  expect(() => {
    carRepository.delete();
  }).toThrowError(CarIdNotFoundError);
});

test('Obtener todos los autos devuelve un array de entidad Auto', () => {
  const carRepository = new CarRepository(mockDb);
  const carMock1 = new Car({
    marca: 'undefined',
    modelo: 'undefined',
    año: 'undefined',
    kms: 'undefined',
    color: 'undefined',
    aireAcondicionado: 'undefined',
    pasajeros: 'undefined',
    transmision: 'undefined',
  });
  const savedCar1 = carRepository.save(carMock1);

  const carMock2 = new Car({
    marca: 'undefined',
    modelo: 'undefined',
    año: 'undefined',
    kms: 'undefined',
    color: 'undefined',
    aireAcondicionado: 'undefined',
    pasajeros: 'undefined',
    transmision: 'undefined',
  });
  const savedCar2 = carRepository.save(carMock2);

  expect(carRepository.getAll()).toEqual([savedCar1, savedCar2]);
});

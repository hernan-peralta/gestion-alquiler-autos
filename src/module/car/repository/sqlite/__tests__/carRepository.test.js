const Sequelize = require('sequelize');
const CarRepository = require('../carRepository');
const CarNotFoundError = require('../../error/carNotFoundError');
const CarIdNotFoundError = require('../../error/carIdNotDefinedError');
const Car = require('../../../entity/car');
const CarModel = require('../../../model/carModel');

let mockDb;

beforeEach(async () => {
  const sequelizeInstance = new Sequelize({ dialect: 'sqlite', storage: ':memory:' });
  mockDb = CarModel.setup(sequelizeInstance);
  await sequelizeInstance.sync();
});

test('Guardar un auto nuevo genera un id', async () => {
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

  const savedCar = await carRepository.save(carMock);
  expect(savedCar.id).toEqual(1);
});

test('Guardar un auto existente actualiza los valores', async () => {
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

  let savedCar = await carRepository.save(carMock);
  expect(savedCar.id).toEqual(1);

  savedCar.marca = 'nueva_marca';

  savedCar = await carRepository.save(savedCar);
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

test('Eliminar auto elimina un auto existente', async () => {
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
  const savedcar = await carRepository.save(carMock);

  expect(await carRepository.delete(savedcar)).toEqual(true);
  await expect(carRepository.getById(1)).rejects.toThrow(CarNotFoundError);
});

test('Eliminar auto sin un id da error', async () => {
  const carRepository = new CarRepository(mockDb);
  await expect(carRepository.delete()).rejects.toThrowError(CarIdNotFoundError);
});

test('Obtener todos los autos devuelve un array de entidad Auto', async () => {
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

  await carRepository.save(carMock1);
  await carRepository.save(carMock2);

  expect(await carRepository.getAll()).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        marca: 'undefined',
        modelo: 'undefined',
        año: 'undefined',
        kms: 'undefined',
        color: 'undefined',
        aireAcondicionado: 'undefined',
        pasajeros: 'undefined',
        transmision: 'undefined',
      }),
    ]),
  );
});

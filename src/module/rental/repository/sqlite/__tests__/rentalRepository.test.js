const Sequelize = require('sequelize');
const RentalRepository = require('../rentalRepository');
const RentalNotFoundError = require('../../error/rentalNotFoundError');
const RentalIdNotDefinedError = require('../../error/rentalIdNotDefinedError');
const Rental = require('../../../entity/rental');
const RentalModel = require('../../../model/rentalModel');
const CarModel = require('../../../../car/model/carModel');
const CustomerModel = require('../../../../customer/model/customerModel');
const Car = require('../../../../car/entity/car');
const Customer = require('../../../../customer/entity/customer');
const { CustomerRepository } = require('../../../../customer/module');
const { CarRepository } = require('../../../../car/module');

let mockDb;
let mockCarDb;
let mockCustomerDb;

function createCar() {
  return new Car({
    marca: 'undefined',
    modelo: 'undefined',
    año: 'undefined',
    kms: 'undefined',
    color: 'undefined',
    aireAcondicionado: 'undefined',
    pasajeros: 'undefined',
    transmision: 'undefined',
  });
}

function createCustomer() {
  return new Customer({
    nombres: 'undefined',
    apellido: 'undefined',
    tipoDocumento: 'undefined',
    numeroDocumento: 'undefined',
    nacionalidad: 'undefined',
    direccion: 'undefined',
    telefono: 'undefined',
    email: 'undefined',
    fechaNacimiento: 'undefined',
  });
}

function createRentalMock() {
  return new Rental({
    auto: '1',
    cliente: '1',
    precioUnitario: 'undefined',
    fechaDesde: 'undefined',
    fechaHasta: 'undefined',
    precioTotal: 'undefined',
    medioPago: 'undefined',
    pago: 'undefined',
  });
}

beforeEach(async () => {
  const sequelizeInstance = new Sequelize({ dialect: 'sqlite', storage: ':memory:' });
  mockDb = RentalModel.setup(sequelizeInstance);

  mockCarDb = CarModel.setup(sequelizeInstance);
  mockCustomerDb = CustomerModel.setup(sequelizeInstance);

  const carRepository = new CarRepository(mockCarDb);
  const customerRepository = new CustomerRepository(mockCustomerDb);

  const carMock = createCar();
  const customerMock = createCustomer();

  await sequelizeInstance.sync();

  await carRepository.save(carMock);
  await customerRepository.save(customerMock);
  RentalModel.setupAssociations(mockCarDb, mockCustomerDb);
});

test('Guardar un alquiler nuevo genera un id', async () => {
  const rentalRepository = new RentalRepository(mockDb);
  const rentalMock = createRentalMock();

  const savedRental = await rentalRepository.save(rentalMock);
  expect(savedRental.id).toEqual(1);
});

test('Guardar un alquiler existente actualiza los valores', async () => {
  const rentalRepository = new RentalRepository(mockDb);
  const rentalMock = createRentalMock();

  let savedRental = await rentalRepository.save(rentalMock);
  expect(savedRental.id).toEqual(1);

  savedRental.precioTotal = '1000';
  savedRental = await rentalRepository.save(savedRental);

  expect(savedRental.id).toEqual(1);
  expect(savedRental.precioTotal).toEqual('1000');
});

test('Guardar un alquiler con id que no existe da error', () => {
  const rentalRepository = new RentalRepository(mockDb);
  const rentalMock = createRentalMock();

  expect(() => rentalRepository.save(rentalMock).toThrowError(RentalNotFoundError));
});

test('Buscar un alquiler por id devuelve el cliente adecuado', () => {
  const rentalRepository = new RentalRepository(mockDb);
  const rentalMock = createRentalMock();

  const savedRental = rentalRepository.save(rentalMock);
  expect(rentalRepository.getById(1)).toEqual(savedRental);
});

test('Eliminar alquiler elimina un alquiler existente', async () => {
  const rentalRepository = new RentalRepository(mockDb);

  const rentalMock = createRentalMock();

  const savedRental = await rentalRepository.save(rentalMock);

  expect(await rentalRepository.delete(savedRental)).toEqual(true);
  await expect(rentalRepository.getById(1)).rejects.toThrow(RentalNotFoundError);
});

test('Eliminar alquiler sin un id da error', async () => {
  const rentalRepository = new RentalRepository(mockDb);
  await expect(rentalRepository.delete()).rejects.toThrowError(RentalIdNotDefinedError);
});

test('Obtener todos los alquileres devuelve un array de entidad Rental', async () => {
  const rentalRepository = new RentalRepository(mockDb);

  const carRepository = new CarRepository(mockCarDb);
  const customerRepository = new CustomerRepository(mockCustomerDb);

  const carMock = createCar();
  const customerMock = createCustomer();

  await carRepository.save(carMock);
  await customerRepository.save(customerMock);

  const rentalMock1 = createRentalMock();
  const rentalMock2 = new Rental({
    auto: '2',
    cliente: '2',
    precioUnitario: 'undefined',
    fechaDesde: 'undefined',
    fechaHasta: 'undefined',
    precioTotal: 'undefined',
    medioPago: 'undefined',
    pago: 'undefined',
  });

  await rentalRepository.save(rentalMock1);
  await rentalRepository.save(rentalMock2);

  expect(await rentalRepository.getAll()).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        precioUnitario: 'undefined',
        precioTotal: 'undefined',
        medioPago: 'undefined',
        pago: 'undefined',
      }),
    ]),
  );
});

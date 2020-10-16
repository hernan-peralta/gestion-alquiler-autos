const Sequelize = require('sequelize');
const CustomerRepository = require('../customerRepository');
const CustomerNotFoundError = require('../../error/customerNotFoundError');
const CustomerIdNotFoundError = require('../../error/customerIdNotDefinedError');
const Customer = require('../../../entity/customer');
const CustomerModel = require('../../../model/customerModel');

let mockDb;

function createCustomerMock() {
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

beforeEach(async () => {
  const sequelizeInstance = new Sequelize({ dialect: 'sqlite', storage: ':memory:' });
  mockDb = CustomerModel.setup(sequelizeInstance);
  await sequelizeInstance.sync();
});

test('Guardar un cliente nuevo genera un id', async () => {
  const customerRepository = new CustomerRepository(mockDb);
  const customerMock = createCustomerMock();

  const savedCustomer = await customerRepository.save(customerMock);
  expect(savedCustomer.id).toEqual(1);
});

test('Guardar un cliente existente actualiza los valores', async () => {
  const customerRepository = new CustomerRepository(mockDb);
  const customerMock = createCustomerMock();

  let savedCustomer = await customerRepository.save(customerMock);
  expect(savedCustomer.id).toEqual(1);

  savedCustomer.nombres = 'nuevo_nombre';
  savedCustomer = await customerRepository.save(savedCustomer);
  expect(savedCustomer.id).toEqual(1);
  expect(savedCustomer.nombres).toEqual('nuevo_nombre');
});

test('Guardar un cliente con id que no existe da error', () => {
  const customerRepository = new CustomerRepository(mockDb);
  const customerMock = new Customer({
    id: 99,
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

  expect(() => customerRepository.save(customerMock).toThrowError(CustomerNotFoundError));
});

test('Buscar un cliente con id que no existe da error', () => {
  const customerRepository = new CustomerRepository(mockDb);
  const customerMock = new Customer({
    id: 99,
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

  expect(() => customerRepository.getById(customerMock).toThrowError(CustomerNotFoundError));
});

test('Buscar un cliente por id devuelve el cliente adecuado', () => {
  const customerRepository = new CustomerRepository(mockDb);
  const customerMock = createCustomerMock();

  const savedCustomer = customerRepository.save(customerMock);
  expect(customerRepository.getById(1)).toEqual(savedCustomer);
});

test('Eliminar cliente elimina un cliente existente', async () => {
  const customerRepository = new CustomerRepository(mockDb);
  const customerMock = createCustomerMock();
  const savedcustomer = await customerRepository.save(customerMock);

  expect(await customerRepository.delete(savedcustomer)).toEqual(true);
  await expect(customerRepository.getById(1)).rejects.toThrow(CustomerNotFoundError);
});

test('Eliminar cliente sin un id da error', async () => {
  const customerRepository = new CustomerRepository(mockDb);
  await expect(customerRepository.delete()).rejects.toThrowError(CustomerIdNotFoundError);
});

test('Obtener todos los clientes devuelve un array de entidad Customer', async () => {
  const customerRepository = new CustomerRepository(mockDb);
  const customerMock1 = createCustomerMock();
  const customerMock2 = createCustomerMock();

  await customerRepository.save(customerMock1);
  await customerRepository.save(customerMock2);

  const arrayCustomers = await customerRepository.getAll();
  expect(Array.isArray(arrayCustomers)).toBe(true);
  expect(arrayCustomers.length).toEqual(2);
  expect(arrayCustomers.every((cliente) => cliente instanceof Customer)).toBe(true);
});

const CarController = require('../carController');
const Car = require('../../entity/car');
const CarIdNotDefinedError = require('../error/carIdNotDefinedError');

const serviceMock = {
  save: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
  getById: jest.fn(() => Promise.resolve({})),
  getAll: jest.fn(() => Promise.resolve([])),
};

const controller = new CarController(serviceMock);

test('Index renderea index.html', async () => {
  const resRenderMock = jest.fn();

  await controller.index({ session: { errors: [], messages: [] } }, { render: resRenderMock });

  expect(resRenderMock).toHaveBeenCalledTimes(1);
  expect(resRenderMock).toBeCalledWith('car/view/index.html', { data: { cars: [] }, messages: [], errors: [] });
});

test('Create renderiza form.html', async () => {
  const resRenderMock = jest.fn();
  await controller.new({}, { render: resRenderMock });

  expect(resRenderMock).toHaveBeenCalledTimes(1);
  expect(resRenderMock).toHaveBeenCalledWith('car/view/form.html');
});

test('Save edita un auto cuando hay un id presente', async () => {
  const redirectMock = jest.fn();
  const carMock = new Car({
    id: 1,
    marca: undefined,
    modelo: undefined,
    año: undefined,
    kms: undefined,
    color: undefined,
    aireAcondicionado: undefined,
    pasajeros: undefined,
    transmision: undefined,
  });

  const reqMock = { body: carMock, session: {} };

  await controller.save(
    reqMock,
    { redirect: redirectMock },
  );

  expect(serviceMock.save).toHaveBeenCalledTimes(1);
  expect(serviceMock.save).toHaveBeenCalledWith(carMock);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/cars');
});

test('Save crea un auto cuando no hay id', async () => {
  serviceMock.save.mockReset();
  const redirectMock = jest.fn();
  const carMock = new Car({
    id: 1,
    marca: undefined,
    modelo: undefined,
    año: undefined,
    kms: undefined,
    color: undefined,
    aireAcondicionado: undefined,
    pasajeros: undefined,
    transmision: undefined,
  });

  const reqMock = { body: carMock, session: {} };

  await controller.save(
    reqMock,
    { redirect: redirectMock },
  );

  expect(serviceMock.save).toHaveBeenCalledTimes(1);
  expect(serviceMock.save).toHaveBeenCalledWith(carMock);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/cars');
});

test('Delete llama al servicio con el id del body y redirecciona a /cars', async () => {
  const redirectMock = jest.fn();
  const reqMock = { params: { id: 1 }, session: {} };
  const FAKE_CAR = new Car({ id: 1 });

  serviceMock.getById.mockImplementationOnce(() => Promise.resolve(FAKE_CAR));

  await controller.delete(reqMock, { redirect: redirectMock });

  expect(serviceMock.delete).toHaveBeenCalledTimes(1);
  expect(serviceMock.delete).toHaveBeenCalledWith(FAKE_CAR);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/cars');
});

test('View sin id da un error', () => {
  expect(controller.view({ params: {} })).rejects.toThrowError(CarIdNotDefinedError);
});

test('View obtiene el id del auto y lo renderea', async () => {
  serviceMock.getById.mockReset();
  serviceMock.getById.mockImplementationOnce(() => { return {} });
  const resRenderMock = jest.fn();
  const reqMock = { params: { id: 1 } };

  await controller.view(reqMock, { render: resRenderMock });

  expect(serviceMock.getById).toBeCalledTimes(1);
  expect(serviceMock.getById).toHaveBeenCalledWith(1);
  expect(resRenderMock).toBeCalledTimes(1);
  expect(resRenderMock).toHaveBeenCalledWith('car/view/form.html', { data: { car: {} } });
});

test('View, cuando hay alguna excepción, setea errores en la sesión y redirecciona a /cars', async () => {
  const redirectMock = jest.fn();
  const reqMock = { params: { id: 999 }, session: {} };
  serviceMock.getById.mockImplementationOnce(() => { throw Error('Hola'); });

  await controller.view(reqMock, { redirect: redirectMock });

  expect(reqMock.session.errors).not.toEqual([]);
  expect(redirectMock).toBeCalledTimes(1);
  expect(redirectMock).toBeCalledWith('/cars');
});

test('Save, cuando hay alguna excepción, setea errores en la sesión y redirecciona a cars', async () => {
  const redirectMock = jest.fn();
  const reqMock = { params: { id: 999 }, session: {} };
  serviceMock.getById.mockImplementationOnce(() => { throw Error('Hola'); });

  await controller.save(reqMock, { redirect: redirectMock });

  expect(reqMock.session.errors).not.toEqual([]);
  expect(redirectMock).toBeCalledTimes(1);
  expect(redirectMock).toBeCalledWith('/cars');
});

test('Delete, cuando hay alguna excepción, setea errores en la sesión y redirecciona a cars', async () => {
  const redirectMock = jest.fn();
  const reqMock = { params: { id: 999 }, session: {} };
  serviceMock.getById.mockImplementationOnce(() => { throw Error('Hola'); });

  await controller.delete(reqMock, { redirect: redirectMock });

  expect(reqMock.session.errors).not.toEqual([]);
  expect(redirectMock).toBeCalledTimes(1);
  expect(redirectMock).toBeCalledWith('/cars');
});

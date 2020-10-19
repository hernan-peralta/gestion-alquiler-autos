const RentalController = require('../rentalController');
const Rental = require('../../entity/rental');
const RentalIdNotDefinedError = require('../error/rentalIdNotDefinedError');

const serviceMock = {
  save: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
  getById: jest.fn(() => Promise.resolve({})),
  getAll: jest.fn(() => Promise.resolve([])),
};

const controller = new RentalController(serviceMock);

test('configureRoutes configura las rutas', () => {
  const app = {
    get: jest.fn(),
    post: jest.fn(),
  };

  controller.configureRoutes(app);

  expect(app.get).toHaveBeenCalledWith('/rentals', expect.any(Function));
  expect(app.get).toHaveBeenCalledWith('/rentals/new', expect.any(Function));
  expect(app.get).toHaveBeenCalledWith('/rentals/view/:id', expect.any(Function));
  expect(app.post).toHaveBeenCalledWith('/rentals/save', expect.any(Function));
  expect(app.get).toHaveBeenCalledWith('/rentals/delete/:id', expect.any(Function));

  expect(app.get.mock.calls[0][1].name).toBe('bound index');
  expect(app.get.mock.calls[1][1].name).toBe('bound new');
  expect(app.post.mock.calls[0][1].name).toBe('bound save');
  expect(app.get.mock.calls[2][1].name).toBe('bound view');
  expect(app.get.mock.calls[3][1].name).toBe('bound delete');
});

test('Index renderea index.html', async () => {
  const resRenderMock = jest.fn();

  await controller.index({ session: { errors: [], messages: [] } }, { render: resRenderMock });

  expect(resRenderMock).toHaveBeenCalledTimes(1);
  expect(resRenderMock).toBeCalledWith('rental/view/index.html', { data: { rentals: [] }, messages: [], errors: [] });
});

test('Create renderiza form.html', async () => {
  const resRenderMock = jest.fn();
  await controller.new({}, { render: resRenderMock });

  expect(resRenderMock).toHaveBeenCalledTimes(1);
  expect(resRenderMock).toHaveBeenCalledWith('rental/view/form.html');
});

test('Save edita un auto cuando hay un id presente', async () => {
  const redirectMock = jest.fn();
  const rentalMock = new Rental({
    id: 1,
    auto: undefined,
    cliente: undefined,
    precioUnitario: undefined,
    fechaDesde: undefined,
    fechaHasta: undefined,
    precioTotal: undefined,
    medioPago: undefined,
    pago: undefined,
  });

  const reqMock = { body: rentalMock, session: {} };

  await controller.save(
    reqMock,
    { redirect: redirectMock },
  );

  expect(serviceMock.save).toHaveBeenCalledTimes(1);
  expect(serviceMock.save).toHaveBeenCalledWith(rentalMock);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/rentals');
});

test('Save crea un auto cuando no hay id', async () => {
  serviceMock.save.mockReset();
  serviceMock.save.mockImplementationOnce(() => new Rental({
    id: 1,
    auto: undefined,
    cliente: undefined,
    precioUnitario: undefined,
    fechaDesde: undefined,
    fechaHasta: undefined,
    precioTotal: undefined,
    medioPago: undefined,
    pago: undefined,
  }));

  const redirectMock = jest.fn();
  const rentalMock = new Rental({
    auto: undefined,
    cliente: undefined,
    precioUnitario: undefined,
    fechaDesde: undefined,
    fechaHasta: undefined,
    precioTotal: undefined,
    medioPago: undefined,
    pago: undefined,
  });

  const reqMock = { body: rentalMock, session: {} };

  await controller.save(
    reqMock,
    { redirect: redirectMock },
  );

  expect(serviceMock.save).toHaveBeenCalledTimes(1);
  expect(serviceMock.save).toHaveBeenCalledWith(rentalMock);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/rentals');
});

test('Delete llama al servicio con el id del body y redirecciona a /rentals', async () => {
  const redirectMock = jest.fn();
  const reqMock = { params: { id: 1 }, session: {} };
  const FAKE_CAR = new Rental({ id: 1 });

  serviceMock.getById.mockImplementationOnce(() => Promise.resolve(FAKE_CAR));

  await controller.delete(reqMock, { redirect: redirectMock });

  expect(serviceMock.delete).toHaveBeenCalledTimes(1);
  expect(serviceMock.delete).toHaveBeenCalledWith(FAKE_CAR);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/rentals');
});

test('View sin id da un error', () => {
  expect(controller.view({ params: {} })).rejects.toThrowError(RentalIdNotDefinedError);
});

test('View obtiene el id del auto y lo renderea', async () => {
  serviceMock.getById.mockReset();
  serviceMock.getById.mockImplementationOnce(() => ({}));
  const resRenderMock = jest.fn();
  const reqMock = { params: { id: 1 } };

  await controller.view(reqMock, { render: resRenderMock });

  expect(serviceMock.getById).toBeCalledTimes(1);
  expect(serviceMock.getById).toHaveBeenCalledWith(1);
  expect(resRenderMock).toBeCalledTimes(1);
  expect(resRenderMock).toHaveBeenCalledWith('rental/view/form.html', { data: { rental: {} } });
});

test('View, cuando hay alguna excepción, setea errores en la sesión y redirecciona a /rentals', async () => {
  const redirectMock = jest.fn();
  const reqMock = { params: { id: 999 }, session: {} };
  serviceMock.getById.mockImplementationOnce(() => { throw Error('Hola'); });

  await controller.view(reqMock, { redirect: redirectMock });

  expect(reqMock.session.errors).not.toEqual([]);
  expect(redirectMock).toBeCalledTimes(1);
  expect(redirectMock).toBeCalledWith('/rentals');
});

test('Save, cuando hay alguna excepción, setea errores en la sesión y redirecciona a rentals', async () => {
  const redirectMock = jest.fn();
  const reqMock = { params: { id: 999 }, session: {} };
  serviceMock.getById.mockImplementationOnce(() => { throw Error('Hola'); });

  await controller.save(reqMock, { redirect: redirectMock });

  expect(reqMock.session.errors).not.toEqual([]);
  expect(redirectMock).toBeCalledTimes(1);
  expect(redirectMock).toBeCalledWith('/rentals');
});

test('Delete, cuando hay alguna excepción, setea errores en la sesión y redirecciona a rentals', async () => {
  const redirectMock = jest.fn();
  const reqMock = { params: { id: 999 }, session: {} };
  serviceMock.getById.mockImplementationOnce(() => { throw Error('Hola'); });

  await controller.delete(reqMock, { redirect: redirectMock });

  expect(reqMock.session.errors).not.toEqual([]);
  expect(redirectMock).toBeCalledTimes(1);
  expect(redirectMock).toBeCalledWith('/rentals');
});

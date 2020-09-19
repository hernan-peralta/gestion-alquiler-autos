const { fromDataToEntity } = require('../mapper/carMapper');
const CarIdNotDefinedError = require('./error/carIdNotDefinedError');

module.exports = class CarController {
/**
 * @param {import('../service/carService')} carService
 */

  constructor(carService) {
    this.ROUTE_BASE = '/cars';
    this.carService = carService;
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;

    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/new`, this.new.bind(this));
    app.get(`${ROUTE}/view/:id`, this.view.bind(this));
    app.post(`${ROUTE}/save`, this.save.bind(this));
    app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    const cars = await this.carService.getAll();
    const { errors, messages } = req.session;
    res.render('car/view/index.html', { data: { cars }, messages, errors });
    req.session.errors = [];
    req.session.messages = [];
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async new(req, res) {
    res.render('car/view/form.html');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async view(req, res) {
    const { id } = req.params;
    if (!id) {
      throw new CarIdNotDefinedError();
    }
    try {
      const car = await this.carService.getById(id);
      res.render('car/view/form.html', { data: { car } });
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/cars');
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async save(req, res) {
    try {
      const car = fromDataToEntity(req.body);
      const savedCar = await this.carService.save(car);

      if (car.id) {
        req.session.messages = [`El vehículo con id ${savedCar.id} se actualizó exitosamente`];
      } else {
        req.session.messages = [`Se agregó el vehículo con id ${savedCar.id} exitosamente`];
      }
      res.redirect('/');
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/cars');
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      const car = await this.carService.getById(id);
      await this.carService.delete(car);
      req.session.messages = [`Se eliminó correctamente el vehículo con id ${id}`];
    } catch (e) {
      req.session.errors = [e.message, e.stack];
    }
    res.redirect('/cars');
  }
};

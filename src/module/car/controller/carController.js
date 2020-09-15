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
    res.render('car/view/index.html', { data: { cars } });
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

    const car = await this.carService.getById(id);
    res.render('car/view/form.html', { data: { car } });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async save(req, res) {
    const car = fromDataToEntity(req.body);
    console.log("car en cotroller.save es", car)
    await this.carService.save(car);

    res.redirect('/cars');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async delete(req, res) {
    const { id } = req.params;
    const car = await this.carService.getById(id);
    await this.carService.delete(car);

    res.redirect('/cars');
  }
};

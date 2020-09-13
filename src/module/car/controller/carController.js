module.exports = class CarController {
/**
 * @param {carService} carService
 */

  constructor(carService) {
    this.ROUTE_BASE = '/cars';
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;

    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/new`, this.new.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    res.send("index page")
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async new(req, res) {
    res.send('form page')
  }
};

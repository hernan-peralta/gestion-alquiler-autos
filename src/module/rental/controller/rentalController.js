const AbstractController = require('../../abstractController');
const { fromDataToEntity } = require('../mapper/rentalMapper');
const RentalIdNotDefinedError = require('./error/rentalIdNotDefinedError');

module.exports = class RentalController extends AbstractController {
  /**
   * @param {import('../service/rentalService')} rentalService
  */

  constructor(rentalService) {
    super();
    this.ROUTE_BASE = '/rentals';
    this.rentalService = rentalService;
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
    const rentals = await this.rentalService.getAll();
    const { errors, messages } = req.session;
    res.render('rental/view/index.html', { data: { rentals }, messages, errors });
    req.session.errors = [];
    req.session.messages = [];
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async new(req, res) {
    res.render('rental/view/form.html');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async view(req, res) {
    const { id } = req.params;
    if (!id) {
      throw new RentalIdNotDefinedError();
    }
    try {
      const rental = await this.rentalService.getById(id);
      res.render('rental/view/form.html', { data: { rental } });
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/rentals');
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async save(req, res) {
    try {
      const rental = fromDataToEntity(req.body);
      const savedRental = await this.rentalService.save(rental);

      if (rental.id) {
        req.session.messages = [`El alquiler con id ${savedRental.id} se actualizó exitosamente`];
      } else {
        req.session.messages = [`Se agregó el alquiler con id ${savedRental.id} exitosamente`];
      }
      res.redirect('/rentals');
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/rentals');
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async delete(req, res) {
    try {
      const { id } = req.params;
      const rental = await this.rentalService.getById(id);
      await this.rentalService.delete(rental);
      req.session.messages = [`Se eliminó correctamente el alquiler con id ${id}`];
    } catch (e) {
      req.session.errors = [e.message, e.stack];
    }
    res.redirect('/rentals');
  }
};

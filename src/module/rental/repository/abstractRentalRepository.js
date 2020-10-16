/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

const AbstractRentalRepositoryError = require('./error/abstractRentalRepositoryError');
const MethodNotImplementedError = require('./error/methodNotImplementedError');

module.exports = class AbstractRentalRepository {
  constructor() {
    if (new.target === AbstractRentalRepository) {
      throw new AbstractRentalRepositoryError(
        'No se puede instanciar el repositorio de alquileres abstracto.',
      );
    }
  }

  /**
   * @param {import('../entity/rental')} Rental
   * @returns {import('../entity/rental')}
   */
  async save(rental) {
    throw new MethodNotImplementedError();
  }

  /**
   * @param {Number} id
   */
  async delete(rental) {
    throw new MethodNotImplementedError();
  }

  /**
   * @param {Number} id
   */
  async getById(id) {
    throw new MethodNotImplementedError();
  }

  /**
   * @returns {Array<import('../entity/rental')>}
   */
  async getAll() {
    throw new MethodNotImplementedError();
  }
};
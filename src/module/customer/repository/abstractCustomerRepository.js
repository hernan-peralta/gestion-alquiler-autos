/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

const AbstractCustomerRepositoryError = require('./error/abstractCustomerRepositoryError');
const MethodNotImplementedError = require('./error/methodNotImplementedError');

module.exports = class AbstractCustomerRepository {
  constructor() {
    if (new.target === AbstractCustomerRepository) {
      throw new AbstractCustomerRepositoryError(
        'No se puede instanciar el repositorio de autos abstracto.',
      );
    }
  }

  /**
   * @param {import('../entity/customer')} Customer
   * @returns {import('../entity/customer')}
   */
  async save(customer) {
    throw new MethodNotImplementedError();
  }

  /**
   * @param {Number} id
   */
  async delete(customer) {
    throw new MethodNotImplementedError();
  }

  /**
   * @param {Number} id
   */
  async getById(id) {
    throw new MethodNotImplementedError();
  }

  /**
   * @returns {Array<import('../entity/customer')>}
   */
  async getAll() {
    throw new MethodNotImplementedError();
  }
};

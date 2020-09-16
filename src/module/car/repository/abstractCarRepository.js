const AbstractCarRepositoryError = require('./error/abstractCarRepositoryError');
const MethodNotImplementedError = require('./error/methodNotImplementedError');

module.exports = class AbstractCarRepository{
  constructor() {
    if (new.target === AbstractCarRepository) {
      throw new AbstractCarRepositoryError(
        'No se puede instanciar el repositorio de autos abstracto.'
      );
    }
  }

  /**
   * @param {import('../entity/car')} Car
   * @returns {import('../entity/car')}
   */
  async save(car) {
    throw new MethodNotImplementedError();
  }

  /**
   * @param {Number} id
   */
  async delete(car) {
    throw new MethodNotImplementedError();
  }

  /**
   * @param {Number} id
   */
  async getById(id) {
    throw new MethodNotImplementedError();
  }

  /**
   * @returns {Array<import('../entity/car')>}
   */
  async getAll() {
    throw new MethodNotImplementedError();
  }
};

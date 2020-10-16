const AbstractRentalRepository = require('../abstractRentalRepository');
const RentalIdNotDefinedError = require('../error/rentalIdNotDefinedError');
const RentalNotFoundError = require('../error/rentalNotFoundError');
const { fromModelToEntity } = require('../../mapper/rentalMapper');

module.exports = class RentalRepository extends AbstractRentalRepository {
  /**
   * @param {import('../../model/rentalModel')} rentalModel
   * @param {import('../../../car/model/carModel')} carModel
   * @param {import('../../../customer/model/customerModel')} customerModel
   */
  constructor(rentalModel, carModel, customerModel) {
    super();
    this.rentalModel = rentalModel;
    this.carModel = carModel;
    this.customerModel = customerModel;
  }

  /**
   * @param {import('../../entity/rental')} rental
   * @returns {import('../../entity/rental')}
   */
  async save(rental) {
    const buildOptions = { isNewRecord: !rental.id };
    const rentalBuilt = this.rentalModel.build(rental, buildOptions);

    const rentalSaved = await rentalBuilt.save();
    return fromModelToEntity(rentalSaved);
  }

  /**
   * @param {import('../../entity/rental')} rental
   * @returns {Boolean}
   */
  async delete(rental) {
    if (!rental || !rental.id) {
      throw new RentalIdNotDefinedError('El ID del alquiler no está definido');
    }

    return Boolean(this.rentalModel.destroy({ where: { id: rental.id } }));
  }

  /**
   * @param {Number} id
   * @returns {import('../../entity/rental')}
   */
  async getById(id) {
    const rental = await this.rentalModel.findByPk(id);
    if (rental === null) {
      throw new RentalNotFoundError(`No se encontró el alquiler con id ${id}`);
    }

    return fromModelToEntity(rental);
  }

  /**
   * @returns {Array<import('../../entity/rental')>}
   */

  async getAll() {
    const rentals = await this.rentalModel.findAll();
    return rentals.map((rental) => fromModelToEntity(rental));
  }
};

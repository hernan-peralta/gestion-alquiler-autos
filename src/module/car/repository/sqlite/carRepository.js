const AbstractCarRepository = require('../abstractCarRepository');
const CarIdNotDefinedError = require('../error/carIdNotDefinedError');
const CarNotFoundError = require('../error/carNotFoundError');
const { fromDbToEntity } = require('../../mapper/carMapper');

module.exports = class CarRepository extends AbstractCarRepository {
  /**
   * @param {import('../../model/carModel')} carModel
   */
  constructor(carModel) {
    super();
    this.carModel = carModel;
  }

  /**
   * @param {import('../../entity/car')} car
   * @returns {import('../../entity/car')}
   */
  async save(car) {
    const buildOptions = { isNewRecord: !car.id };
    let auto = await this.carModel.build(car, buildOptions);
    auto = await auto.save();
    return fromDbToEntity(auto);
  }

  /**
   * @param {import('../../entity/car')} car
   * @returns {Boolean}
   */
  async delete(car) {
    if (!car || !car.id) {
      throw new CarIdNotDefinedError('El ID del auto no está definido');
    }

    return Boolean(await this.carModel.destroy({ where: { id: car.id } }));
  }

  /**
   * @param {Number} id
   * @returns {import('../../entity/car')}
   */
  async getById(id) {
    const car = await this.carModel.findByPk(id);

    if (!car) {
      throw new CarNotFoundError(`No se encontró el auto con id ${id}`);
    }

    return fromDbToEntity(car);
  }

  /**
   * @returns {Array<import('../../entity/car')>}
   */

  async getAll() {
    const cars = await this.carModel.findAll();
    return cars.map((car) => fromDbToEntity(car));
  }
};

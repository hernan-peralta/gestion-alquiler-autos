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
   * @returns {Boolean} //true si borró algo, false si no borró nada
   */
  async delete(car) {
    if (!car || !car.id) {
      throw new CarIdNotDefinedError('El ID del auto no está definido');
    }

    const auto = await this.carModel.findByPk(car.id);
    auto.destroy();
    return true;
  }

  /**
   * @param {Number} id
   * @returns {import('../../entity/car')}
   */
  async getById(id) {
    const car = await this.carModel.findByPk(id);

    if (car === undefined) {
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

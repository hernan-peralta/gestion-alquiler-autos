const CarIdNotDefinedError = require('../error/carIdNotDefinedError');
const CarNotFoundError = require('../error/carNotFoundError');
const { fromDbToEntity } = require('../../mapper/carMapper');

module.exports = class CarRepository {
  /**
   * @param {import('better-sqlite3').Database} databaseAdapter
   */
  constructor(databaseAdapter) {
    this.databaseAdapter = databaseAdapter;
  }

  /**
   * @param {import('../../entity/car')} car
   * @returns {import('../../entity/car')}
   */
  save(car) {
    let id;
    if (car.id) {
      id = car.id;
      const statement = this.databaseAdapter.prepare(`
        UPDATE autos SET
          marca = ?,
          modelo = ?,
          año = ?,
          kms = ?,
          color = ?,
          aire_acondicionado = ?,
          pasajeros = ?,
          transmision = ?
        WHERE id = ?
      `);

      const params = [
        car.marca,
        car.modelo,
        car.año,
        car.kms,
        car.color,
        car.aireAcondicionado,
        car.pasajeros,
        car.transmision,
        car.id,
      ];

      statement.run(params);
    } else {
      const statement = this.databaseAdapter.prepare(`
        INSERT INTO autos(
          marca,
          modelo,
          año,
          kms,
          color,
          aire_acondicionado,
          pasajeros,
          transimision
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const result = statement.run(
        car.marca,
        car.modelo,
        car.año,
        car.kms,
        car.color,
        car.aireAcondicionado,
        car.pasajeros,
        car.transmision,
      );

      id = result.lastInsertRowid;
    }

    return this.getById(id);
  }

  /**
   * @param {import('../../entity/car')} car 
   * @returns {Boolean} //true si borró algo, false si no borró nada
   */
  delete(car){
    if (!car || !car.id) {
      throw new CarIdNotDefinedError('El ID del auto no está definido');
    }

    this.databaseAdapter.prepare('DELETE FROM autos WHERE id = ?').run(car.id);

    return true;
  }

  /**
   * @param {Number} id
   * @returns {import('../../entity/car')}
   */
  getById(id) {
    const car = this.databaseAdapter.prepare(`
      SELECT
        id,
        marca,
        modelo,
        año,
        kms,
        color,
        aire_acondicionado,
        pasajeros,
        transmision
        FROM autos WHERE id = ?
    `).get(id);

    if (car === undefined){
      throw new CarNotFoundError(`No se encontró el auto con id ${id}`);
    }

    return fromDbToEntity(car);
  }

  /**
   * @returns {Array<import('../../entity/car')>}
   */

  getAll() {
    const cars = this.databaseAdapter
      .prepare(`
        SELECT
          id,
          marca,
          modelo,
          año,
          kms,
          color,
          aire_acondicionado,
          pasajeros,
          transmision
        FROM autos`)
      .all();
    return cars.map((car) => fromDbToEntity(car));
  }
};

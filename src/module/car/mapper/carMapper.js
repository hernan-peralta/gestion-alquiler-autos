const Car = require('../entity/car');

/**
 * @param {Object} formData
 * @returns Car
 */
function fromDataToEntity({
  id,
  marca,
  modelo,
  año,
  kms,
  color,
  'aire-acondicionado': aireAcondicionado,
  pasajeros,
  transmision,
}) {
  return new Car({
    id,
    marca,
    modelo,
    año,
    kms,
    color,
    aireAcondicionado,
    pasajeros,
    transmision,
  });
}

/**
 * @param {Object} formData
 * @returns Car
 */
function fromDbToEntity({
  id,
  marca,
  modelo,
  año,
  kms,
  color,
  aireAcondicionado,
  pasajeros,
  transmision,
}) {
  return new Car({
    id,
    marca,
    modelo,
    año,
    kms,
    color,
    aireAcondicionado,
    pasajeros,
    transmision,
  });
}

module.exports = {
  fromDataToEntity,
  fromDbToEntity,
};

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
  precio,
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
    precio,
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
  precio,
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
    precio,
  });
}

module.exports = {
  fromDataToEntity,
  fromDbToEntity,
};

const Customer = require('../entity/customer');

/**
 * @param {Object} formData
 * @returns Customer
 */
function fromDataToEntity({
  id,
  nombres,
  apellido,
  'tipo-documento': tipoDocumento,
  'numero-documento': numeroDocumento,
  nacionalidad,
  direccion,
  telefono,
  email,
  'fecha-nacimiento': fechaNacimiento,
}) {
  return new Customer({
    id,
    nombres,
    apellido,
    tipoDocumento,
    numeroDocumento,
    nacionalidad,
    direccion,
    telefono,
    email,
    fechaNacimiento,
  });
}

/**
 * @param {Object} formData
 * @returns Customer
 */
function fromDbToEntity(model) {
  return new Customer(model.toJSON());
}

module.exports = {
  fromDataToEntity,
  fromDbToEntity,
};

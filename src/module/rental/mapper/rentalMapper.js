const Rental = require('../entity/rental');

/**
 * @param {Object} formData
 * @returns Rental
 */
function fromDataToEntity({
  id,
  auto,
  cliente,
  'precio-unitario': precioUnitario,
  'fecha-desde': fechaDesde,
  'fecha-hasta': fechaHasta,
  'precio-total': precioTotal,
  'medio-pago': medioPago,
  pago,
}) {
  return new Rental({
    id,
    auto,
    cliente,
    precioUnitario,
    fechaDesde,
    fechaHasta,
    precioTotal,
    medioPago,
    pago,
  });
}

function fromModelToEntity(rental) {
  return new Rental(rental.toJSON());
}

module.exports = {
  fromDataToEntity,
  fromModelToEntity,
};

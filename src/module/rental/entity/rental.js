module.exports = class Rental {
  constructor({
    id,
    auto,
    cliente,
    precioUnitario,
    fechaDesde,
    fechaHasta,
    precioTotal,
    medioPago,
    pago,
  }) {
    this.id = id;
    this.auto = auto;
    this.cliente = cliente;
    this.precioUnitario = precioUnitario;
    this.fechaDesde = fechaDesde;
    this.fechaHasta = fechaHasta;
    this.precioTotal = precioTotal;
    this.medioPago = medioPago;
    this.pago = pago;
  }
};

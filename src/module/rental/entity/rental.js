module.exports = class Rental {
  constructor({
    id,
    fkAuto,
    fkCliente,
    precioUnitario,
    fechaDesde,
    fechaHasta,
    precioTotal,
    medioPago,
    pago,
  }) {
    this.id = id;
    this.fkAuto = fkAuto;
    this.fkCliente = fkCliente;
    this.precioUnitario = precioUnitario;
    this.fechaDesde = fechaDesde;
    this.fechaHasta = fechaHasta;
    this.precioTotal = precioTotal;
    this.medioPago = medioPago;
    this.pago = pago;
  }
};

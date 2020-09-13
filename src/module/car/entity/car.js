module.exports = class Car {
  constructor({
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
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.año = año;
    this.kms = kms;
    this.color = color;
    this.aireAcondicionado = aireAcondicionado;
    this.pasajeros = pasajeros;
    this.transmision = transmision;
  }
};

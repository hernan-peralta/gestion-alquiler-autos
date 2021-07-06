const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = class RentalModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof RentalModel}
   */
  static setup(sequelizeInstance) {
    RentalModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        fkAuto: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'Autos',
            },
            key: 'id',
          },
        },
        fkCliente: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: {
              tableName: 'Clientes',
            },
            key: 'id',
          },
        },
        precioUnitario: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        fechaDesde: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        fechaHasta: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        precioTotal: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        medioPago: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        pago: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Rental',
        createdAt: 'creado_en',
        updatedAt: 'actualizado_en',
        tableName: 'Alquileres',
      },
    );
    return RentalModel;
  }

  /**
   * @param {import('../../car/model/carModel')} CarModel
   * @param {import('../../customer/model/customerModel')} CustomerModel
   */
  static setupAssociations(CarModel, CustomerModel) {
    RentalModel.belongsTo(CarModel, { as: 'AutoAlquilado', foreignKey: 'id' });
    RentalModel.belongsTo(CustomerModel, { as: 'ClienteAuto', foreignKey: 'id' });
  }
};

const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = class CarModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof CarModel}
   */
  static setup(sequelizeInstance) {
    CarModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        marca: {
          type: DataTypes.STRING,
        },
        modelo: {
          type: DataTypes.STRING,
        },
        año: {
          type: DataTypes.NUMBER,
        },
        kms: {
          type: DataTypes.NUMBER,
        },
        color: {
          type: DataTypes.STRING,
        },
        aireAcondicionado: {
          type: DataTypes.STRING,
        },
        pasajeros: {
          type: DataTypes.NUMBER,
        },
        transmision: {
          type: DataTypes.STRING,
        },
        precio: {
          type: DataTypes.NUMBER,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Auto',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    );
    return CarModel;
  }
};

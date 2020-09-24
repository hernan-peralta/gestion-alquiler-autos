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
          type: DataTypes.BOOLEAN,
        },
        pasajeros: {
          type: DataTypes.NUMBER,
        },
        transmision: {
          type: DataTypes.STRING,
        },
        createAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: CarModel,
        timestamps: false,
      },
    );
    return CarModel;
  }
};

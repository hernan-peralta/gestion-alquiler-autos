const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = class CustomerModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof CustomerModel}
   */
  static setup(sequelizeInstance) {
    CustomerModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        nombres: {
          type: DataTypes.STRING,
        },
        apellido: {
          type: DataTypes.STRING,
        },
        tipoDocumento: {
          type: DataTypes.STRING,
        },
        numeroDocumento: {
          type: DataTypes.NUMBER,
        },
        nacionalidad: {
          type: DataTypes.STRING,
        },
        direccion: {
          type: DataTypes.STRING,
        },
        telefono: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        fechaNacimiento: {
          type: DataTypes.DATE,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Cliente',
        createdAt: 'creado_en',
        updatedAt: 'actualizado_en',
      },
    );
    return CustomerModel;
  }
};

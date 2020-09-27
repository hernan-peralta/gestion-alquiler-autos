require('dotenv').config();
const configureDependencyInjection = require('../config/di');

const container = configureDependencyInjection();

/**
 * @type {import('sequelize').Sequelize} mainDb
 */
const mainDb = container.get('MainDatabaseAdapter');

container.get('CarModelInstance');

mainDb.sync();

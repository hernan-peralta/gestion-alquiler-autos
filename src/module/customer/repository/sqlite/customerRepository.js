const AbstractCustomerRepository = require('../abstractCustomerRepository');
const CustomerIdNotDefinedError = require('../error/customerIdNotDefinedError');
const CustomerNotFoundError = require('../error/customerNotFoundError');
const { fromDbToEntity } = require('../../mapper/customerMapper');

module.exports = class CustomerRepository extends AbstractCustomerRepository {
  /**
   * @param {import('../../model/customerModel')} customerModel
   */
  constructor(customerModel) {
    super();
    this.customerModel = customerModel;
  }

  /**
   * @param {import('../../entity/customer')} customer
   * @returns {import('../../entity/customer')}
   */
  async save(customer) {
    const buildOptions = { isNewRecord: !customer.id };
    let cliente = await this.customerModel.build(customer, buildOptions);
    cliente = await cliente.save();
    return fromDbToEntity(cliente);
  }

  /**
   * @param {import('../../entity/customer')} customer
   * @returns {Boolean}
   */
  async delete(customer) {
    if (!customer || !customer.id) {
      throw new CustomerIdNotDefinedError('El ID del cliente no está definido');
    }

    const cliente = await this.customerModel.findByPk(customer.id);
    cliente.destroy();
    return true;
  }

  /**
   * @param {Number} id
   * @returns {import('../../entity/customer')}
   */
  async getById(id) {
    const customer = await this.customerModel.findByPk(id);
    if (customer === null) {
      throw new CustomerNotFoundError(`No se encontró el cliente con id ${id}`);
    }

    return fromDbToEntity(customer);
  }

  /**
   * @returns {Array<import('../../entity/customer')>}
   */

  async getAll() {
    const customers = await this.customerModel.findAll();
    return customers.map((customer) => fromDbToEntity(customer));
  }
};

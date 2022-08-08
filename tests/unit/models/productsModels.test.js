const { expect } = require('chai');
const Sinon = require('sinon');

const connection = require('../../../connection/connect');
const Product = require('../../../models/Product');
const all = require('../../mocks/all');

describe('[PRODUCT: model]', () => {
  
  describe('[GET, "/products"]', () => {
    beforeEach(() => Sinon.stub(connection, 'execute').resolves([all, []]));
    
    afterEach(() => connection.execute.restore());

    it('é executada uma query, selecionando todas as colunas na tabela StoreManage.products', async () => {
      const query = 'SELECT * FROM StoreManager.products';
        
      await Product.all();
      
      expect(connection.execute.calledWith(query)).to.be.equal(true);
    });

    it('será retornado um array com dois arrays', async () => {
      const response = await Product.all();

      expect(response).to.be.an('array');

      response.forEach((product) => expect(product).to.be.an('array'));
    });

    it('o primeiro array do retorno possui vários objetos', async () => {
      const [products] = await Product.all();

      expect(products).to.be.an('array');
      
      products.forEach((product) => expect(product).to.be.an('object'))
    });
    
    it('cada objeto dentro do primeiro array possui as propriedades "id" e "name"', async () => {
      const [products] = await Product.all();
      
      products.forEach((product) => expect(product).to.have.keys('id', 'name'));
    });
  });
});


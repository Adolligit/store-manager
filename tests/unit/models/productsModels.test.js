const { expect } = require('chai');
const Sinon = require('sinon');

const connection = require('../../../connection/connect');
const Product = require('../../../models/Product');

describe.only('[PRODUCT: model]', () => {
  const payload = [
    {
      "id": 1,
      "name": "Martelo de Thor"
    },
    {
      "id": 2,
      "name": "Traje de encolhimento"
    },
    {
      "id": 3,
      "name": "Escudo do Capitão América"
    },
  ];

  beforeEach(() => Sinon.stub(connection, 'execute').resolves(payload));
  afterEach(() => connection.execute.restore());

  describe('[GET, "/products"]', () => {
    it('é executada uma query, selecionando todas as colunas na tabela StoreManage.products', async () => {
      const query = 'SELECT * FROM StoreManager.products';
        
      await Product.all();
      
      expect(connection.execute.calledWith(query)).to.be.equal(true);
    });

    it('será retornado um array com vários objetos', async () => {
      const products = await Product.all();

      expect(products).to.be.an('array');
      products.forEach((product) => expect(product).to.be.an('object'));
    });
    
    it('cada objeto dentro do array possui as propriedades "id" e "name"', async () => {
      const products = await Product.all();
      
      products.forEach((product) => expect(product).to.have.keys('id', 'name'));
    });
  });
});


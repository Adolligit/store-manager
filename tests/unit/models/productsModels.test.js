const { expect } = require('chai');
const Sinon = require('sinon');

const connection = require('../../../connection/connect');
const Product = require('../../../models/Product');

const { all, byId } = require('../../mocks/Products');

describe('[PRODUCT: model]', () => {

  afterEach(() => connection.execute.restore());
  
  describe('[GET, "/products"]', () => {
    beforeEach(() => Sinon.stub(connection, 'execute').resolves([all, []]));
    
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

  describe('[GET, "/products/:id"]', () => {
    describe('Independente do ID', () => {
      beforeEach(() =>
        Sinon.stub(connection, "execute").resolves([[], []])
      );
      
      it('uma query que selecionando os dados baseado no "id" será executada', async () => {
        const query = "SELECT * FROM StoreManager.products WHERE id=?";
        await Product.byId(3);

        expect(connection.execute.calledWith(query)).to.be.true;
      });

      it("um array com dois valores será retornado", async () => {
        const response = await Product.byId(3);

        expect(response).to.have.lengthOf(2);
      });
    });

    describe('ID existente', () => {
      beforeEach(() =>
        Sinon.stub(connection, "execute").resolves([byId, []])
      );

      it("o primeiro valor do retorno é um array com um objeto", async () => {
        const [product] = await Product.byId(3);

        expect(product[0]).to.be.an("object");
      });

      it("o objeto dentro do primeiro array é correspondente", async () => {
        const [product] = await Product.byId(3);

        expect(product).to.be.deep.equal(byId);
      });
    });

    describe('ID inexistente', () => {
      beforeEach(() => Sinon.stub(connection, 'execute').resolves([[], []]));

      it('o primeiro valor do retorno será um array vazio', async () => {
        const [product] = await Product.byId(3);

        expect(product).to.be.an('array');
        expect(product).to.be.empty;
      });
    })
  });

});


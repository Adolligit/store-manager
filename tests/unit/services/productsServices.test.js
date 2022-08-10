const { expect } = require("chai");
const Sinon = require("sinon");

const ProductService = require('../../../services/Product');
const ProductModel = require('../../../models/Product');
const ServiceErrorHandler = require("../../../Errors/ServiceErrorHandler");

const { all, byId } = require('../../mocks/Products');
const { notFound } = require('../../mocks/Errors');

describe('(PRODUCT: SERVICE)', () => {
  describe('[GET, "/products"]', () => {
    beforeEach(() => {
      Sinon.stub(ProductModel, 'all').resolves([all, []])
    });

    afterEach(() => ProductModel.all.restore());
    
    it('será retornado um array', async () => {
      const products = await ProductService.all();

      expect(products).to.be.an('array');
    });

    it('os valores retornados são correspondentes', async () => {
      const products = await ProductService.all();

      expect(products).to.be.deep.equal(all);
    });

    it('os objetos possuem duas propriedades', async () => {
      const products = await ProductService.all();

      products.forEach((product) => {
        expect(product).to.be.an('object');
        expect(Object.keys(product)).to.have.lengthOf(2);
      })
    });
  });

  describe('[GET, "/products/:id"]', () => {
    afterEach(() => Sinon.restore());

    describe('Produto encontrado:', () => {
      beforeEach(() => Sinon.stub(ProductModel, 'byId').resolves([byId, []]));

      it('o objeto retornado possui duas chaves', async () => {
        const product = await ProductService.byId(3);

        expect(Object.keys(product)).to.have.lengthOf(2);
      });

      it('as propriedades "id" e "name" estão presente no objeto', async () => {
        const product = await ProductService.byId(3);

        expect(product).to.has.all.keys('id', 'name');
        expect(product['id']).to.be.a('number');
      });
    });

    describe('Produto não encontrado:', () => {
      beforeEach(() => {
        Sinon.stub(ProductModel, "byId").resolves([[], []]);

        Sinon.stub(ServiceErrorHandler, 'arguments').returns({ "message": [notFound.message] });
      });
      
      it('um objeto é retornado com três chaves', async () => {
        const response = await ProductService.byId(3);

        expect(response).to.be.an('object');
        expect(Object.keys(response)).to.has.lengthOf(3);
      });

      it('"statusCode", "error" e "message" estão presente no objeto', async () => {
        const response = await ProductService.byId(3);

        expect(response).to.has.keys('statusCode', 'error', 'message');
      });
    
      it('a chave "message" possui a string "Product not found"', async () => {
        const { message } = await ProductService.byId(3);

        expect(message).to.be.a('string');
        expect(message).to.be.deep.equal(notFound.message);
      });
    });
    
  });
});



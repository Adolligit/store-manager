const { expect } = require("chai");
const Sinon = require("sinon");

const ProductService = require('../../../services/Product');
const ProductModel = require('../../../models/Product');

const all = require('../../mocks/all');

describe.only('[PRODUCT: service]', () => {
  
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
  })
})
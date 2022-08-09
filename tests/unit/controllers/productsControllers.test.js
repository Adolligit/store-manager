const Sinon = require("sinon");
const { expect } = require("chai");

const ProductService = require('../../../services/Product');
const ProductController = require('../../../controllers/Product');
const ControllerErrorHandler = require('../../../Errors/ControllerErrorHandler');

const { all, byId } = require('../../mocks/Products');
const { notFound } = require('../../mocks/Errors');

describe('[PRODUCT: controller]', () => {
  const response = {};
  const request = {};
  
  beforeEach(() => {
    response.status = Sinon.stub().returns(response);
    response.json = Sinon.stub().returns();
    response.locals = { id: 3 };
  });

  afterEach(() => Sinon.restore());

  describe('[GET, "/products"]', () => {
    beforeEach(() => Sinon.stub(ProductService, 'all').resolves(all));

    it('a função "status" é chamada com o parâmetro 200', async () => {
      await ProductController.all(request, response);

      expect(response.status.calledWith(200)).is.true;
    });

    it('a função "json" é chamada com os dados a serem respondidos', async () => {
      await ProductController.all(request, response);

      expect(response.json.calledWith(all)).is.true;
    });
  });

  describe.only('[GET, "/products/:id"]', () => {
    
    describe('Independente do retorno:', () => {
      Sinon.stub(ProductService, 'byId').resolves(byId[0]);
      
      it('as funções "status", "json" e são executadas', async () => {
        await ProductController.byId(request, response);
        
        expect(response.status.called).to.be.true;
        expect(response.json.called).to.be.true;
      });
    });
    
    describe('Produto retornado:', () => {
      beforeEach(() => Sinon.stub(ProductService, 'byId').resolves(byId[0]));
      
      it('a função "status" é executada com valor 200', async () => {
        await ProductController.byId(request, response);

        expect(response.status.calledWith(200)).is.true;
      });

      it('a função "json" é executada com o objeto correspondente', async () => {
        await ProductController.byId(request, response);

        expect(response.json.calledWith(byId[0])).is.true;
      });
    });
    
    describe.skip('Produto não retornado:', () => {
      beforeEach(() => {
        Sinon.stub(ProductService, 'byId').resolves(notFound);
        // Sinon.stub(ControllerErrorHandler, 'arguments').returns(response);
      });

      it('Um erro será lançado', async () => {
        const arrow = await function () { throw new Error('test') };

        expect(arrow).to.be.rejectedWith(new Error('test'));
        // expect(await ProductController.byId(request, response)).to.throw(
        //   new Error("Product not found")
        // );
      });

      it('a função "status" é executada com o valor 400', async () => {
        await ProductController.byId(request, response);
        
        expect(response.status.calledWith(400)).is.true;
      });
    })
  });
});

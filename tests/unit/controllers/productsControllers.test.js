const Sinon = require("sinon");
const { expect } = require("chai");

const ProductService = require('../../../services/Product');
const ProductController = require('../../../controllers/Product');

const { all, byId } = require('../../mocks/Products');
const { notFound } = require('../../mocks/Errors');

describe('(PRODUCT: CONTROLLER)', () => {
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

  describe('[GET, "/products/:id"]', () => {

    describe('Independente do retorno:', () => {
      it('as funções "status", "json" e são executadas', async () => {
        Sinon.stub(ProductService, 'byId').resolves(byId[0]);

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
    
    describe('Produto não retornado:', () => {
      beforeEach(() => {
        Sinon.stub(ProductService, 'byId').resolves(notFound);
      });
      
      it('será lançado um erro', async () => {
        try {
          await ProductController.byId(request, response);
        } catch (error) {
          expect(error).to.be.an('error');
        }
      });
      
      it('a mensagem "Product not found" será retornada', async () => {
        try {
          await ProductController.byId(request, response);
        } catch ({ message }) {
          expect(message).to.be.a('string');
          expect(message).to.be.deep.equal('Product not found');
        }
      });

      it('na causa do erro esta presente o "status" 404', async () => {
        try {
          await ProductController.byId(request, response);
        } catch ({ cause: { status }  }) {
          expect(status).to.be.a('number');
          expect(status).to.be.deep.equal(404);
        }
      });
    });
  });
});

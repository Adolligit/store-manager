const Sinon = require("sinon");
const { expect } = require("chai");

const ProductService = require('../../../services/Product');
const ProductController = require('../../../controllers/Product');

const { all, byId, query } = require('../../mocks/Products');
const { notFound } = require('../../mocks/Errors');

describe('(PRODUCT: CONTROLLER)', () => {
  const response = {};
  const request = {};
  
  beforeEach(() => {
    response.status = Sinon.stub().returns(response);
    response.json = Sinon.stub().returns();
    response.locals = { id: 3 };
    request.query = { q: 'x' };
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
      it('as funções "status" e "json" são executadas', async () => {
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

  describe('[GET, "/products/search?"]', () => {
    describe('Independente do termo pesquisado:', () => {
      beforeEach(() => Sinon.stub(ProductService, "query").resolves(query));

      it('as funções "status" e "json" são executadas', async () => {
        await ProductController.query(request, response);

        expect(response.status.called).to.be.true;
        expect(response.json.called).to.be.true;
      });

      it('a função "status" é executado com 200', async () => {
        await ProductController.query(request, response);

        expect(response.status.calledWith(200)).is.true;
      });

      it('dentro do objeto "request" há outro chamado "query"', async () => {
        await ProductController.query(request, response);

        expect(request).to.be.have
      });
    });

    describe('Termo da pesquisa corresponde:', () => {
      beforeEach(() => Sinon.stub(ProductService, "query").resolves(query));
      
      it('a função "service.query" é executa pelo menos uma vez', async () => {
        await ProductController.query(request, response);

        expect(ProductService.query.calledOnce).is.true;
      });
      
      it('a função "json" é executada com retorno da pesquisa', async () => {
        await ProductController.query(request, response);
  
        expect(response.json.calledWith(query)).is.true;
      });

      it('o parâmetro de "json" possui o(s) produto(s) pesquisado(s)', async () => {
        await ProductController.query(request, response);
        
        const paramJson = response.json.getCall(0).args[0];

        expect(paramJson).to.be.deep.equal(query);
      });
    });

    describe('Termo da pesquisa não corresponde:', () => {
      beforeEach(() => Sinon.stub(ProductService, "query").resolves(all));
      
      it('"json" é executado com todos os produtos', async () => {
        await ProductController.query(request, response);
  
        expect(response.json.calledWith(all)).is.true;
      });
    });
  });

  describe('[POST, "/products"]', () => {
    
  });
});
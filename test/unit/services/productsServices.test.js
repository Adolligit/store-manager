const Sinon = require('sinon');
const { expect } = require('chai');

const ProductService = require('../../../service/product.service');
const ProductModel = require('../../../model/product.model');
const ServiceErrorHandler = require('../../../middleware/handlerError/service-error-handler');

const { all, byId, create, query, update } = require('../../mocks/Products');
const { notFound } = require('../../mocks/Errors');

describe('(PRODUCT: SERVICE)', function () {
  afterEach(function () { return Sinon.restore(); });

  describe('[GET, "/products"]', function () {
    beforeEach(function () {
      Sinon.stub(ProductModel, 'all').resolves([all, []]);
    });

    afterEach(function () { return ProductModel.all.restore(); });

    it('será retornado um array', async function () {
      const products = await ProductService.all();

      expect(products).to.be.an('array');
    });

    it('os valores retornados são correspondentes', async function () {
      const products = await ProductService.all();

      expect(products).to.be.deep.equal(all);
    });

    it('os objetos possuem duas propriedades', async function () {
      const products = await ProductService.all();

      products.forEach((product) => {
        expect(product).to.be.an('object');
        expect(Object.keys(product)).to.have.lengthOf(2);
      });
    });
  });

  describe('[GET, "/products/:id"]', function () {
    describe('Produto encontrado:', function () {
      beforeEach(function () { return Sinon.stub(ProductModel, 'byId').resolves([byId, []]); });

      it('o objeto retornado possui duas chaves', async function () {
        const product = await ProductService.byId(3);

        expect(Object.keys(product)).to.have.lengthOf(2);
      });

      it('as propriedades "id" e "name" estão presente no objeto', async function () {
        const product = await ProductService.byId(3);

        expect(product).to.has.all.keys('id', 'name');
        expect(product.id).to.be.a('number');
      });
    });

    describe('Produto não encontrado:', function () {
      beforeEach(function () {
        Sinon.stub(ProductModel, 'byId').resolves([[], []]);

        Sinon.stub(ServiceErrorHandler, 'arguments').returns({
          message: [notFound.message],
        });
      });

      it('um objeto é retornado com três chaves', async function () {
        const response = await ProductService.byId(3);

        expect(response).to.be.an('object');
        expect(Object.keys(response)).to.has.lengthOf(3);
      });

      it('"statusCode", "error" e "message" estão presente no objeto', async function () {
        const response = await ProductService.byId(3);

        expect(response).to.has.keys('statusCode', 'error', 'message');
      });

      it('a chave "message" possui a string "Product not found"', async function () {
        const { message } = await ProductService.byId(3);

        expect(message).to.be.a('string');
        expect(message).to.be.deep.equal(notFound.message);
      });
    });
  });

  describe('[GET, "/products/search?"]', function () {
    describe('Independente da pesquisa:', function () {
      beforeEach(function () { return Sinon.stub(ProductModel, 'query').resolves([[], []]); });

      it('o retorno deverá ser um array', async function () {
        const result = await ProductService.query('x');

        expect(result).to.be.an('array');
      });

      it('a função "model.query()" é executada uma vez', async function () {
        await ProductService.query('x');

        expect(ProductModel.query.calledOnce).is.true;
      });
    });

    describe('Termo da pequisa corresponde', function () {
      beforeEach(function () { return Sinon.stub(ProductModel, 'query').resolves([query, []]); });

      it('dentro do array há algum objeto', async function () {
        const result = await ProductService.query('x');

        expect(result[0]).to.has.an('object');
      });

      it('o objeto possui duas propriedades', async function () {
        const result = await ProductService.query('x');

        expect(Object.keys(result[0])).to.have.lengthOf(2);
      });

      it('as propriedades presentes no objeto são "id" e "name"', async function () {
        const result = await ProductService.query('x');

        expect(result[0]).to.have.keys('id', 'name');
      });
    });

    describe('Termo da pequisa não corresponde:', function () {
      beforeEach(function () { return Sinon.stub(ProductModel, 'query').resolves([[], []]); });

      it('o retorno é um array totalmente vazio', async function () {
        const result = await ProductService.query('x');

        expect(result).to.be.empty;
      });

      it('não há nenhum objeto dentro do array retornado', async function () {
        const result = await ProductService.query('x');

        expect(typeof result[0] === 'object').is.false;
      });
    });
  });

  describe('[POST, "/products"]', function () {
    const { name } = create;

    beforeEach(function () { return Sinon.stub(ProductModel, 'create').resolves(); });
    
    it('a função do Model é executada uma vez', async function () {
      await ProductService.create(name);
      
      expect(ProductModel.create.calledOnce).is.true;
    });
    
    it('a função do Model é chamada com o nome específico', async function () {
      await ProductService.create(name);
      
      expect(ProductModel.create.calledWith(name)).is.true;
    });
  });

  describe('[PUT, "/products/:id"]', function () {
    const { name } = update;

    beforeEach(function () { return Sinon.stub(ProductModel, 'update').resolves(update); });
    
    describe('Retorno da função "model.byId(...)":', function () {
      beforeEach(function () { return Sinon.stub(ProductModel, 'byId').resolves([[update], []]); });

      it('a função é executada uma vez', async function () {
        await ProductService.update(3, name);

        expect(ProductModel.byId.calledOnce).is.true;
      });
      
      it('recebe o valor do parâmetro "id" da "service.update(...)"', async function () {
        const id = 3;

        await ProductService.update(id, name);
  
        expect(ProductModel.byId.calledWith(3)).is.true;
      });
    });
    
    describe('Atualização do produto:', function () {
      describe('produto existente', function () {
        beforeEach(function () {
          return Sinon.stub(ProductModel, 'byId').resolves([[update], []]);
        });

        it('é executada uma vez a função "model.update(...)"', async function () {
          await ProductService.update(3, name);

          expect(ProductModel.update.calledOnce).is.true;
        });

        it('a função retorna um objeto com duas propriedades', async function () {
          const result = await ProductService.update(3, name);

          expect(result).to.be.an('object');
          expect(Object.keys(result)).to.have.lengthOf(2);
        });

        it('as propriedades do objeto são "id" e "name"', async function () {
          const result = await ProductService.update(3, name);

          expect(result).to.has.keys('id', 'name');
        });
      });

      describe('produto inexistente', function () {
        beforeEach(function () {
          Sinon.stub(ProductModel, 'byId').resolves([[], []]);
        });
        
        it('será retornado um objeto com 3 propriedades', async function () {
          const result = await ProductService.update(3, name);

          expect(Object.keys(result)).to.have.lengthOf(3);
        });

        it('as propriedades são "statusCode", "error" e "message"', async function () {
          const result = await ProductService.update(3, name);

          expect(result).to.have.keys('statusCode', 'error', 'message');
        });

        it('o retorno corresponde ao objeto "notFound"', async function () {
          const result = await ProductService.update(3, name);

          expect(result).to.be.deep.equal(notFound);
        });
      });
    });
  });

  describe('[DELETE, "/products/:id"]', function () {
    describe('ID existente', function () {
      beforeEach(function () {
        Sinon.stub(ProductModel, 'byId').resolves([[byId], []]);
      });
      
      it('"model.byId" é executada pelo menos uma vez', async function () {
        await ProductService.remove(3);

        expect(ProductModel.byId.calledOnce).is.true;
      });

      it('"model.byId" recebe o mesmo parâmetro "id" da "service.remove"', async function () {
        const id = 3;

        await ProductService.remove(id);
        
        expect(ProductModel.byId.calledWith(3)).is.true;
      });

      it('será retornado um array com dois valores', async function () {
        const result = await ProductService.remove(3);

        expect(result).to.lengthOf(2);
      });

      it('dentro do array, os dois valores são: "objeto" e "undefined"', async function () {
        const result = await ProductService.remove(3);

        expect(result[0]).to.be.an('object');
        expect(result[1]).to.be.undefined;
      });
    });
    
    describe('ID inexistente', function () {
      beforeEach(function () {
        Sinon.stub(ProductModel, 'byId').resolves([[], []]);
      });

      it('o retorno será um objeto com 3 propriedades', async function () {
        const result = await ProductService.remove(3);

        expect(Object.keys(result)).to.have.lengthOf(3);
      });
      
      it('as três propriedades são "statusCode", "error" e "message"', async function () {
        const result = await ProductService.remove(3);
  
        expect(result).to.have.keys('statusCode', 'error', 'message');
      });
      
      it('o valor da "statusCode" é 404', async function () {
        const { statusCode } = await ProductService.remove(3);
  
        expect(statusCode).to.be.equal(404);
      });
      
      it('o valor da "message" é "Product not found"', async function () {
        const { message } = await ProductService.remove(3);
  
        expect(message).to.be.equal('Product not found');
      });
      
      it('o objeto retornado é correspondente', async function () {
        const result = await ProductService.remove(3);
  
        expect(result).to.be.deep.equal(notFound);
      });
    });
  });
});
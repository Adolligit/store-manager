const { expect } = require("chai");
const Sinon = require("sinon");

const ProductService = require('../../../services/Product');
const ProductModel = require('../../../models/Product');
const ServiceErrorHandler = require("../../../Errors/ServiceErrorHandler");

const { all, byId, create, query, update } = require('../../mocks/Products');
const { notFound } = require('../../mocks/Errors');

describe('(PRODUCT: SERVICE)', () => {
  afterEach(() => Sinon.restore());

  describe('[GET, "/products"]', () => {
    beforeEach(() => {
      Sinon.stub(ProductModel, "all").resolves([all, []]);
    });

    afterEach(() => ProductModel.all.restore());

    it("será retornado um array", async () => {
      const products = await ProductService.all();

      expect(products).to.be.an("array");
    });

    it("os valores retornados são correspondentes", async () => {
      const products = await ProductService.all();

      expect(products).to.be.deep.equal(all);
    });

    it("os objetos possuem duas propriedades", async () => {
      const products = await ProductService.all();

      products.forEach((product) => {
        expect(product).to.be.an("object");
        expect(Object.keys(product)).to.have.lengthOf(2);
      });
    });
  });

  describe('[GET, "/products/:id"]', () => {
    describe("Produto encontrado:", () => {
      beforeEach(() => Sinon.stub(ProductModel, "byId").resolves([byId, []]));

      it("o objeto retornado possui duas chaves", async () => {
        const product = await ProductService.byId(3);

        expect(Object.keys(product)).to.have.lengthOf(2);
      });

      it('as propriedades "id" e "name" estão presente no objeto', async () => {
        const product = await ProductService.byId(3);

        expect(product).to.has.all.keys("id", "name");
        expect(product["id"]).to.be.a("number");
      });
    });

    describe("Produto não encontrado:", () => {
      beforeEach(() => {
        Sinon.stub(ProductModel, "byId").resolves([[], []]);

        Sinon.stub(ServiceErrorHandler, "arguments").returns({
          message: [notFound.message],
        });
      });

      it("um objeto é retornado com três chaves", async () => {
        const response = await ProductService.byId(3);

        expect(response).to.be.an("object");
        expect(Object.keys(response)).to.has.lengthOf(3);
      });

      it('"statusCode", "error" e "message" estão presente no objeto', async () => {
        const response = await ProductService.byId(3);

        expect(response).to.has.keys("statusCode", "error", "message");
      });

      it('a chave "message" possui a string "Product not found"', async () => {
        const { message } = await ProductService.byId(3);

        expect(message).to.be.a("string");
        expect(message).to.be.deep.equal(notFound.message);
      });
    });
  });

  describe('[GET, "/products/search?"]', () => {
    describe("Independente da pesquisa:", () => {
      beforeEach(() => Sinon.stub(ProductModel, "query").resolves([[], []]));

      it("o retorno deverá ser um array", async () => {
        const result = await ProductService.query("x");

        expect(result).to.be.an("array");
      });

      it('a função "model.query()" é executada uma vez', async () => {
        await ProductService.query("x");

        expect(ProductModel.query.calledOnce).is.true;
      });
    });

    describe("Termo da pequisa corresponde", () => {
      beforeEach(() => Sinon.stub(ProductModel, "query").resolves([query, []]));

      it("dentro do array há algum objeto", async () => {
        const result = await ProductService.query("x");

        expect(result[0]).to.has.an("object");
      });

      it("o objeto possui duas propriedades", async () => {
        const result = await ProductService.query("x");

        expect(Object.keys(result[0])).to.have.lengthOf(2);
      });

      it('as propriedades presentes no objeto são "id" e "name"', async () => {
        const result = await ProductService.query("x");

        expect(result[0]).to.have.keys("id", "name");
      });
    });

    describe("Termo da pequisa não corresponde:", () => {
      beforeEach(() => Sinon.stub(ProductModel, "query").resolves([[], []]));

      it("o retorno é um array totalmente vazio", async () => {
        const result = await ProductService.query("x");

        expect(result).to.be.empty;
      });

      it("não há nenhum objeto dentro do array retornado", async () => {
        const result = await ProductService.query("x");

        expect(typeof result[0] === "object").is.false;
      });
    });
  });

  describe('[POST, "/products"]', () => {
    const { name } = create;

    beforeEach(() => Sinon.stub(ProductModel, 'create').resolves());
    
    it('a função do Model é executada uma vez', async () => {
      await ProductService.create(name);
      
      expect(ProductModel.create.calledOnce).is.true;
    });
    
    it('a função do Model é chamada com o nome específico', async () => {
      await ProductService.create(name);
      
      expect(ProductModel.create.calledWith(name)).is.true;
    });
  });

  describe('[PUT, "/products/:id"]', () => {
    const { name } = update;

    beforeEach(() => Sinon.stub(ProductModel, 'update').resolves(update));
    
    describe('Retorno da função "model.byId(...)":', () => {
      beforeEach(() => Sinon.stub(ProductModel, "byId").resolves([[update], []]))

      it('a função é executada uma vez', async () => {
        await ProductService.update(3, name);

        expect(ProductModel.byId.calledOnce).is.true;
      });
      
      it('recebe o valor do parâmetro "id" da "service.update(...)"', async () => {
        const id = 3;

        await ProductService.update(id, name);
  
        expect(ProductModel.byId.calledWith(3)).is.true;
      });
    });
    
    describe('Atualização do produto:', () => {
      describe('produto existente', () => {
        beforeEach(() => Sinon.stub(ProductModel, "byId").resolves([[update], []]));

        it('é executada uma vez a função "model.update(...)"', async () => {
          await ProductService.update(3, name);

          expect(ProductModel.update.calledOnce).is.true;
        });

        it('a função retorna um objeto com duas propriedades', async () => {
          const result = await ProductService.update(3, name);

          expect(result).to.be.an("object");
          expect(Object.keys(result)).to.have.lengthOf(2);
        });

        it('as propriedades do objeto são "id" e "name"', async () => {
          const result = await ProductService.update(3, name);

          expect(result).to.has.keys("id", "name");
        });
      });

      describe('produto inexistente', () => {
        beforeEach(() => {
          Sinon.stub(ProductModel, "byId").resolves([[], []]);
          Sinon.stub(ServiceErrorHandler, 'arguments').returns(notFound);
        });
        
        it('será retornado um objeto com 3 propriedades', async () => {
          const result = await ProductService.update(3, name);

          expect(Object.keys(result)).to.have.lengthOf(3);
        });

        it('as propriedades são "statusCode", "error" e "message"', async () => {
          const result = await ProductService.update(3, name);

          expect(result).to.have.keys('statusCode', 'error', 'message');
        });

        it('o retorno corresponde ao objeto "notFound"', async () => {
          const result = await ProductService.update(3, name);

          expect(result).to.be.deep.equal(notFound);
        });
      });
    });
  });
});
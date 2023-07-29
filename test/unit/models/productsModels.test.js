const { expect } = require('chai');
const Sinon = require('sinon');

const connection = require('../../../connection/connect');
const Product = require('../../../model/product.model');

const { all, byId, create, update, query: search } = require('../../mocks/Products');

describe('(PRODUCT: MODEL)', () => {

  afterEach(() => Sinon.restore());
  
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

  describe('[GET, "/products/search?"]', () => {
    describe('Independente do termo pesquisado:', () => {  
      beforeEach(() => Sinon.stub(connection, 'execute').resolves([search, []]));

      it('a query específica é executada', async () => {
        const query = 'SELECT * FROM StoreManager.products WHERE name LIKE ?';
        
        await Product.query('x');
        
        expect(connection.execute.calledWith(query)).is.true;
      });
    
      it('o retorno da função será um array com dois valores', async () => {
        const result = await Product.query('x');
        
        expect(result).to.has.lengthOf(2);
      });

      it('ambos os valores dentro do retorno são arrays', async () => {
        const result = await Product.query("x");
        
        /*
          Colocar o indice diretamente facilita para diagnoticar uma possível falha. Se eu usasse um forEach, não saberia qual
          indice teria falhado. Teria que refatorar com algum console.log
          para saber qual objeto não passou na avaliação.
        */
       expect(result[0]).to.be.a("array");
       expect(result[1]).to.be.a("array");
      });
    });
    
    describe('Termo da pesquisa corresponde:', () => {
      beforeEach(() => Sinon.stub(connection, 'execute').resolves([search, []]));

      it('há um objeto com dois valores dentro do array', async () => {
        const [result] = await Product.query('x');
  
        expect(result[0]).to.be.an('object');
      });

      it('é retornado um produto quando pesquisado o termo "x"', async () => {
        const [result] = await Product.query('x');

        expect(result).to.be.deep.equal(search);
      });
    });

    describe('Termo da pesquisa não corresponde:', () => {
      beforeEach(() => Sinon.stub(connection, "execute").resolves([[], []]));
      
      it('dois arrays vazios serão retornados', async () => {
        const result = await Product.query('x');

        expect(result[0]).to.be.an('array');
        expect(result[1]).to.be.an('array');
        expect(result).to.has.lengthOf(2);
        expect(result).to.be.deep.equal([[], []]);
        result.forEach((value) => expect(value).to.be.empty);
      });
    });
  });

  describe('[POST, "/products"]', () => {
    beforeEach(() => Sinon.stub(connection, 'execute').resolves());

    it('uma query específica é executada', async () => {
      const query = "INSERT INTO StoreManager.products VALUE(null, ?)";

      await Product.create(create.name);

      expect(connection.execute.calledWith(query)).is.true;
    });

    it('nada será retornado ao cria um produto', async () => {
      const response = await Product.create(create.name);

      expect(response).to.be.undefined;
    });
  });

  describe('[PUT, "/products/:id"]', () => {
    let connect;
    const { id, name } = update;

    beforeEach(() => {
      connect = Sinon.stub(connection, 'execute');
      connect.resolves();
    });

    it('a query de "UPDATE" é executada', async () => {
      const query = "UPDATE StoreManager.products";
      
      await Product.update(id, name);

      const firstParam = connect.getCall(0).args[0];
        
      expect(firstParam.includes(query)).is.true;
    });

    it('será retornado "undefined" quando o produto for atualizado', async () => {
      const result = await Product.update(id, name);
      
      expect(result).to.be.undefined;
    });
  });

  describe('[DELETE, "/products/:id"]', () => {
    beforeEach(() => {
      Sinon.stub(connection, 'execute').resolves();
    });

    it('a query "DELETE" será executada', async () => {
      const query = "DELETE FROM StoreManager.products WHERE id = ?";

      await Product.remove(3);
      
      expect(connection.execute.calledWith(query)).is.true;
    });

    it('"undefined" será retornado quando o produto for deletado', async () => {
      const result = await Product.remove(3);

      expect(result).to.be.undefined;
    });
  });
});
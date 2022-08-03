const { expect } = require("chai");
const sinon = require("sinon");

const Product = require('../../../models/Product');
const Connection = require('../../../connection/connect');

const expectedProducts = [
  {
      "id": 1,
      "name": "Maçã do amor"
  },
  {
      "id": 2,
      "name": "Traje de coelho"
  },
  {
      "id": 3,
      "name": "Capitão Brasil"
  }
];


describe("[MODEL: Product] Validando o retorno das querys", () => {
  afterEach(() => Connection.execute.restore())

  it("Será retornado um array com todos os Produtos cadastrados", async () => {
    sinon.stub(Connection, "execute").resolves(expectedProducts);
    
    const response = await Product.all();
    
    response.forEach((e) => expect(e).to.be.an("object"));
    expect(response).to.be.deep.eq(expectedProducts);
  });

  it('O id e o nome será retornado ao criar o novo produto', async () => {
    const mockIts = [{ id: 3, name: 'test' }];

    sinon.stub(Connection, "execute").resolves(mockIts);

    const response = await Product.create('test')

    expect(response).to.be.deep.eq(mockIts)
  });
});

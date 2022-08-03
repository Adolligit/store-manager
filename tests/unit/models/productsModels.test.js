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

after(() => Connection.execute.restore())

describe("[MODEL: Product] Validando o retorno das querys", () => {

  it("Será retornado um array com todos os Produtos cadastrados", async () => {
    sinon.stub(Connection, "execute").resolves(expectedProducts);
    
    const response = await Product.all();
    
      expect(response).to.be.deep.eq(expectedProducts);
  });
});

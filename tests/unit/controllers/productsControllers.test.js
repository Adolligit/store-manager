const { expect } = require("chai");
const sinon = require("sinon");

const ProductController = require("../../../controllers/Product");
const ProductService = require("../../../services/Product");

describe("[CONTROLLER: Product] Verificando requisições HTTP", () => {

  const response = {};
  const request = {};

  before(() => {
    request.body = {};

    response.status = sinon.stub().returns(response);
    response.send = sinon.stub().returns();
  });

  it("[GET: '/products'] Todos os produtos serão retornados ", async () => {
    await ProductController.all(request, response);
   
    expect(response.status.calledWith(400)).to.be.equal(true);
  });
});

const { expect } = require("chai");
const sinon = require("sinon");

const ProductModel = require("../../../models/Product");
const ProductService = require("../../../services/Product");


describe("[SERVICE: Product] Certificando sobre as regras de negócio", () => {
  afterEach(() => ProductModel.all.restore());

  it("A função ProductService foi executada", async () => {
    const mockIts = [{ id: 1, name: 'test' }];

    sinon.stub(ProductModel, "all").resolves(mockIts);

    const response = await ProductService.all();

    expect(response).equal(mockIts[0]);
  });
});

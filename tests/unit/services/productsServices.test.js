const { expect } = require("chai");
const sinon = require("sinon");

const ProductModel = require("../../../models/Product");
const ProductService = require("../../../services/Product");

 after(() => ProductModel.all.restore());

describe("[SERVICE: Product] Certificando sobre as regras de negócio", () => {
  it("A função ProductService foi executada", async () => {
    sinon.stub(ProductModel, "all").resolves([]);

    const response = await ProductService.all();

    expect(response).equal(undefined);
  });
});

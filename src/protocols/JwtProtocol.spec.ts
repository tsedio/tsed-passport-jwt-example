import {TestContext} from "@tsed/testing";
import {JwtProtocol} from "./JwtProtocol";

describe("JwtProtocol", () => {
  beforeEach(TestContext.create);
  afterEach(TestContext.reset);

  it(
    "should do something",
    TestContext.inject([JwtProtocol], (controller: JwtProtocol) => {
      expect(controller).toBeInstanceOf(JwtProtocol);
    })
  );
});

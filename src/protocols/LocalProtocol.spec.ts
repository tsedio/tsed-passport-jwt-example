import {TestContext} from "@tsed/testing";
import {LocalProtocol} from "./LocalProtocol";

describe("LocalProtocol", () => {
  beforeEach(TestContext.create);
  afterEach(TestContext.reset);

  it(
    "should do something",
    TestContext.inject([LocalProtocol], (controller: LocalProtocol) => {
      expect(controller).toBeInstanceOf(LocalProtocol);
    })
  );
});

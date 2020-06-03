import {TestContext} from "@tsed/testing";
import {AuthController} from "./AuthController";

describe("AuthController", () => {
  beforeEach(TestContext.create);
  afterEach(TestContext.reset);

  it(
    "should do something",
    TestContext.inject([AuthController], (controller: AuthController) => {
      expect(controller).toBeInstanceOf(AuthController);
    })
  );
});

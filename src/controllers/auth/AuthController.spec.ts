import {PlatformTest} from "@tsed/common";
import {AuthController} from "./AuthController";

describe("AuthController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it(
    "should do something",
    PlatformTest.inject([AuthController], (controller: AuthController) => {
      expect(controller).toBeInstanceOf(AuthController);
    })
  );
});

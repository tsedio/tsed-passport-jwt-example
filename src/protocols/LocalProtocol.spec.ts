import {PlatformTest} from "@tsed/common";
import {TestContext} from "@tsed/testing";
import {LocalProtocol} from "./LocalProtocol";

describe("LocalProtocol", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it(
    "should do something",
    TestContext.inject([LocalProtocol], (controller: LocalProtocol) => {
      expect(controller).toBeInstanceOf(LocalProtocol);
    })
  );
});

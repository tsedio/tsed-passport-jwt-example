import {PlatformTest} from "@tsed/common";
import {LocalProtocol} from "./LocalProtocol";

describe("LocalProtocol", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it(
    "should do something",
    PlatformTest.inject([LocalProtocol], (controller: LocalProtocol) => {
      expect(controller).toBeInstanceOf(LocalProtocol);
    })
  );
});

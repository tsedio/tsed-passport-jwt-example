import {PlatformTest} from "@tsed/common";
import {JwtProtocol} from "./JwtProtocol";

describe("JwtProtocol", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it(
    "should do something",
    PlatformTest.inject([JwtProtocol], (protocol: JwtProtocol) => {
      expect(protocol).toBeInstanceOf(JwtProtocol);
    })
  );
});

import {TestContext} from "@tsed/testing";
import {UsersService} from "./UsersService";

describe("UsersService", () => {
  beforeEach(TestContext.create);
  afterEach(TestContext.reset);

  it(
    "should do something",
    TestContext.inject([UsersService], (controller: UsersService) => {
      expect(controller).toBeInstanceOf(UsersService);
    })
  );
});

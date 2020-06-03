import {PlatformApplication} from "@tsed/common";
import {TestContext} from "@tsed/testing";
import * as SuperTest from "supertest";
import {AuthController} from "./AuthController";
import {Server} from "../../Server";

describe("AuthController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(
    TestContext.bootstrap(Server, {
      mount: {
        "/": [AuthController],
      },
    })
  );
  beforeEach(
    TestContext.inject([PlatformApplication], (app: PlatformApplication) => {
      request = SuperTest(app.raw);
    })
  );

  afterEach(TestContext.reset);

  it("should call GET /auth", async () => {
    const response = await request.get("/auth").expect(200);

    expect(response.text).toEqual("hello");
  });
});

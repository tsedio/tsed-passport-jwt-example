import {PlatformApplication, PlatformTest} from "@tsed/common";
import * as SuperTest from "supertest";
import {Server} from "../../Server";
import {AuthController} from "./AuthController";

describe("AuthController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(
    PlatformTest.bootstrap(Server, {
      mount: {
        "/": [AuthController]
      }
    })
  );
  beforeEach(
    PlatformTest.inject([PlatformApplication], (app: PlatformApplication) => {
      request = SuperTest(app.raw);
    })
  );

  afterEach(PlatformTest.reset);

  it("should call GET /auth", async () => {
    const response = await request.get("/auth").expect(200);

    expect(response.text).toEqual("hello");
  });
});

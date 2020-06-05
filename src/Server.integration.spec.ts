import {PlatformApplication} from "@tsed/common";
import {TestContext} from "@tsed/testing";
import * as SuperTest from "supertest";
import {Server} from "./Server";

describe("Server", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(TestContext.bootstrap(Server));
  beforeEach(
    TestContext.inject([PlatformApplication], (app: PlatformApplication) => {
      request = SuperTest(app.raw);
    })
  );

  afterEach(TestContext.reset);

  it("should call GET /rest", async () => {
    const response = await request.get("/rest").expect(404);

    expect(response.text).toEqual("Not found");
  });

  it("should call get User info after having authenticated", async () => {
    const {text: token} = await request
      .post("/rest/auth/login")
      .send({
        email: "admin",
        password: "admin",
      })
      .expect(200);

    expect(token.length > 1).toEqual(true);

    const {body} = await request.get("/rest/auth/userinfo").set({
      Authorization: `Bearer ${token}`,
    });

    expect(body).toEqual({
      email: "admin",
      id: "1",
      password: "admin",
    });
  });
});

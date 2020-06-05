import {PlatformApplication, PlatformTest} from "@tsed/common";
import * as SuperTest from "supertest";
import {Server} from "./Server";

describe("Server", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(PlatformTest.bootstrap(Server));
  beforeEach(
    PlatformTest.inject([PlatformApplication], (app: PlatformApplication) => {
      request = SuperTest(app.raw);
    })
  );

  afterEach(PlatformTest.reset);

  it("should call get User info after having authenticated", async () => {
    const {text: token} = await request
      .post("/rest/auth/login")
      .send({
        email: "admin",
        password: "admin"
      })
      .expect(200);

    expect(token.length > 1).toEqual(true);

    const {body} = await request.get("/rest/auth/userinfo").set({
      Authorization: `Bearer ${token}`
    });

    expect(body).toEqual({
      email: "admin",
      id: "1",
      password: "admin"
    });
  });
});

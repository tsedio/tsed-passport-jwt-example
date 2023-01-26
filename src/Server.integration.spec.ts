import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { Server } from "./Server";

describe("Server", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(
    PlatformTest.bootstrap(Server)
  );
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  describe("When trying to login", () => {
    it("should call get User info after having authenticated", async () => {
      const {
        body: { token }
      } = await request
        .post("/rest/auth/login")
        .send({
          email: "admin@tsed.io",
          password: "admin"
        })
        .expect(200);

      expect(token.length > 1).toEqual(true);

      const { body } = await request.get("/rest/auth/userinfo").set({
        Authorization: `Bearer ${token}`
      });

      expect(body).toEqual({
        email: "admin@tsed.io",
        id: "1"
      });
    });
    it("should return a bad request if email format is wrong", async () => {
      const { body } = await request
        .post("/rest/auth/login")
        .send({
          email: "admin",
          password: "admin"
        })
        .expect(400);

      expect(body).toMatchInlineSnapshot(`
              Object {
                "errors": Array [
                  Object {
                    "data": "admin",
                    "dataPath": ".email",
                    "instancePath": "/email",
                    "keyword": "format",
                    "message": "must match format \\"email\\"",
                    "modelName": "User",
                    "params": Object {
                      "format": "email",
                    },
                    "schemaPath": "#/properties/email/format",
                  },
                ],
                "message": "Bad request on parameter \\"request.body\\".
              User.email must match format \\"email\\". Given value: \\"admin\\"",
                "name": "AJV_VALIDATION_ERROR",
                "status": 400,
              }
          `);
    });
    it("should return an unauthorized error when the credentials are wrong", async () => {
      const { body } = await request
        .post("/rest/auth/login")
        .send({
          email: "admin@gmail.com",
          password: "admin"
        })
        .expect(401);

      expect(body).toMatchInlineSnapshot(`
        Object {
          "errors": Array [],
          "message": "Wrong credentials",
          "name": "UNAUTHORIZED",
          "status": 401,
        }
      `);
    });
  });
  describe("When trying get user info", () => {
    it("should return an unauthorized error when the token header is missing", async () => {
      const { body } = await request.get("/rest/auth/userinfo").set({}).expect(401);

      expect(body).toMatchInlineSnapshot(`
        Object {
          "errors": Array [],
          "message": "Unauthorized",
          "name": "AuthenticationError",
          "status": 401,
        }
      `);
    });
  });
});

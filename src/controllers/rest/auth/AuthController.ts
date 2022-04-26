import {BodyParams, Controller, Get, Post, Req} from "@tsed/common";
import {Authenticate} from "@tsed/passport";
import {Returns, Required, Security} from "@tsed/schema";
import {User} from "../../../models/User";

@Controller("/auth")
export class AuthController {
  @Post("/login")
  @Authenticate("local")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Req("user") user: User, @Required() @BodyParams("email") email: string, @Required() @BodyParams("password") password: string) {
    return user;
  }

  @Get("/userinfo")
  @Authenticate("jwt")
  @Security("jwt")
  @Returns(200, User)
  getUserInfo(@Req("user") user: User) {
    return user;
  }
}

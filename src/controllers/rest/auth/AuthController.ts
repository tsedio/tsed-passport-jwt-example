import {BodyParams, Controller, Get, Post, Req} from "@tsed/common";
import {Authenticate} from "@tsed/passport";
import {Groups, Returns, Security} from "@tsed/schema";
import {User} from "../../../models/User";

@Controller("/auth")
export class AuthController {
  @Post("/login")
  @Authenticate("local")
  @Returns(200, User).Groups("token", "info")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Req("user") user: User, @BodyParams() @Groups("credentials") credentials: User) {
    return user;
  }

  @Get("/userinfo")
  @Authenticate("jwt")
  @Security("jwt")
  @Returns(200, User).Groups("info")
  getUserInfo(@Req("user") user: User) {
    return user;
  }
}

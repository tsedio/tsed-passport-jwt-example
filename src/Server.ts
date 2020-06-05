import "@tsed/ajv";
import {Configuration, GlobalAcceptMimesMiddleware, Inject, PlatformApplication} from "@tsed/common";
import "@tsed/platform-express";
import "@tsed/swagger";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as methodOverride from "method-override";
import {User} from "./models/User";

const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  mount: {
    "/rest": [`${rootDir}/controllers/**/*.ts`]
  },
  swagger: [
    {
      path: "/docs"
    }
  ],
  exclude: ["**/*.spec.ts"],
  componentsScan: [`${rootDir}/protocols/*Protocol.ts`],
  passport: {
    userInfoModel: User
  }
})
export class Server {
  @Inject()
  app: PlatformApplication;

  $beforeRoutesInit() {
    this.app
      .use(cors())
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      );

    return null;
  }
}

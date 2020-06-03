import "@tsed/ajv";
import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from "@tsed/common";
import "@tsed/swagger";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as methodOverride from "method-override";
import {User} from "./models/User";

const rootDir = __dirname;

@ServerSettings({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  mount: {
    "/rest": [`${rootDir}/controllers/**/*.ts`],
  },
  swagger: [
    {
      path: "/docs",
    },
  ],
  exclude: ["**/*.spec.ts"],
  componentsScan: [`${rootDir}/protocols/*Protocol.ts`],
  passport: {
    userInfoModel: User,
    protocols: {
      jwt: {
        settings: {
          secretOrKey: "thisismysupersecretprivatekey1",
          issuer: "localhost",
          audience: "localhost",
        },
      },
    },
  },
})
export class Server extends ServerLoader {
  $beforeRoutesInit() {
    this.use(cors())
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        })
      );

    return null;
  }
}

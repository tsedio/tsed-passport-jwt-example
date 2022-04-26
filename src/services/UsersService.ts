import {Injectable} from "@tsed/di";
import _ from "lodash";
import {User} from "../models/User";

@Injectable()
export class UsersService {
  private users: User[] = [
    new User({
      id: "1",
      email: "admin",
      password: "admin",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJhdWQiOiJsb2NhbGhvc3QiLCJzdWIiOiIxIiwiZXhwIjoxNTkxMjA0OTk2ODg2LCJpYXQiOjE1OTEyMDEzOTY4ODZ9.H_dedPLAlkVU_Zw-UthX3RSaysrBartNWILcnJKichc"
    })
  ];

  findOne(query: any): User | undefined {
    return _.find(this.users, query);
  }

  attachToken(user: User, token: string) {
    user.token = token;
  }
}

import {UserInfo} from "@tsed/passport";

export class User extends UserInfo {
  token: string;

  constructor(props: any) {
    super();

    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
    this.token = props.token;
  }

  verifyPassword(password: string) {
    return this.password === password;
  }
}

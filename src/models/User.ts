import {Example, Format, Groups, Property} from "@tsed/schema";

export class User {
  @Property()
  @Groups("!credentials")
  id: string;

  @Property()
  @Format("email")
  @Example("admin@tsed.io")
  email: string;

  @Groups("credentials")
  @Example("admin")
  password: string;

  @Groups("token", "!credentials")
  token: string;

  constructor(props: any) {
    this.id = props.id;
    this.email = props.email;
    this.password = props.password;
    this.token = props.token;
  }

  verifyPassword(password: string) {
    return this.password === password;
  }
}

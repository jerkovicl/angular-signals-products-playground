import { FormControl } from '@angular/forms';

// login info for test:
// username: "atuny0",
// password: "9uQFF1Lh",

export interface UserLogin {
  username: string;
  password: string;
}

export interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string; // src url
  token: string; // jwt token
}

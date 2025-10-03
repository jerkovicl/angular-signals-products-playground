import { FormControl } from '@angular/forms';

// login info for test use from https://dummyjson.com/users:
// username: "emilys",
// password: "emilyspass",

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

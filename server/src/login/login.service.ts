import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
  checkUser(a) {
    console.log(a);
  }
}

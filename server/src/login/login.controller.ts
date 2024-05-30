import { Controller, Post, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { Request } from 'express';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  test(@Req() req: Request) {
    this.loginService.checkUser(req);
  }
}

import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AppController } from 'src/app.controller';

@Module({
  imports: [AppController],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}

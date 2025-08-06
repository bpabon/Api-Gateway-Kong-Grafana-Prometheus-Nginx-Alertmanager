import { Controller, Post, Get,Body } from '@nestjs/common';
// import * as jwt from 'jsonwebtoken';
// import * as fs from 'fs';
// import * as path from 'path';
@Controller('public')
export class PublicController {
  // private privateKey: string;

  // constructor() {
  //   this.privateKey = fs.readFileSync(path.join(__dirname, '../key/private.key'), 'utf8');
  // }
  @Post('login')
  login() {
    return 'login OK';
  }

  @Post('register')
  register() {
    return 'register OK';
  }
  @Get('health')
  getHealth(): string {
    return 'OK';
  }
  @Get('hello')
  getHello(): string {
    return 'Hello desde NestJS! :)';
  }
  @Post('token')
  generateToken(): any  {
    // const payload = {
    //   sub: 'test-user',
    //   iss: 'my-issuer', // debe coincidir con `key:` en Kong
    //   name: 'Name user prueba'
    // };

    // const token = jwt.sign(payload, this.privateKey, {
    //   algorithm: 'RS256',
    //   expiresIn: '1h',
    // });

    // return { token };
    return {token: 'bien'}
  }
}

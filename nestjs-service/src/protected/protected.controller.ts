import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class ProtectedController {
  @Get()
  getUsers() {
    return ['user1', 'user2'];
  }
  @Get('jwt')
  getjwt(): string {
    return 'Route protect with JWT KONG API';
  }
}

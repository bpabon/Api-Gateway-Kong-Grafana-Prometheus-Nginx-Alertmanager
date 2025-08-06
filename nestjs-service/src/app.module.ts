import { Module } from '@nestjs/common';
import { PublicController } from './public/public.controller';
import { ProtectedController } from './protected/protected.controller';

@Module({
  controllers: [ PublicController, ProtectedController],
})
export class AppModule {}
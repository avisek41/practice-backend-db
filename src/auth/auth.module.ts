import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({ global: true }), // 👈 We will specify the secrets later!
  ],
})
export class AuthModule {}

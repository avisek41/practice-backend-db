import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UsersController } from './users.controller.js';

@Module({
  controllers: [UsersController],
  providers: [PrismaService], // We provide Prisma so we can talk to the database!
})
export class UsersModule {}

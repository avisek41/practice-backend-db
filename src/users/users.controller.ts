import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }
}

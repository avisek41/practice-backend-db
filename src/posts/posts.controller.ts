import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto.js';
import { PostsService } from './posts.service.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  // We inject the service here!
  constructor(private readonly postsService: PostsService) {}
  // 👇 The Bouncer stands right here!
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req: any, @Body() body: CreatePostDto) {
    const authorId = req.user.sub;

    return this.postsService.create(body, authorId);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdatePostDto) {
    return this.postsService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(Number(id));
  }
}

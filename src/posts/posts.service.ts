import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreatePostDto, authorId: number) {
    return this.prisma.post.create({
      data: {
        ...data,
        authorId: authorId,
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  // 👇 1. Tell the Chef to expect the authorId as the 3rd argument
  async update(id: number, data: UpdatePostDto, authorId: number) {
    // 2. Find the post in the database
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');

    // 3. Security Check: Does the token ID match the Post's author ID?
    if (post.authorId !== authorId) {
      throw new ForbiddenException(
        "You are not allowed to edit someone else's post!",
      );
    }
    // 4. If they passed the check, update it!
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  async remove(id: number, authorId: number) {
    // 1. Find the post in the database
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');

    // 2. Security Check: Does the token ID match the Post's author ID?
    if (post.authorId !== authorId) {
      throw new ForbiddenException(
        "You are not allowed to delete someone else's post!",
      );
    }
    // 3. If they passed the check, delete it!
    return this.prisma.post.delete({ where: { id } });
  }
}

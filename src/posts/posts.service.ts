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

  findAll(page: number, limit: number, published?: string) {
    // 2. Math! If we are on Page 2, and the limit is 10, we want to SKIP the first 10 posts!
    const skipAmount = (page - 1) * limit;
    // 👇 2. Dynamically build our search filter!
    const whereFilter: any = {};
    if (published === 'true') whereFilter.published = true;
    if (published === 'false') whereFilter.published = false;

    return this.prisma.post.findMany({
      where: whereFilter, // 👈 3. Hand the filter to Prisma!
      skip: skipAmount, // 👈 Skip the old posts
      take: limit, // 👈 Take only the requested amount
      orderBy: { createdAt: 'desc' }, // 👈 Sort by newest first!
    });
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

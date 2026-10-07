import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService, // 👈 2. Inject it here!
  ) {}

  async create(data: CreateUserDto) {
    if (data.password !== data.confirmPassword) {
      throw new BadRequestException('Passwords do not match!');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    // 3. Save the user
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });

    // 👇 4. Generate the payload (What goes inside the token)
    const payload = { sub: user.id, email: user.email };

    // 👇 5. Generate both tokens!
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    // 👇 6. Return the tokens!
    return {
      message: 'User successfully created!',
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  findAll() {
    return this.prisma.user.findMany({
      include: { posts: true },
    });
  }
}

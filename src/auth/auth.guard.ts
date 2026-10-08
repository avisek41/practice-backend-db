import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Grab the request ticket
    const request = context.switchToHttp().getRequest();

    // 2. Look for the token in the Headers
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('You must be logged in to do this!');
    }

    try {
      // 3. The Bouncer cryptographically verifies the token is real!
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      // 4. Attach their ID to the request so the Chef knows who they are!
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired token!');
    }

    return true; // Let them in!
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

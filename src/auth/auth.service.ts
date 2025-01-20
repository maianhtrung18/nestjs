import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getToken() {
    return this.jwtService.signAsync(
      {
        data: '191',
      },
      {
        expiresIn: '5m',
        algorithm: 'HS256',
        secret: 'BI_MAT',
      },
    );
  }
}

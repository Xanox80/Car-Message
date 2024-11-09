import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { getAuthSecret } from 'src/config';
import { ApiJwtPayload } from 'src/interface/jwt-payload.interface';
import { UserDto, UserRequestDto } from 'src/modules/user';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserUpdataRequestDto } from 'src/modules/user/dto/request/user-updata-request.dto';

const { atSecret, atSecretExpires, rtSecret, rtSecretExpires } =
  getAuthSecret();

@Injectable()
export class UserRepository {
  findById(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly prisma: PrismaService) {}

  async register(data: UserDto): Promise<User> {
    const { name, password, role = 'user' } = data;

    const check = await this.prisma.user.findFirst({
      where: { name: { equals: name } },
    });

    if (check) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { name, password: hashedPassword, role },
    });

    const tokenPair = await this.generateTokenPair({
      id: user.id,
    });

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        access_token: tokenPair.access_token,
        refresh_token: tokenPair.refresh_token,
      },
    });

    return {
      ...updatedUser,
      access_token: tokenPair.access_token,
      refresh_token: tokenPair.refresh_token,
    };
  }

  private async generateTokenPair(
    payload: ApiJwtPayload,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const access_token = jwt.sign(payload, atSecret, {
      expiresIn: atSecretExpires,
    });
    const refresh_token = jwt.sign(payload, rtSecret, {
      expiresIn: rtSecretExpires,
    });

    return { access_token, refresh_token };
  }

  async login(userParams: UserRequestDto): Promise<User> {
    const { name, password } = userParams;
    const user = await this.prisma.user.findFirst({
      where: {
        name: { equals: name },
      },
    });
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const tokenPair = await this.generateTokenPair({
        id: user.id,
        name: user.name,
      });

      await this.updateRtHash(user.id, tokenPair.refresh_token);

      return { ...user, ...tokenPair };
    } else {
      throw new UnauthorizedException('Email or password wrong!');
    }
  }

  async updateRtHash(userId: string, refresh_token: string): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refresh_token: hashedRefreshToken,
      } as Prisma.UserUpdateInput,
    });
  }

  async updateUserById(
    id: string,
    userParams: UserUpdataRequestDto,
  ): Promise<User> {
    try {
      const { name, password } = userParams;

      // Знаходимо користувача за ідентифікатором
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found!');
      }

      // Оновлюємо користувача з новими параметрами
      const updatedUser = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name,
          password,
        },
      });

      return updatedUser;
    } catch (error) {
      // Обробка можливих помилок
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async deleteUser(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

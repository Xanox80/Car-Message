import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repository/repositories/user.repository';
import { UserRequestDto, UserResponseDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async registerUser(userParams: UserRequestDto): Promise<UserResponseDto> {
    return this.userRepository
      .register(userParams)
      .then(UserResponseDto.mapFrom);
  }

  async login(userParams: UserRequestDto): Promise<UserResponseDto> {
    return this.userRepository.login(userParams).then(UserResponseDto.mapFrom);
  }
}

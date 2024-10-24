import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserResponseDto } from './dto';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ description: 'login' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: UserResponseDto })
  @Post('register')
  async registerUser(
    @Body() authParams: UserResponseDto,
  ): Promise<UserResponseDto> {
    return this.userService.registerUser(authParams);
  }

  @Post('login')
  @ApiOperation({ description: 'login' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: UserResponseDto })
  @Post('login')
  async loginUser(
    @Body() authParams: UserResponseDto,
  ): Promise<UserResponseDto> {
    return this.userService.login(authParams);
  }
}

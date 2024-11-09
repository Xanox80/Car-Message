import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto, UserResponseDto } from './dto';
import { RolesEnum } from 'src/enum/roles.enum';
import { UserUpdataRequestDto } from './dto/request/user-updata-request.dto';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Post('/update/:id')
  // @HttpUserRole(RolesEnum.ADMIN, RolesEnum.MEMBER)
  @ApiOperation({ description: 'UpdateUser' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: UserResponseDto })
  @ApiBearerAuth()
  async updateUser(
    @Param('id') id: string,
    @Body() userParams: UserUpdataRequestDto,
  ) {
    userParams.id = id;
    return this.userService.updateUserById(id, userParams);
  }

  @Delete('/delete/:id')
  // @HttpUserRole(RolesEnum.ADMIN, RolesEnum.MEMBER)
  @ApiOperation({ description: 'DeleteUser' })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  deleteUser(@Param('id') id: string) {
    this.userService.deleteUser(id);
  }
}

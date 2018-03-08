import { isEmpty } from 'lodash';
import {
  Get,
  Controller,
  Post,
  Patch,
  Body,
  UsePipes,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import {
  ApiUseTags,
  ApiOperation,
  ApiImplicitQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';

import {
  CreateUserDto,
  AccountDto,
  UserProfileDto,
  UserBaseInformation,
  PasswordDto,
  EmailDto,
  ResetPasswordDto,
  RegisterValidationDto,
} from './user.dto';

import { User } from '../utils/decorator';
import { UserValidationPipe } from './user.validationPipe';
import { UserService } from './user.service';

@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Post('/signin')
  @ApiOperation({title: '账号登陆', description: '登陆获取个人信息和jwtoken'})
  @UsePipes(new UserValidationPipe())
	async findAll(@Body() account: AccountDto) {
    return await this.userService.signIn(account);
  }

  @Post()
  @ApiOperation({title: '注册账号', description: '提交资料后只发送确认邮件'})
  @UsePipes(new UserValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.registerUser(createUserDto);
    return '邮件已发送，请检查邮箱';
  }

  @Post('/validate')
  @ApiOperation({title: '验证注册账号信息'})
  @UsePipes(new UserValidationPipe())
  async validate(@Body() account: RegisterValidationDto) {
    if (isEmpty(account)) throw new BadRequestException();
    await this.userService.validateUser(account);
  }

  @Get('/register')
  @ApiOperation({title: '生成用户账号', description: '从邮件中地址跳转后，创建真实的用户'})
  @ApiImplicitQuery({ name: 'userKey', description: '邮箱hash之后的key', required: true, type: String })
  async registerAccount(@Query('userKey') key: string) {
    if (!key) throw new NotFoundException('userKey not found');
    await this.userService.createUser(key);
  }

  @Get('/profile')
  @ApiOperation({title: '获取用户资料' })
  @ApiBearerAuth()
  async getProfile(@User() user: UserBaseInformation) {
    return await this.userService.getProfile(user);
  }

  @Patch('/profile')
  @ApiOperation({title: '更新用户资料' })
  @ApiBearerAuth()
  @UsePipes(new UserValidationPipe())
  async updateProfile(@Body() profile: UserProfileDto, @User() user: UserBaseInformation) {
    if (isEmpty(profile)) return;
    await this.userService.updateProfile(user, profile);
  }

  @Patch('/password')
  @ApiOperation({title: '更新密码' })
  @ApiBearerAuth()
  @UsePipes(new UserValidationPipe())
  async updatePassword(@Body() pwd: PasswordDto, @User() user: UserBaseInformation) {
    await this.userService.updatePassword(user, pwd);
  }

  @Post('/password')
  @ApiOperation({title: '申请重置密码' })
  @UsePipes(new UserValidationPipe())
  async resetPassword(@Body() mail: EmailDto) {
    await this.userService.sendResetMail(mail.email);
    return '邮件已发送，请检查邮箱';
  }

  @Post('/reset')
  @ApiOperation({title: '重置密码请求' })
  @UsePipes(new UserValidationPipe())
  async resetAccount(@Body() pwd: ResetPasswordDto) {
    await this.userService.resetAccount(pwd);
  }
}

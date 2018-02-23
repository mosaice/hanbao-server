import {
  Get,
  Controller,
  Post,
  Body,
  UsePipes,
  NotFoundException,
  Query
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiOperation,
  ApiImplicitQuery
} from '@nestjs/swagger'
import { UserValidationPipe } from './user.validationPipe';
import { UserService } from './user.service';
import { CreateUserDto, AccountDto } from './user.dto';
import { getAsync, redisClient } from '../utils/redis';
import * as qs from 'querystring'

@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Post('/signin')
  @ApiOperation({title: '账号登陆', description: '登陆获取个人信息和jwtoken'})
  @UsePipes(new UserValidationPipe())  
	async findAll(@Body() account: AccountDto) {
    return await this.userService.signIn(account);
  }

  @Post('/signup')
  @ApiOperation({title: '注册账号', description: '提交资料后只发送确认邮件'})
  @UsePipes(new UserValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    await this.userService.registerUser(createUserDto);
  }

  @Get('/register')
  @ApiOperation({title: '生成用户账号', description: '从邮件中地址跳转后，创建真实的用户'})  
  @ApiImplicitQuery({ name: 'userKey', description: '邮箱hash之后的key', required: true, type: String })
  async registerAccount(@Query('userKey') key: string) {
    const userString = await getAsync(qs.unescape(key));

    if (!userString) throw new NotFoundException('userKey not found');
    redisClient.del(qs.unescape(key));
    await this.userService.createUser(JSON.parse(userString));
  }
}

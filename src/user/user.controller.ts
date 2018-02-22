import {
  Get,
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  UsePipes,
  NotFoundException,
  Query
} from '@nestjs/common';
import { UserValidationPipe } from './user.validationPipe';
import { MailService } from './mail.service';
import { UserService } from './user.service';
import { CreateUserDto } from './user.create';
import { getAsync, redisClient } from '../utils/redis';
import * as qs from 'querystring'

@Controller('user')
export class UserController {
  constructor(
    private mailClient: MailService,
    private userService: UserService
  ) {}

	@Get()
	findAll(): any {
    this.mailClient.registerMail({ to: 'mosaice@qq.com', link: 'https://www.bilibili.com'});
    return  'send mail';
  }

  @Post()
  @UsePipes(new UserValidationPipe())
  async create(@Res() res, @Body() createUserDto: CreateUserDto): Promise<any> {
    await this.userService.registerUser(createUserDto);
    res.status(HttpStatus.CREATED).json({code: 200, message: 'success'});
  }

  @Get('/register')
  async registerAccount(@Query('userKey') key: string) {
    const userString = await getAsync(qs.unescape(key));

    if (!userString) throw new NotFoundException('userKey not found');
    redisClient.del(qs.unescape(key));
    return await this.userService.createUser(JSON.parse(userString));
  }
}

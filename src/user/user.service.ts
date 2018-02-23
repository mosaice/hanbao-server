import { Component, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { User } from '../../ORM/entity/User';
import { CreateUserDto, AccountDto } from './user.dto';
import * as bcrypt from 'bcryptjs';
import * as qs from 'querystring';
import { MailService } from './mail.service';
import { redisClient } from '../utils/redis';
import { AuthService } from '../auth/auth.service';
import { classToPlain } from "class-transformer";

@Component()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private mailClient: MailService,
    private authService: AuthService,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<any> {

    const checkUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', createUserDto)
      .orWhere('user.name = :name', createUserDto)
      .getOne();

    if (checkUser) throw new BadRequestException('Email or Name exist !');

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(createUserDto.email, salt);
    redisClient.set(hash, JSON.stringify(createUserDto), 'EX', 1800);

    this.mailClient.registerMail({
      to: createUserDto.email,
      link: `http://localhost:3000/api/v1/user/register?userKey=${qs.escape(hash)}`
    })
  }

  async createUser(createUserDto: CreateUserDto) {
    let user = await this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
  }

  async signIn(account: AccountDto) {
    const user = await this.userRepository.findOne({
      where: { email: account.email }
    });

    if (!user || !user.validatePassword(account.password))
      throw new BadRequestException('Email or Password error!');

    user.loginCount += 1;
    await this.userRepository.updateById(user.id, {
      loginCount: user.loginCount
    });

    let { id, password, ...other } = user;

    const information = classToPlain(other);
    const jwtoken = this.authService.createToken(information);

    return {
      ...information,
      jwtoken
    };

  }
}
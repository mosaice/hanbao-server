import { Component, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import * as qs from 'querystring';

import { MailService } from '../shared/mail.service';
import { BcryptService } from '../shared/bcrypt.service';
import { RedisService } from '../shared/redis.service';
import { AuthService } from '../auth/auth.service';

import { User } from '../../ORM/entity/User';

import {
  CreateUserDto,
  AccountDto,
  UserProfileDto,
  UserBaseInformation,
  PasswordDto,
  ResetPasswordDto,
  RegisterValidationDto
} from './user.dto';

@Component()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private mailClient: MailService,
    private authService: AuthService,
    private bcrypt: BcryptService,
    private redis: RedisService
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<any> {

    const checkUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', createUserDto)
      .orWhere('user.name = :name', createUserDto)
      .getOne();

    if (checkUser) throw new BadRequestException('Email or Name exist !');
    
    const hash = this.bcrypt.hash(createUserDto.email);
    this.redis.redisClient.set(hash, JSON.stringify(createUserDto), 'EX', 1800);

    this.mailClient.registerMail({
      to: createUserDto.email,
      link: `http://localhost:3000/api/v1/user/register?userKey=${qs.escape(hash)}`
    })
  }

  async createUser(key: string) {
    const userString = await this.redis.getAsync(qs.unescape(key));

    if (!userString) throw new NotFoundException('userKey not found');

    const createUserDto = JSON.parse(userString);

    this.redis.redisClient.del(qs.unescape(key));

    const user = await this.userRepository.create(createUserDto);
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

    const { password, ...info } = user;

    const jwtoken = this.authService.createToken({ id: info.id, email: info.email, name: info.name });
    
    return {
      ...info,
      jwtoken
    };

  }

  async getProfile(user: UserBaseInformation) {
    return await this.userRepository.findOneById(user.id, {
      select: ['id', 'email', 'name', 'description', 'avator', 'sex', 'loginCount']
    });
  }

  async updateProfile(info: UserBaseInformation, profile: UserProfileDto) {
    return await this.userRepository.updateById(info.id, profile);
  }

  async updatePassword(info: UserBaseInformation, pwd: PasswordDto) {
    const user = await this.userRepository.findOneById(info.id);

    if (!user || !user.validatePassword(pwd.oldPassword) || user.validatePassword(pwd.newPassword))
      throw new BadRequestException('Password invalid!');

    await this.userRepository.updateById(user.id, {
      password: this.bcrypt.hash(pwd.newPassword)
    });

    // user.password = pwd.newPassword;
    // await this.userRepository.save(user);
  }

  async sendResetMail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email }
    });

    if (user) {
      const hash = this.bcrypt.hash(email);
      this.redis.redisClient.set(hash, email, 'EX', 1800);
      this.mailClient.passwordMail({
        to: email,
        link: `http://localhost:4200/user/reset?userKey=${qs.escape(hash)}`
      })
    }
  }

  async resetAccount(pwd: ResetPasswordDto) {
    const email = await this.redis.getAsync(qs.unescape(pwd.userKey));

    if (!email) throw new NotFoundException('userKey not found');
    this.redis.redisClient.del(qs.unescape(pwd.userKey));
    await this.userRepository.update({ email },{
      password: this.bcrypt.hash(pwd.password)
    });
  }

  async validateUser(account: RegisterValidationDto) {
    // const checkUser = await this.userRepository
    //   .createQueryBuilder('user')
    //   .where('user.email = :email', account.email || '')
    //   .orWhere('user.name = :name', account.name)
    //   .getOne();

    let checkMail, checkName;
    if (account.email) {
      checkMail = await this.userRepository.findOne({
        where: { email: account.email }
      })

      if (checkMail) throw new BadRequestException('Email or Name exist !')
    }

    if (account.name) {
      checkName = await this.userRepository.findOne({
        where: { name: account.name }
      })

      if (checkName) throw new BadRequestException('Email or Name exist !')
    }
  }
}
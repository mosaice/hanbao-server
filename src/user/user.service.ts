import { Component, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { User } from '../../ORM/entity/User';
import { CreateUserDto } from './user.create';
import * as bcrypt from 'bcryptjs';
import * as qs from 'querystring';
import { MailService } from './mail.service';
import { redisClient } from '../utils/redis';
import { AuthService } from '../auth/auth.service';

@Component()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private mailClient: MailService,
    private authService: AuthService
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
    user = await this.userRepository.save(user);

    (user as any) = await this.userRepository.findOneById(user.id, {
      select: ['email', 'name', 'description', 'avator', 'sex']
    });
    
    const jwtoken = this.authService.createToken({...user});

    return {
      ...user,
      jwtoken
    };
  }
}
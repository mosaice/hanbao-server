import { Get, Controller,  } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
	@Get('/authorized')
	async root():Promise<any> {
    return  await this.auth.createToken();
  }
	@Get('/authorized/1')
	findOne():string {
    return 'test';
  }
}

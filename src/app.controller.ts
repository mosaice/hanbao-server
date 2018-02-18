import { Get, Controller,  } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller('test')
export class AppController {
  constructor(private readonly auth: AuthService) {}
	@Get()
	async root():Promise<any> {
    return  await this.auth.createToken();
  }
}

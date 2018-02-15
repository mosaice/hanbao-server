import { Get, Controller,  } from '@nestjs/common';

@Controller('test')
export class AppController {
	@Get()
	root(): string {
    return 'Hello World!';
  }
}

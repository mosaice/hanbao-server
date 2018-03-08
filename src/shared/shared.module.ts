import {
  Module,
  Global,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { BcryptService } from './bcrypt.service';
import { RedisService } from './redis.service';

@Global()
@Module({
  components: [MailService, BcryptService, RedisService],
  exports: [MailService, BcryptService, RedisService],
})
export class SharedModule {}
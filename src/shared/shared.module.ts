import {
  Module,
  Global
} from '@nestjs/common';
import { JSONInterceptor } from './json.interceptor'

@Global()
@Module({
  components: [MailService],
  exports: [MailService]
})
export class SharedModule {}
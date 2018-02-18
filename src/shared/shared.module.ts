import {
  Module,
  Global
} from '@nestjs/common';
import { MailService } from './mail.service';

@Global()
@Module({
  components: [MailService],
  exports: [MailService]
})
export class SharedModule {}
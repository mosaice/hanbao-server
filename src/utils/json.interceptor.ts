import { Interceptor, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { isString } from 'lodash';
import 'rxjs/add/operator/map';

@Interceptor()
export class JSONInterceptor implements NestInterceptor {
  intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    return stream$.map(data => {
      if (!data) return { statusCode: 200, message: 'success' };
      return isString(data) ? { statusCode: 200, message: data } : { statusCode: 200, message: 'success', data };
    });
  }
}
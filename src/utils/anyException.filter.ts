import { ExceptionFilter, Catch } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception, response) {
    console.log(exception);
    response
      .status(200)
      .json({
        statusCode: exception.response ? exception.response.statusCode : 500,
        error: exception.response ? exception.response.error : 'Internal server error',
        message: exception.response ? exception.response.message : exception.message
      });
  }
}
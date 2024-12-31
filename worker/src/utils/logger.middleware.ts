import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const hostname = require('os').hostname();
    const referer = request.get('referer') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `Method: ${method} \n Url: ${originalUrl} \n StatusCode: ${statusCode} \n ContentLength: ${contentLength} \n UserAgent: ${userAgent} \n Referer: ${referer} \n Hostname: ${hostname} \n Ip: ${ip}`,
      );
    });

    next();
  }
}
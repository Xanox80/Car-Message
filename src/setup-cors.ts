import { INestApplication } from '@nestjs/common';
import { getConfig } from './config';

const isDevelopment = getConfig().node_env === 'development';
const allowedOrigins = getConfig().allowedOrigins;
export function setupCors(app: INestApplication) {
  const originList = allowedOrigins?.split(',');

  if (!isDevelopment) {
    app.enableCors({
      origin: (origin, callback) => {
        if (!origin || originList?.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });
  } else {
    app.enableCors();
  }
}

import { getSafeEnv } from 'utils';
import * as env from 'env-var';

export const getConfig = () => {
  return {
    node_env: getSafeEnv('NODE_ENV'),
    allowedOrigins: getSafeEnv('ALLOWED_ORIGINS'),

    databaseURI: getSafeEnv('DATABASE_URI'),
    port: getSafeEnv('PORT'),

    stripe_token: getSafeEnv('STRIPE_TOKEN'),

    redis_host: getSafeEnv('REDIS_HOST'),
    redis_port: getSafeEnv('REDIS_PORT'),
    redis_password: getSafeEnv('REDIS_PASSWORD'),

    jwt_secret: getSafeEnv('JWT_SECRET'),
    jwt_expires: getSafeEnv('JWT_EXPIRES'),

    external_auth_token: getSafeEnv('EXTERNAL_AUTH_TOKEN'),

    csipp_base_url: getSafeEnv('CSIPP_BASE_URL'),
    csipp_client_secret: getSafeEnv('CSIPP_CLIENT_SECRET'),
    csipp_grant_type: getSafeEnv('CSIPP_GRANT_TYPE'),
    csipp_origin: getSafeEnv('CSIPP_ORIGIN'),
    csipp_user_agent: getSafeEnv('CSIPP_USER_AGENT'),
  };
};
export const getAuthSecret = () => ({
  atSecret: env.get('AT_SECRET').required().asString(),
  atSecretExpires: env.get('AT_SECRET_EXPIRES').required().asString(),
  rtSecret: env.get('RT_SECRET').required().asString(),
  rtSecretExpires: env.get('RT_SECRET_EXPIRES').required().asString(),
});

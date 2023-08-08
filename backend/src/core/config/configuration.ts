export default () => ({
  name: 'nestjs app',
  port: parseIntEnv('PORT'),
  mongodbUri: parseStringEnv('DATABASE_URI'),
  appLogPath: parseStringEnv('APP_LOG_PATH'),
  errLogPath: parseStringEnv('ERR_LOG_PATH'),
  tokenValidity: 1000 * 60 * 60 * 8,
  refreshTokenValidity: 1000 * 60 * 60 * 24 * 7,
  secret: parseStringEnv('SECRET'),
  prod: parseBoolEnv('PRODUCTION'),
  requestResponseLogging: parseBoolEnv('REQUEST_RESPONSE_LOGGING')
});

const parseIntEnv = (name: string) => {
  const value: string = process.env[name];

  const int: number = parseInt(value);

  if (isNaN(int)) {
    throw new Error(`Invalid env ${name}`);
  }

  return int;
};

const parseStringEnv = (name: string) => {

  const value: string = process.env[name];

  if (!value) {
    throw new Error(`Invalid env ${name}`);
  }

  return value;
};

const parseBoolEnv = (name: string) => {

  return (process.env[name] === "true")

}
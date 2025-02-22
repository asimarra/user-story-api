export default () => ({
  envMode: process.env.ENV_MODE ?? 'dev',
  port: +(process.env.PORT ?? 3000),
  database: {
    connectionString:
      process.env.MONGO_URL ?? 'mongodb://localhost:27017/user-story-api',
  },
  jwtSecret: process.env.JWT_SECRET ?? 'secret-for-dev-2025@@',
});

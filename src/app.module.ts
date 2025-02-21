import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import environmentConfig from './config/environments.config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [environmentConfig],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get('database.connectionString'),
      }),
      inject: [ConfigService],
    }),

    // Modules
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

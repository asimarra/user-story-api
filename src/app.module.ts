import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import environmentConfig from './config/environments.config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './contexts/users/user.module';
import { AuthModule } from './contexts/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from './contexts/product/infrastructure/product.module';
import { InvoiceModule } from './contexts/invoice/infrastructure/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [environmentConfig],
    }),

    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get('database.connectionString'),
      }),
      inject: [ConfigService],
    }),

    // Modules
    UserModule,
    AuthModule,
    ProductModule,
    InvoiceModule,
  ],
  controllers: [],
})
export class AppModule {}

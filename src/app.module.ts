import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import authConfig from './config/auth.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal:true,
 
      load:[
        appConfig,
        databaseConfig,
        authConfig
      ],
      envFilePath:['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass:TypeOrmConfigService
    }),

    AuthModule,
    UserModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

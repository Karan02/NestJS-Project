import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule,ConfigService } from '@nestjs/config';

import { AppDataSource } from '../data-source';
const cookieSession =  require('cookie-session');

@Module({
 
  imports: [
     ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:`.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory:(config:ConfigService) =>{
    //     return {
    //       type:'sqlite',
    //       database:config.get<string>('DB_NAME'),
    //       synchronize:true, //for only development(production not recommendable), create/delete columns according to changes in entity (normally we write migration)
    //       entities: [User,Report],
    //     }
    //   }
    // }),
  //   TypeOrmModule.forRoot({
  //   type:'sqlite',
  //   database: 'db.sqlite',
  //   entities:[User, Report],
  //   synchronize: true, //for only development, create new columns according to changes in entity (normally we write migration)
  // }),
  UsersModule, 
  ReportsModule],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_PIPE, //global pipe
    useValue:     new ValidationPipe({
      whitelist:true // no additional properties will be considered in request body api
    })
  }],
})
export class AppModule {
  constructor(private configService:ConfigService){}
  // global middleware
  configure(consumer: MiddlewareConsumer){
    consumer.apply(
      cookieSession({
        keys: this.configService.get('COOKIE_KEY')
    })).forRoutes('*');
  }
}

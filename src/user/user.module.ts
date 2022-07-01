import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserCrudService } from './user.crudservice';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserCrudService,UserService],
  exports:[UserCrudService]
})
export class UserModule {}

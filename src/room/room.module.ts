import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { RoomController } from './room.controller';
import { Room } from './room.entitty';
import { RoomService } from './room.service';

@Module({
  controllers: [RoomController],
  providers: [RoomService],
  imports:[UserModule,TypeOrmModule.forFeature([Room])]

})
export class RoomModule {}

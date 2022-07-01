import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { UserModule } from 'src/user/user.module';
import { ProfielCrudService } from './profile.crudservice';

@Module({
  providers: [ProfileService,ProfielCrudService],
  controllers: [ProfileController],
  exports:[ProfielCrudService],
  imports:[UserModule,TypeOrmModule.forFeature([Profile])]
})
export class ProfileModule {}

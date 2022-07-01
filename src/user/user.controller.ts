import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post,Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProfileUpdateDto } from 'src/profile/dto/profile.dto';
import { PebbleAddDto, PebbleTransferDto } from './dto/user.dto';
import { UserCrudService } from './user.crudservice';
import { UserService } from './user.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('User')
@Controller({
    path: 'user',
    version: '1',
  })
export class UserController {
    
    constructor(private service:UserService){}

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async get(@Param('id') id:string){
        return this.service.getUser(id);
    }

    @Get('address/:address')
    @HttpCode(HttpStatus.OK)
    async getByAccountAddress(@Param('address') address:string){
        return this.service.getUserByAccountAddress(address);
    }

    @Post('pebble/add')
    @HttpCode(HttpStatus.OK)
    async addPebble(@Body() body:PebbleAddDto,@Request() request){
        return this.service.buyPebble(body);
    }

    @Post('pebble/transfer')
    @HttpCode(HttpStatus.OK)
    async transferPebble(@Body() body:PebbleTransferDto,@Request() request){
        return  this.service.transferPebble(body);
    }

}

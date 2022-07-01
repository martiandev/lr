import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { request } from 'http';
import { AuthRequestDto } from 'src/auth/dto/auth.dto';
import { ProfileUpdateDto } from './dto/profile.dto';
import { ProfielCrudService } from './profile.crudservice';
import { ProfileService } from './profile.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Profile')
@Controller({
    path: 'profile',
    version: '1',
  })
export class ProfileController {

    constructor(private service:ProfileService){}

    @Post()
    @HttpCode(HttpStatus.OK)
    async update(@Body() body:ProfileUpdateDto,@Request() request){
        return this.service.update(body);
    }

    
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async get(@Param('id') id:string){
        return this.service.getByUserId(id);
    }
}

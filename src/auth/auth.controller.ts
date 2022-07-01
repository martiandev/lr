import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import path from 'path';
import { AuthService } from './auth.service';
import { AuthRequestDto } from './dto/auth.dto';

@ApiTags('Authentication')
@Controller({
        path:'auth',
        version:'1'
    })
export class AuthController {
    
    constructor(public service: AuthService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async login(@Body() body:AuthRequestDto){
        return this.service.authenticate(body);
    }



}

import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCrudService } from 'src/user/user.crudservice';
import { User } from 'src/user/user.entity';
import { AuthRequestDto, AuthResponseDto } from './dto/auth.dto';

@Injectable()
export class AuthService {

    constructor(
            private userCrudService:UserCrudService,
            private jwtService:JwtService
        ){}

    async authenticate(request:AuthRequestDto):Promise<AuthResponseDto>{
        var result = new AuthResponseDto();
        var isExisting = await this.userCrudService.getByAccountAddress(request.accountAddress);

        if(!isExisting){
            var user = new User();
            user.accountAddress = request.accountAddress;
            user.pebbleCount = 0;
            user.onLineStatus = 0;
            var newUser = await user.save();
            result.user = newUser;
            result.statusCode = HttpStatus.CREATED;
            result.message = "New User was created";
        }
        else{
            result.user = isExisting;
            result.statusCode = HttpStatus.OK;
            result.message = "Old User was retrieved";
        }
        result.token = await this.jwtService.sign({
            id: result.user.id,
        });
        return result;
    }



}

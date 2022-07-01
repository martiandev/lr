import { HttpStatus, Injectable } from '@nestjs/common';
import { PebbleAddDto, PebbleTransferDto, PebbleTransferResponseDto, UserResponseDto } from './dto/user.dto';
import { UserCrudService } from './user.crudservice';
import { User } from './user.entity';

@Injectable()
export class UserService {

    constructor(private userCrudService:UserCrudService){}

    async getUser(id:string):Promise<UserResponseDto>{
        var result = new UserResponseDto();
        var isExisting = await this.userCrudService.getById(id);
        if(isExisting)
        {
            result.user = isExisting;
            result.message = "User found";
            result.statusCode = HttpStatus.OK;
        } else {
            result.message = "User not found";
            result.statusCode = HttpStatus.BAD_REQUEST;
        }

        return result;
    }

    async getUserByAccountAddress(accountAddress:string):Promise<UserResponseDto>{
        var result = new UserResponseDto();
        var isExisting = await this.userCrudService.getByAccountAddress(accountAddress);
        if(isExisting)
        {
            result.user = isExisting;
            result.message = "User found";
            result.statusCode = HttpStatus.OK;
        } else {
            result.message = "User not found";
            result.statusCode = HttpStatus.BAD_REQUEST;
        }

        return result;
    }

    async transferPebble(dto:PebbleTransferDto):Promise<PebbleTransferResponseDto>{
        var result = new PebbleTransferResponseDto();
        var isReceiverExisting = await this.userCrudService.getById(dto.receiver);
        var isSourceExisting = await this.userCrudService.getById(dto.source);

        if(isReceiverExisting&&isSourceExisting) {
          if(isSourceExisting.pebbleCount>dto.amount){
            isReceiverExisting.pebbleCount = isReceiverExisting.pebbleCount + dto.amount;
            isSourceExisting.pebbleCount = isReceiverExisting.pebbleCount - dto.amount;
            await isReceiverExisting.save();
            await isSourceExisting.save();
            result.amount = dto.amount;
            result.receiver = dto.receiver;
            result.message = "Successfully transferred Pebbles";
            result.statusCode = HttpStatus.OK;
          }else{
            result.message = "Insufficient pebbles";
            result.statusCode = HttpStatus.BAD_REQUEST;
          }
   
        } else {
            result.message = "One or both users not found";
            result.statusCode = HttpStatus.BAD_REQUEST;
        }

        return result;
    }

    async buyPebble(dto:PebbleAddDto):Promise<PebbleTransferResponseDto>{
        var result = new PebbleTransferResponseDto();
        var isReceiverExisting = await this.userCrudService.getById(dto.receiver);
        if(isReceiverExisting)
        {
            isReceiverExisting.pebbleCount = isReceiverExisting.pebbleCount + dto.amount;
            await isReceiverExisting.save();
            result.amount = dto.amount;
            result.receiver = dto.receiver;
            result.message = "Successfully transferred Pebbles";
            result.statusCode = HttpStatus.OK;
        } else {
            result.message = "Receiver not found";
            result.statusCode = HttpStatus.BAD_REQUEST;
        }

        return result;
    }
}

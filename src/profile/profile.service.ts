import { HttpStatus, Injectable } from '@nestjs/common';
import { UserCrudService } from 'src/user/user.crudservice';
import { ProfileResponseDto, ProfileUpdateDto, ProfileUpdateResponseDto } from './dto/profile.dto';
import { ProfielCrudService } from './profile.crudservice';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {

    constructor(
            private service:ProfielCrudService,
            private userCrudService:UserCrudService
        ){}

    async getByUserId(id:string){
        var profileResponse = new ProfileResponseDto();
        var isExisting = await this.userCrudService.getById(id);
        if(isExisting)
        {
            if(isExisting.profile)
            {
                profileResponse.profile = isExisting.profile;
                profileResponse.message = "Profile retrieved";
                profileResponse.statusCode = HttpStatus.OK;
            
            }else{
                profileResponse.message = "No Profile for this user";
                profileResponse.statusCode = HttpStatus.BAD_REQUEST;
            }
        }else{
            profileResponse.message = "User not found";
            profileResponse.statusCode = HttpStatus.BAD_REQUEST;
        }

        return profileResponse;
        
    } 

    async update(dto:ProfileUpdateDto):Promise<ProfileUpdateResponseDto>{
        var result = new ProfileUpdateResponseDto();
        
        var isExisting = await this.userCrudService.getById(dto.userId);
        if(!isExisting){
            result.statusCode = HttpStatus.BAD_REQUEST;
            result.message = "User does not exist";
        }else{
            
    
            if(isExisting.profile==null)
            {
                var profile = new Profile();
                profile.imageUrl = dto.imageUrl;
                profile.name = dto.name;
                await profile.save();
                isExisting.profile = profile;
                await isExisting.save();
                result.statusCode = HttpStatus.CREATED;
                result.message = "New Profile has been added";
            }else{
                var profile = isExisting.profile;
                profile.imageUrl = dto.imageUrl;
                profile.name = dto.name;
                await profile.save();
                isExisting.profile = profile;
                await isExisting.save();
                result.statusCode = HttpStatus.OK;
                result.message = "Profile has been updated";
            }
            result.user = isExisting;
        }

        return result;
   }



}

import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse } from "src/common/base-response";
import { User } from "src/user/user.entity";
import { Profile } from "../profile.entity";

export class ProfileUpdateDto{
    @ApiProperty({example:"8fa64cff-1c79-40c3-abd9-ac3987126066"})
    userId:string;
    @ApiProperty({example:"LR-Admin"})
    name:string;
    @ApiProperty({example:"https://firebasestorage.googleapis.com/v0/b/netwync-test.appspot.com/o/test-img.png?alt=media&token=b1f2a498-3e67-46ea-80e0-13db1ed69c59"})
    imageUrl:string;

}

export class ProfileUpdateResponseDto extends BaseResponse{
    user:User;
}

export class ProfileResponseDto extends BaseResponse{
    profile:Profile;
}
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { Transform } from "class-transformer";
import { BaseResponse } from "src/common/base-response";
import { User } from "src/user/user.entity";

export class AuthRequestDto{

    @ApiProperty({example:"xty323Wh3gh39dlcwqp"})
    accountAddress:string;

}

export class AuthResponseDto extends BaseResponse{
    
    user:User;
    token:string;

}
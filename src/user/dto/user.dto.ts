import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse } from "src/common/base-response";
import { User } from "../user.entity";

export class UserResponseDto extends BaseResponse{
    user:User;
}

export class PebbleTransferResponseDto extends BaseResponse{
    amount:number;
    receiver:string;
}

export class PebbleAddDto{
    @ApiProperty({example:1})
    amount:number;
    @ApiProperty({example:"2a306849-c535-42be-bce4-515899e64f32"})
    receiver:string;
}

export class PebbleTransferDto{
    @ApiProperty({example:1})
    amount:number;
    @ApiProperty({example:"2a306849-c535-42be-bce4-515899e64f32"})
    source:string;
    @ApiProperty({example:"ceb430be-d0e8-45eb-8e23-921f0a0a4d10"})
    receiver:string;
}
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserCrudService extends TypeOrmCrudService<User>{

    constructor(
        @InjectRepository(User)
        private destinationRepository:Repository<User>
    ){
        super(destinationRepository)
    }

    async getById(id:string):Promise<User>{
        var result = await this.findOne({
            relations:['profile'],
            where:{
                id:id
            },
        });

    

        return result;
    }
    async getByAccountAddress(accountAddress:string):Promise<User>{
        var result = await this.findOne({
            where:{
                accountAddress:accountAddress
            }
            
            
        });
        return result;
    }
    
}
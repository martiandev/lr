import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { Profile } from "./profile.entity";

@Injectable()
export class ProfielCrudService extends TypeOrmCrudService<Profile>{
    constructor(
        @InjectRepository(Profile) private destinationRepository:Repository<Profile>
    ){
        super(destinationRepository)
    }
}
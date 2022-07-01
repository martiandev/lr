import { User } from "src/user/user.entity";
import { AfterLoad, BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Profile extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @OneToOne(()=>User,user=>user.profile)
    user:User;
    @Column()
    signature:string;
    @Column()
    name:string;
    @Column()
    imageUrl:string;
    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;


  __entity?:string;
    
    @AfterLoad()
    setEntityName(){
        this.__entity = this.constructor.name;
    }

}
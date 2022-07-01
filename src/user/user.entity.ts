import { profile } from "console";
import { Profile } from "src/profile/profile.entity";
import { Room } from "src/room/room.entitty";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn, AfterLoad, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:String;

    @Column()
    accountAddress:string;
    
    @Column()
    pebbleCount:number;
    
    @Column()
    onLineStatus:number;



    // @ManyToOne(() => Room, room => room.author)
    // myRooms: Room[];


    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    
    @OneToOne(() => Profile,profile=>profile.user)
    @JoinColumn()
    profile:Profile;
    
    __entity?:string;
    
    @AfterLoad()
    setEntityName(){
        this.__entity = this.constructor.name;
    }

}
import { User } from "src/user/user.entity";
import { AfterLoad, BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Room extends BaseEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @Column()
    name:string;
    @Column()
    about:string;
    @Column()
    rules:string;
    @Column()
    voteOutRatio:number;
    
    // @OneToMany(() => User, user => user.myRooms)
    // author: User;

    @ManyToMany(() => User)
    @JoinTable()
    watchers: User[];

    @Column()
    price:number;
    @Column()
    isPrivate:boolean;
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
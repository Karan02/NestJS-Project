import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate,OneToMany } from "typeorm";
import { Report } from "../reports/report.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email:string;
    
    @Column()
    password:string;

    @Column({ default: true })
    admin: boolean;

    // association donot fetch associated properties by default
    // function below is just there to solve circular dependency issue, second argument helps to get back to current entity
    @OneToMany(() => Report,(report) => report.user)
    reports: Report[];

    @AfterInsert()
    logInsert(){
        console.log(`Inserted User with id ${this.id}`);
    }

    @AfterUpdate()
    logUpdate(){
        console.log(`Updated User with id ${this.id}`);
    }
    
    @AfterRemove()
    logRemove(){
        console.log(`Removed User with id ${this.id}`);
    }
}
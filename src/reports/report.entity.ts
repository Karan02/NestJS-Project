import {Entity, Column,  PrimaryGeneratedColumn,ManyToOne } from 'typeorm'
import { User } from 'src/users/user.entity';
@Entity()
// under the hood, entity creates repository for us
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    lng: number;

    @Column()
    lat: number;

    @Column()
    mileage: number;

    // association donot fetch associated properties by default
    // function below is just there to solve circular dependency issue, second argument helps to get back to current entity
    @ManyToOne(() => User,(user) => user.reports)
    user: User;

}
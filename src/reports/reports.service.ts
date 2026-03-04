import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Report) private repo: Repository<Report>
    ){}

    createEstimate({make,model,lat,lng,year,mileage}: GetEstimateDto){
        //business logic - search through all reports we have, find reports for the same make/model,
        // within +/- 5 degress, within 3 years, order by closest mileage, top 3 reports

        //prerequisite is sql
        return this.repo.createQueryBuilder()
        .select('AVG(price)','price')
        .where('make = :make',{ make: make }) // protect yourself from sql injection, by not passing data directly with backticks and ${} 
        .andWhere('model = :model',{ model:model}) //chaining plain where again will override previous where
        .andWhere('lng - :lng BETWEEN -5 AND 5',{ lng })
        .andWhere('lat - :lat BETWEEN -5 AND 5',{ lat })
        .andWhere('year - :year BETWEEN -3 AND 3',{ year })
        .andWhere('approved IS TRUE')
        .orderBy('ABS(mileage - :mileage)','DESC') // order by does not take parameter as second argument
        .setParameters({mileage})
        .limit(3)
        .getRawOne();
    }

    create(reportDto: CreateReportDto, user:User){
        const report = this.repo.create(reportDto);
        report.user = user; // this is how we set association
        return this.repo.save(report);
    }
    async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOne({ where: { id: parseInt(id) } });
        if(!report){
            throw new NotFoundException('report not found');
        }
        report.approved = approved;
        return this.repo.save(report);
    }
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column()
    name: string = '';

    @Column()
    ticker: string = '';

    @Column()
    ceo: string = '';

    @Column()
    companyType: string = '';

    @Column()
    industry: string = '';

    @Column()
    location: string = '';

    @Column()
    marketCap: string = '';

    @Column()
    employees: number = 0;

    @Column()
    profitable: boolean = false;

    @Column()
    profits: string = '';

    @Column()
    revenue: string = '';

    @Column()
    sector: string = '';

    @Column()
    website: string = '';
}

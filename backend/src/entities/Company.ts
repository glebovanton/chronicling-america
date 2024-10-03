import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: "fortune500_2024" })
export class Company {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column('int')
    rank: number | undefined;

    @Column('varchar', { length: 255 })
    company: string | undefined;

    @Column('varchar', { length: 255 })
    ticker: string | undefined;

    @Column('varchar', { length: 255 })
    sector: string | undefined;

    @Column('varchar', { length: 255 })
    industry: string | undefined;

    @Column('boolean')
    profitable: boolean | undefined;

    @Column('boolean')
    founder_is_ceo: boolean | undefined;

    @Column('boolean')
    femaleceo: boolean | undefined;

    @Column('float')
    growth_in_jobs: number | undefined;

    @Column('boolean')
    change_in_rank: boolean | undefined;

    @Column('boolean')
    gained_in_rank: boolean | undefined;

    @Column('boolean')
    dropped_in_rank: boolean | undefined;

    @Column('boolean')
    newcomer_to_the_fortune500: boolean | undefined;

    @Column('boolean')
    global500: boolean | undefined;

    @Column('boolean')
    worlds_most_admired_companies: boolean | undefined;

    @Column('boolean')
    best_companies_to_work_for: boolean | undefined;

    @Column('int')
    number_of_employees: number | undefined;

    @Column('float')
    marketcap_march28_m: number | undefined;

    @Column('float')
    revenues_m: number | undefined;

    @Column('float')
    revenuepercentchange: number | undefined;

    @Column('float')
    profits_m: number | undefined;

    @Column('float')
    profitspercentchange: number | undefined;

    @Column('float')
    assets_m: number | undefined;

    @Column('varchar', { length: 255 })
    ceo: string | undefined;

    @Column('varchar', { length: 255 })
    country: string | undefined;

    @Column('varchar', { length: 255 })
    headquarterscity: string | undefined;

    @Column('varchar', { length: 255 })
    headquartersstate: string | undefined;

    @Column('text')
    website: string | undefined;

    @Column('varchar', { length: 255 })
    companytype: string | undefined;

    @Column('text')
    footnote: string | undefined;

    @Column('float')
    marketcap_updated_m: number | undefined;

    @Column('date')
    updated: Date | undefined;
}

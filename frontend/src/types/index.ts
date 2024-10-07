export interface Company {
    id?: number;
    rank?: number;
    company?: string;
    ticker?: string;
    sector?: string;
    industry?: string;
    profitable?: boolean;
    founder_is_ceo?: boolean;
    femaleceo?: boolean;
    growth_in_jobs?: number;
    change_in_rank?: boolean;
    gained_in_rank?: boolean;
    dropped_in_rank?: boolean;
    newcomer_to_the_fortune500?: boolean;
    global500?: boolean;
    worlds_most_admired_companies?: boolean;
    best_companies_to_work_for?: boolean;
    number_of_employees?: number;
    marketcap_march28_m?: number;
    revenues_m?: number;
    revenuepercentchange?: number;
    profits_m?: number;
    profitspercentchange?: number;
    assets_m?: number;
    ceo?: string;
    country?: string;
    headquarterscity?: string;
    headquartersstate?: string;
    website?: string;
    companytype?: string;
    footnote?: string;
    marketcap_updated_m?: number;
    updated?: Date;
}

export type CompanyDTO = Omit<Company, 'id'>;

export interface CompanyState {
    searchValue: string;
    companiesByKey: Company[] | null;
    company: Company | null;
    cachedCompanies: Company[] | null;
    isCachedCompaniesFetched: boolean;

}

export interface Column {
    key: string;
    label: string;
}

export enum Sort {
    asc = 'asc',
    desc = 'desc',
    
}

import { Company } from "src/entities/Company";

export function mapCompanyResponse(company: Company): Company {
    return {
        id: company.id,
        rank: company.rank,
        company: company.company,
        ticker: company.ticker,
        sector: company.sector,
        industry: company.industry,
        profitable: company.profitable,
        founder_is_ceo: company.founder_is_ceo,
        femaleceo: company.femaleceo,
        growth_in_jobs: company.growth_in_jobs,
        change_in_rank: company.change_in_rank,
        gained_in_rank: company.gained_in_rank,
        dropped_in_rank: company.dropped_in_rank,
        newcomer_to_the_fortune500: company.newcomer_to_the_fortune500,
        global500: company.global500,
        worlds_most_admired_companies: company.worlds_most_admired_companies,
        best_companies_to_work_for: company.best_companies_to_work_for,
        number_of_employees: company.number_of_employees,
        marketcap_march28_m: company.marketcap_march28_m,
        revenues_m: company.revenues_m,
        revenuepercentchange: company.revenuepercentchange,
        profits_m: company.profits_m,
        profitspercentchange: company.profitspercentchange,
        assets_m: company.assets_m,
        ceo: company.ceo,
        country: company.country,
        headquarterscity: company.headquarterscity,
        headquartersstate: company.headquartersstate,
        website: company.website,
        companytype: company.companytype,
        footnote: company.footnote,
        marketcap_updated_m: company.marketcap_updated_m,
        updated: company.updated
    };
}

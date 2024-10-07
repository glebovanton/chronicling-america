import { defineStore } from 'pinia';
import axios from 'axios';
import { inflate } from 'pako';
import { useToast } from 'vue-toast-notification';
import { type CompanyState, type Company } from '@/types';

const apiUrlPrefix = `${import.meta.env.VITE_C_HOST}:${import.meta.env.VITE_C_BASE_PORT}/api/`;
const $toast = useToast();

export const useCompanyStore = defineStore('company', {
  state: (): CompanyState => ({
    searchValue: '',
    companiesByKey: null,
    company: null,
    cachedCompanies: null,
    isCachedCompaniesFetched: false,

  }),

  actions: {
    setCompaniesByKey (data: Company[] | null): void {
      this.companiesByKey = data;
    },

    async fetchCompaniesByKey (key: string):Promise<void> {
      try {
        const { data } = await axios.get(`${apiUrlPrefix}companiesByKey?search=${key}`);

        if (data) {
          this.setCompaniesByKey(data);
        }
      } catch (error) {
        $toast.error('Error fetching companies by key');
        console.error('Error fetching companies by key:', error);
      }
    },

    async fetchCompany (id: string):Promise<void>  {
      try {
        const { data } = await axios.get(`${apiUrlPrefix}companies/${id}`);

        if (data) {
          this.company = data;
        }
      } catch (error) {
        $toast.error('Error fetching companies');
        console.error('Error fetching companies:', error);
      }
    },

    async decompressGzip (data: ArrayBuffer): Promise<Uint8Array> {
      return inflate(new Uint8Array(data));
    },

    async fetchCachedCompanies (): Promise<void> {
      if (!this.isCachedCompaniesFetched) {
        try {
          const response = await axios.get('/chronicling-america-fe/companies.json.gz', {
            responseType: 'arraybuffer',
          });

          const arrayBuffer: ArrayBuffer = response.data;

          if (arrayBuffer) {
            const decompressedData = new TextDecoder('utf-8').decode(await this.decompressGzip(arrayBuffer));
            this.cachedCompanies = JSON.parse(decompressedData);
            this.isCachedCompaniesFetched = true;
          }
        } catch (error) {
          console.error('Error fetching compressed cached companies:', error);

          try {
            const { data } = await axios.get<Company[]>('/chronicling-america-fe/companies.json');

            if (data) {
              this.cachedCompanies = data;
              this.isCachedCompaniesFetched = true;
            }
          } catch (jsonError) {
            console.error('Error fetching normal cached companies:', jsonError);
            $toast.error('Error fetching cached companies');
          }
        }
      }
    },

    async fetchCachedCompaniesByKey (key: string): Promise<void> {
      await this.fetchCachedCompanies();

      if (this.cachedCompanies) {
        const filteredCompanies: Company[] = this.cachedCompanies.filter(company => {
          const companyNameMatches = company.company?.toLowerCase().includes(key.toLowerCase()) || false;
          const tickerMatches = company.ticker?.toLowerCase().includes(key.toLowerCase()) || false;

          return companyNameMatches || tickerMatches;
        });

        this.setCompaniesByKey(filteredCompanies);
      }
    },

    async fetchCachedCompany (id: string): Promise<void> {
      await this.fetchCachedCompanies();

      if (this.cachedCompanies) {
        const numericId: number = parseInt(id);
        const company: Company | undefined = this.cachedCompanies.find(c => c.id === numericId);

        if (company) {
          this.company = company;
        }
      }
    },

    setSearchValue (value: string): void {
      this.searchValue = value;
    },
  },
});

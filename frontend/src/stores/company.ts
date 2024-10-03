import { defineStore } from 'pinia';
import axios from 'axios';
import { type CompanyState, type Company } from '@/types'

const apiUrlPrefix = `${import.meta.env.VITE_HOST}:${import.meta.env.VITE_BASE_PORT}/api/`;

export const useCompanyStore = defineStore('company', {
  state: (): CompanyState => ({
    searchValue: '',
    companiesByKey: null,
    company: null,
  }),

  actions: {
    setCompaniesByKey(data: Company[] | null): void {
      this.companiesByKey = data;
    },

    async fetchCompaniesByKey(key: string):Promise<void> {
      const { data } = await axios.get(`${apiUrlPrefix}companiesByKey?search=${key}`);

      if (data) {
        this.setCompaniesByKey(data);
      }
    },

    async fetchCompany(id: string):Promise<void>  {
      const { data } = await axios.get(`${apiUrlPrefix}companies/${id}`);

      if (data) {
        this.company = data;
      }
    },

    setSearchValue(value: string): void {
      this.searchValue = value;
    }
  },
});

import { defineStore } from 'pinia'
import { useRequest } from '@/composables/useRequest'
import { Company, parametersCompany } from '@/models/Company'
import { useSubsidiary } from '@/stores/subsidiary'
import { CompanySubsidiary } from '@/models/Subsidiary'
import { BatchManagement } from '@/models/BatchManagement'

export const useCompany = defineStore('company', {
  state: () => ({
    companies: [] as Company[],
    companySubsidiaries: [] as CompanySubsidiary[],
    company: {} as Company,
    batchCompanies: [] as BatchManagement[],
    parameters: {} as parametersCompany,
    searchable: '',
    filterContract: '',
    filterPcmso: '',
    dayFilter: 0,
    sumFilter: 0
  }),
  getters: {
    filteredCompanies: (state) => {
      if (state.searchable === '') return state.companies

      return state.companies.filter(({ name, cnpj }) => {
        const totalText = `${name} ${cnpj}`.toLowerCase()

        return totalText.includes(state.searchable.toLowerCase())
      })
    },
    filterBatchCompanies: (state) => {
      const listBatchCompanies = state.batchCompanies.map(
        (company) => company.company_id
      )

      return state.companies.filter((company) => {
        if (
          !listBatchCompanies.includes(company.id) &&
          company.status !== 'inactive'
        ) {
          return company
        }
      })
    },
    filterExpirationControl: (state) => {
      const currentDate = new Date()

      if (state.filterContract === 'Contract') {
        return state.companySubsidiaries.filter(({ contract_date }) => {
          const expirationDate = convertToBrazilianDateObject(contract_date)

          //Check if a year has passed
          expirationDate.setFullYear(expirationDate.getFullYear() + 1)
          expirationDate.setDate(expirationDate.getDate() - state.dayFilter)

          if (currentDate > expirationDate) {
            state.sumFilter++
            return contract_date
          }
        })
      }
      if (state.filterPcmso === 'Pcmso') {
        return state.companySubsidiaries.filter(({ validity_pcmso }) => {
          const expirationDate = convertToBrazilianDateObject(validity_pcmso)

          //check if a data has passed
          expirationDate.setDate(expirationDate.getDate() - state.dayFilter)

          if (currentDate > expirationDate) {
            state.sumFilter++
            return validity_pcmso
          }
        })
      } else {
        return state.companySubsidiaries
      }
    }
  },
  actions: {
    async fetchCompanies() {
      const companiesSubsidiaries = useSubsidiary()
      this.companies = (await useRequest('/companies', {
        method: 'get'
      })) as Company[]
      await companiesSubsidiaries.fetchSubsidiaries()
      this.companySubsidiaries = companiesSubsidiaries.companySubsidiaries
    },
    async fetchBatchCompaniesShow(payload: Pick<BatchManagement, 'id'>) {
      this.batchCompanies = await useRequest(`/batchManagement/${payload.id}`, {
        method: 'get'
      })
    },
    async create(payload: Omit<Company, 'id' | 'created_at' | 'updated_at'>) {
      const { id } = await useRequest('/companies', {
        method: 'post',
        body: payload
      })
      return id as number
    },
    async show(payload: Pick<Company, 'id'>) {
      this.company = (await useRequest(`/companies/${payload.id}`, {
        method: 'get'
      })) as Company

      if (this.company.cpf === null) {
        this.company.cpf = ''
      }
      if (this.company.cnpj === null) {
        this.company.cnpj = ''
      }
      if (this.company.email === null) {
        this.company.email = ''
      }
      if (this.company.contact === null) {
        this.company.contact = ''
      }
      if (this.company.scheduling === null) {
        this.company.scheduling = 'no'
      }
      if (this.company.signed_contract === null) {
        this.company.signed_contract = 'no'
      }

      const object = await useRequest(`/companies/${payload.id}`, {
        method: 'get'
      })
      this.parameters = {
        scheduling: object.scheduling ? object.scheduling : 'no',
        signed_contract: object.signed_contract ? object.signed_contract : 'no'
      }
    },
    async update(payload: Omit<Company, 'id' | 'created_at' | 'updated_at'>) {
      const { id } = await useRequest(`/companies/${this.company.id}`, {
        method: 'put',
        body: payload
      })
      return id as number
    },
    async updateParameters(payload: parametersCompany) {
      const { id } = await useRequest(`/companies/${this.company.id}`, {
        method: 'put',
        body: payload
      })
      return id as number
    },
    async updateCompanyCPF(
      payload: Omit<Company, 'id' | 'created_at' | 'updated_at'>
    ) {
      payload.cpf = null
      const { id } = await useRequest(`/companies/${this.company.id}`, {
        method: 'put',
        body: payload
      })
      return id as number
    },
    async updateCompanyCNPJ(
      payload: Omit<Company, 'id' | 'created_at' | 'updated_at'>
    ) {
      payload.cnpj = null
      const { id } = await useRequest(`/companies/${this.company.id}`, {
        method: 'put',
        body: payload
      })
      return id as number
    },
    async destroy(id: Company['id']) {
      await useRequest(`/companies/${id}`, {
        method: 'delete'
      })

      await this.fetchCompanies()

      this.companies = this.companies.filter((company) => company.id !== id)
    }
  }
})

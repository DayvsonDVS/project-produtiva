import { Company } from '@/models/Company'

export interface BatchManagement {
  id?: number
  batch_id: number
  company_id: number
  status: Boolean
  historic: string
  receipt: string
}

export interface BatchCompanies {
  id: Company['id']
  name: Company['name']
  cnpj: Company['cnpj']
}

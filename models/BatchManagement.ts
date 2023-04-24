import { Company } from '@/models/Company'

export interface BatchManagement {
  id?: number
  batch_id: number
  company_id: number
  status: string
  historic: string
  receipt: string
}

export interface BatchCompanies {
  id: Company['id']
  name: Company['name']
  cnpj: Company['cnpj']
}

export interface BatchManagementCompanies {
  id: Company['id']
  name: Company['name']
  cnpj: Company['cnpj']
  receipt: string
  status: string
}

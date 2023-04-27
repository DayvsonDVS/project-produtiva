import { Company } from '@/models/Company'

export interface BatchManagement {
  id?: number
  batch_id: number
  company_id: number
  name: Company['name']
  cnpj: Company['cnpj']
  status: string
  historic: string
  receipt: string
}

export interface BatchManagementCompanies {
  id?: number
  batch_id: number
  company_id: number
  historic: string
  receipt?: string
  status: string
}

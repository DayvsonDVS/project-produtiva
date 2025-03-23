import { Company } from '@/models/Company'

export interface BatchManagement {
  id?: number
  batch_id: number
  company_id: number
  name: Company['name']
  cnpj: Company['cnpj']
  cpf: Company['cpf']
  contract_date: Company['contract_date']
  validity_pcmso: Company['validity_pcmso']
  email: Company['email']
  contact: Company['contact']
  company_receipt: Company['receipt']
  user: string
  created_at: string
  updated_at: string
  status: string
  historic: string
  receipt: string
  edit_user?: string
  follow: string
  scheduling?: string
}

export interface BatchManagementCompanies {
  id?: number
  batch_id: number
  company_id: number
  historic: string
  receipt?: string
  status: string
}

export interface CreatePayload {
  id?: number
  batch_id: BatchManagement['batch_id']
  company_id: BatchManagement['company_id']
  historic: BatchManagement['historic']
  follow: string
  receipt?: File
  status: string
}

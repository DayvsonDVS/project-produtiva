export interface Subsidiary {
  id: number
  company_id: number
  name: string
  unique_cnpj_company: string
  cnpj?: string
  validity_pcmso?: string
  contract_date: string
  procuration: string
  created_at: string
  updated_at: string
}

export interface CompanySubsidiary {
  id: number
  name: string
  cnpj?: string
  validity_pcmso: string
  contract_date: string
  procuration: string
}

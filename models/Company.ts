export interface Company {
  id: number
  name: string
  status: string
  cnpj?: string | null
  cpf?: string | null
  validity_pcmso: string
  contract_date: string
  alert?: string
  email: string
  contact: string
  created_at: string
  updated_at: string
}

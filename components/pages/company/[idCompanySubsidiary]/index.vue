<template>
  <SubsidiaryTemplate />
</template>

<script setup lang="ts">
import { useSubsidiary } from '@/stores/subsidiary'
import { useCompany } from '@/stores/company'
import { Subsidiary } from '@/models/Subsidiary'
import { Company } from '@/models/Company'

const route = useRoute()
const company_id: Pick<Company, 'id'> = { id: Number(route.params.idCompanySubsidiary) }
const company_subsidiary_id: Pick<Subsidiary, 'company_id'> = { company_id: Number(route.params.idCompanySubsidiary) }
const subsidiary = useSubsidiary()
const company = useCompany()

onMounted(() => {
  company.show(company_id)
  subsidiary.show(company_subsidiary_id)
})

onUnmounted(() => {
  subsidiary.searchable = ''
})

definePageMeta({
  middleware: ['guest', 'guest-admin']
})
</script>

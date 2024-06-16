import { expect, describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BatchForm from '@/components/molecules/forms/BatchForm.vue'
import BatchFormEdit from '@/components/molecules/forms/BatchFormEdit.vue'

describe('BatchForm', () => {
  it('test Batch Form', async () => {
    const wrapper = mount(BatchForm)

    expect(wrapper.classes()).toContain('batch-form')
  })
})

describe('BatchFormEdit', () => {
  it('test Batch name', async () => {
    const wrapper = mount(BatchFormEdit)

    await wrapper.find('input[type="text"]').setValue('Maio - 2023')
    expect(wrapper.find('input').element.value).toBe('Maio - 2023')
  })

  // it('test Batch status', async () => {
  //   const wrapper = mount(BatchFormEdit)

  //   const radioInput = wrapper.find('input[type="radio"]')

  //   expect(radioInput.exists()).toBe(true)

  //   await radioInput.setValue('checked')

  //   expect(console.log(radioInput.element)).toBeTruthy()
  // })
})

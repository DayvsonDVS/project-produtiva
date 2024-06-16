import { expect, describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Header from '@/components/molecules/Header/Header.vue'

describe('Header', () => {
  it('test component Header', async () => {
    const wrapper = mount(Header, {
      props: {
        title: 'teste'
      }
    })

    expect(wrapper.html()).toContain('teste')
  })
})

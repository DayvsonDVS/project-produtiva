import { Ref } from 'vue'

export function onOutsideClick(
  target: Ref<HTMLElement | undefined>,
  callback: () => void
) {
  useEventListener('click', (event) => {
    const clickedElement = event.target as HTMLElement
    if (!target.value?.contains(clickedElement)) {
      callback()
    }
  })
}

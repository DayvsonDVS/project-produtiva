export function onPressEscape(callback: () => void) {
  useEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      callback()
    }
  })
}

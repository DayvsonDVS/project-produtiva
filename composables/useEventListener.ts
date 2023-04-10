export function useEventListener<EventName extends keyof HTMLElementEventMap>(
  event: EventName,
  method: (argumento: HTMLElementEventMap[EventName]) => void
) {
  onMounted(() => document.addEventListener(event, method))
  onUnmounted(() => document.removeEventListener(event, method))
}

export function hasPassedOneYear(date: string): boolean {
  const newDate = new Date(date)
  const currentDate = new Date()
  const oneYearInMillis = 365 * 24 * 60 * 60 * 1000

  return currentDate.getTime() - newDate.getTime() >= oneYearInMillis
}

export function hasPassedOneYear(date: Date): boolean {
  const currentDate = new Date()
  const oneYearInMillis = 365 * 24 * 60 * 60 * 1000 // Assuming 365 days in a year

  return currentDate.getTime() - date.getTime() >= oneYearInMillis
}

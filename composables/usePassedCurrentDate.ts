export function passedCurrentDate(date: string | undefined): boolean {
  if (date === undefined) {
    return false
  } else {
    const newDate = convertToBrazilianDateObject(date)
    const currentDate = new Date()

    return currentDate >= newDate
  }
}
export function convertToBrazilianDateObject(dateString: string) {
  const [day, month, year] = dateString.split('/')
  const formattedDateString = `${month}/${day}/${year}`

  const date = new Date(formattedDateString)

  return date
}
export function passedCountCurrentDate(date: string): string {
  if (date === null) {
    return ''
  } else {
    const newDate = convertToBrazilianDateObject(date)
    const currentDate = new Date()

    if (currentDate >= newDate) {
      return 'Vencida'
    } else {
      return diffDays(newDate, currentDate).toString()
    }
  }
}

function diffDays(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000
  const diffInTime = Math.abs(date2.getTime() - date1.getTime())

  return Math.round(diffInTime / oneDay)
}

export function hasPassedOneYear(date: string): boolean {
  if (date === undefined) {
    return false
  } else {
    const newDate = convertToBrazilianDateObject(date)
    const currentDate = new Date()

    return currentDate >= newDate
  }
}
function convertToBrazilianDateObject(dateString: string) {
  const [day, month, year] = dateString.split('/')
  const formattedDateString = `${month}/${day}/${year}`

  const date = new Date(formattedDateString)

  return date
}

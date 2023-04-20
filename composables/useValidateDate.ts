import { parse } from 'date-fns'

export function useValidateDate(date: string): boolean {
  const formatString = 'dd/MM/yyyy'

  const dateTime = parse(date, formatString, new Date())

  if (dateTime.toString() === 'Invalid Date') {
    return true
  } else {
    return false
  }
}

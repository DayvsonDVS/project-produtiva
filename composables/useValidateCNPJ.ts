export function useValidateCNPJ(cnpj: string) {
  // Remove any characters that are not digits
  cnpj = cnpj.replace(/[^\d]+/g, '')

  // Check if the CNPJ has 14 digits
  if (cnpj.length !== 14) {
    return false
  }

  // Calculate the first verification digit
  let sum = 0
  let multiplier = 2
  for (let i = 11; i >= 0; i--) {
    sum += parseInt(cnpj.charAt(i)) * multiplier
    multiplier = multiplier === 9 ? 2 : multiplier + 1
  }
  const firstDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11)

  // Calculate the second verification digit
  sum = 0
  multiplier = 2
  for (let i = 12; i >= 0; i--) {
    sum += parseInt(cnpj.charAt(i)) * multiplier
    multiplier = multiplier === 9 ? 2 : multiplier + 1
  }
  const secondDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11)

  // Check if the verification digits match the CNPJ
  return (
    parseInt(cnpj.charAt(12)) === firstDigit &&
    parseInt(cnpj.charAt(13)) === secondDigit
  )
}

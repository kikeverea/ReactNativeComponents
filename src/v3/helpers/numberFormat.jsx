const decimalFormat = new Intl.NumberFormat('es-ES', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const numberFormat = new Intl.NumberFormat('es-ES', { roundingMode: 'trunc' })

export const formatCurrency = (value, symbol) => {
  const formatted = formatDecimal(value)

  return `${formatted} ${symbol}`
}

export const formatDecimal = value =>
  Number(value) === parseInt(value)   // no decimal values
    ? numberFormat.format(value)      // ignores zeros padding
    : decimalFormat.format(value)     // adds zeros padding if necessary

export const formatNumber = value => numberFormat.format(value)

export const formatDate = date => {
  return date ? new Date(date).toLocaleDateString() : null
}
function luhnAlgorithm(cardNumber) {
  const num = cardNumber.replace(/\D/g, '')
  let sum = 0
  let shouldDouble = false
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num[i], 10)
    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    sum += digit
    shouldDouble = !shouldDouble
  }
  return sum % 10 === 0
}

const cardPatterns = [
  { bandeira: 'Visa', regex: /^4\d{15}$/ }, // Visa 16 digits
  { bandeira: 'Visa', regex: /^4\d{12,18}$/ }, // Visa generic
  {
    bandeira: 'MasterCard',
    regex:
      /^(5[1-5]\d{14}|222[1-9]\d{12}|22[3-9]\d{13}|2[3-6]\d{14}|27[01]\d{13}|2720\d{12})$/,
  },
  { bandeira: 'American Express', regex: /^(34|37)\d{13}$/ },
  {
    bandeira: 'Diners Club',
    regex: /^(30[0-5]\d{11}|36\d{12}|38\d{12}|39\d{12})$/,
  },
  {
    bandeira: 'Discover',
    regex:
      /^(6011\d{12}|65\d{14}|64[4-9]\d{13}|622(12[6-9]|1[3-9]\d|[2-8]\d{2}|9([01]\d|2[0-5]))\d{10})$/,
  },
  { bandeira: 'EnRoute', regex: /^(2014|2149)\d{11}$/ },
  { bandeira: 'JCB', regex: /^(352[89]\d{12}|35[3-8]\d{13})$/ },
  { bandeira: 'Voyager', regex: /^8699\d{11}$/ },
  { bandeira: 'Aura', regex: /^50[0-9]{14,17}$/ },
  { bandeira: 'Hipercard', regex: /^6062\d{12,15}$/ },
]

function getCardBandeira(cardNumber) {
  const num = cardNumber.replace(/\D/g, '')
  if (!luhnAlgorithm(num)) return 'Inválido'
  const found = cardPatterns.find(({ regex }) => regex.test(num))
  return found ? found.bandeira : 'Desconhecida'
}

console.log(getCardBandeira('4111111111111111')) // Visa
console.log(getCardBandeira('5500000000000004')) // MasterCard
console.log(getCardBandeira('340000000000009')) // American Express
console.log(getCardBandeira('6011000000000004')) // Discover
console.log(getCardBandeira('6062825624254001')) // Hipercard
console.log(getCardBandeira('30569309025904')) // Diners Club
console.log(getCardBandeira('201400000000009')) // EnRoute
console.log(getCardBandeira('3530111333300000')) // JCB
console.log(getCardBandeira('86990 1515 32747 5')) // Voyager
console.log(getCardBandeira('5065 6049 1246 9962')) // Aura
console.log(getCardBandeira('4011780000000000')) // Elo (Inválido)
console.log(getCardBandeira('1234567890123456')) // Inválido

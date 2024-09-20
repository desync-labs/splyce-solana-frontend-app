import SPLYlogo from '@/assets/tokens/sply.png'
export const getTokenLogoURL = (address: string) => {
  return SPLYlogo as string
}

// export const getTokenInfo = (address: string): TokenItem => {
//   const addressLowerCase = address?.toLowerCase()
//
//   for (let i = 0; i < DEFAULT_TOKEN_LIST.tokens.length; i++) {
//     const tokenListItem = DEFAULT_TOKEN_LIST.tokens[i]
//     if (
//       tokenListItem.address.toLowerCase() === addressLowerCase ||
//       tokenListItem.name.toLowerCase() === addressLowerCase ||
//       tokenListItem.symbol.toLowerCase() === addressLowerCase
//     ) {
//       return tokenListItem
//     }
//   }
//
//   return { address: '', name: '', symbol: '' }
// }

import SPLYlogo from "@/assets/tokens/sply.png";
import USDClogo from "@/assets/tokens/usdc.png";
export const getTokenLogoURL = (address: string) => {
  if (
    address === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" ||
    address === "5aa3HkBenNLtJwccrNDYri1FrqfB7U2oWQsRanbGRHot"
  ) {
    return USDClogo as string;
  }
  return SPLYlogo as string;
};

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

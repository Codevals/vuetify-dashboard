// Format the price above to USD using the locale, style, and currency.
let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default function useFormatRevenues(r: any){
    const result = parseFloat(r).toFixed(2)
    const formattedresult = USDollar.format(result)
    return formattedresult
}


const currencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const toCurrencyFormat = (value: number) => currencyFormat.format(value);

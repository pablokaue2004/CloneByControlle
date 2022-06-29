const numberCurrencyFormart = (value: number) => {
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  return value;
};

export default numberCurrencyFormart;

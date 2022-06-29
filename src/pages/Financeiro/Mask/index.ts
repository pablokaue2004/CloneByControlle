/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable consistent-return */
import React from 'react';

export const brlMask = {
  currencyBrlMask: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const amount = e.target.value;

    let onlyNumbers = Number(amount.replace(/[^0-9]/g, '')) / 100;
    if (Number.isNaN(onlyNumbers)) {
      onlyNumbers = 0;
    }
    const valueBr = onlyNumbers.toLocaleString('pt-br', {
      minimumFractionDigits: 2,
    });

    e.target.value = valueBr;

    return e;
  },

  stringToNumber: (value: number | string | null) => {
    let valueNumber = value || 0;

    if (typeof value === 'string') {
      valueNumber = Number(value.replace(/[^0-9]/g, '')) / 100;
    }
    console.log(valueNumber);

    return valueNumber;
  },
};

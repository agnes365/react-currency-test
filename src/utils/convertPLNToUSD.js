export const convertPLNToUSD = (PLN) => {
  if ((typeof PLN === 'string') || (typeof PLN === 'undefined')) { return Number.NaN }
  if ((typeof PLN !== 'string') && (typeof PLN !== 'number')) { return 'Error'; }

  const PLNtoUSD = PLN / 3.5;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  if (PLN < 0) { return formatter.format(0); }

  return formatter.format(PLNtoUSD);
}
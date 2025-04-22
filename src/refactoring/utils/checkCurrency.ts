export const checkCurrency = (value: string): boolean => {
    console.log('value', value);

    const isValid = /^\d+(\.\d{1,2})?$/.test(value) && parseFloat(value) % 100 === 0;

    return isValid;
}
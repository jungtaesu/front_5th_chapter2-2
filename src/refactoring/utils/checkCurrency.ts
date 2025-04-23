export const checkCurrency = (value: string): boolean => {

    const isValid = /^\d+(\.\d{1,2})?$/.test(value) && parseFloat(value) % 100 === 0;

    return isValid;
}
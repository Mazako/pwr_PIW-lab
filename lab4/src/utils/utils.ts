export const createRateStr = (rate: number): string => {
    let result = '';
    for (let i = 1; i <= 5; i++) {
        result += i <= rate ? '★' : '☆';
    }
    return result;
};

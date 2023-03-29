export const isEmpty = (value) => {
    return value === '' || value === null || value === undefined;
}

export const onlyLetters = (word) => {
    return /[A-Za-z]/.test(word);
}

export const outOfTen = (number) => {
    return number >= 0 && number <= 10;
}

// Basic funcs

export const isEmpty = (value) => {
    return value === '' || value === null || value === undefined;
}

export const onlyLetters = (word) => {
    return /^[a-zA-Z]+$/.test(word);
}

export const outOfTen = (number) => {
    return number >= 0 && number <= 10;
}

export const under50kb = (file) => {
    return file.size <= 50000;
}


// Name
export const checkNameValidity = (catName, array) => {
    const issues = [];
    catName = catName.toLowerCase();
    if (isEmpty(catName)) {
        issues.push('Your cat must have a name!');
        return issues;
    }

    if (array.filter((catObj) => catObj.name.toLowerCase() === catName).length !== 0) {
        issues.push("Your cat cannot have the same name as a previously collected cat!");

        return issues;
    }

    if (!onlyLetters(catName)) {
        issues.push("You can only use letters in your cat's name :(")
    }
    return issues;
}

// Coat colour

export const checkColourValidity = (colour) => {
    let issues = [];
    if (isEmpty(colour)) {
        issues.push("Your cat must have a colour!")
        return issues;
    }
    if (!onlyLetters(colour)) {
        issues.push("Your colour must be a valid word")
    }
    return issues;
}

// Fluffiness

export const checkFluffinessValidity = (fluffiness) => {
    let issues = [];
    if (isEmpty(fluffiness)) {
        issues.push('Your cat cannot be naked!');

        return issues;
    }
    if (!outOfTen(fluffiness)) {
        issues.push("Your fluffiness value must be out of 10!")
    }
    return issues;
}

// Image

export const checkImageValidity = (image) => {
    let issues = [];
    if(image) {
        if (!under50kb(image)) {
            issues.push("Your image is too large!")
        }
    }
    return issues;
}
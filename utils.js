
// Basic funcs

export const isEmpty = (value) => {
    return value === '' || value === null || value === undefined;
}

export const onlyLetters = (word) => {
    return /^[a-zA-Z][a-zA-Z ]+$/.test(word);
}

export const outOfTen = (number) => {
    return number >= 0 && number <= 10;
}

export const under50kb = (filesize) => {
    return filesize <= 50000 && filesize > 0;
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
    console.log(issues);
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
    console.log(issues);
    return issues;
}

// Image

export const checkImageValidity = (image) => {
    let issues = [];
    if(image) {
        if (!under50kb(image.size)) {
            issues.push("Your image is too large!")
        }
    }
    return issues;
}

// clear form after positive submission

export const clearForm = (formGroup) => {
    formGroup.input.value = "";
    formGroup.input.classList.remove("is-valid");

}
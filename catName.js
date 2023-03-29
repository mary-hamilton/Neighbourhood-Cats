import {isEmpty, onlyLetters} from "./utils.js";

export const checkNameValidity = (catName, catArray) => {
    const issues = [];
    if (isEmpty(catName)) {
        issues.push('Your cat must have a name!');
        return issues;
    }

    if (catArray.filter((catObj) => catObj.name === catName).length > 0) {
         issues.push("Your cat cannot have the same name as a previously collected cat!");
         console.log(issues);
    return issues;
    }

    if (!onlyLetters(catName)) {
        issues.push("You can only use letters in your cat's name :(")
    }
    return issues;
}


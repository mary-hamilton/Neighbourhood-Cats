import {isEmpty, onlyLetters} from "./utils.js";

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
import {isEmpty, outOfTen} from "./utils.js";

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
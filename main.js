import './bootstrap.css';
import './style.css';
import  {checkNameValidity} from "./catName.js";
import {checkFluffinessValidity} from "./fluffiness.js"
import {checkColourValidity} from "./coatColour.js";
import {createNewCat} from "./createCat.js";

const form = document.querySelector("form");

// Inputs

const friendsInputYes = document.getElementById("yes");
const friendsInputNo = document.getElementById("no");

let catArray = [];

// submit the fucker

form.onsubmit = (event) => {
    event.preventDefault();
    displayValidity(catName);
    displayValidity(coatColour);
    displayValidity(fluffiness);

    let validated = true;
    if (catName.getIssues().length > 0 || coatColour.getIssues().length  > 0 || fluffiness.getIssues().length > 0) {
        validated = false;
    }
    console.log(validated)
    if (validated) {
        let newCat = {
            name: catName.getValue(),
            colour: coatColour.getValue(),
            fluffiness: fluffiness.getValue(),
            // friend: friendsInputYes.value,
    }
    catArray.push(newCat);
    console.log(catArray);
}
}
// Get and validate the cat name
export const catName = {
    input: document.getElementById('cat-name'),
    feedback: document.getElementById('name-feedback'),
    getValue() { return this.input.value },
    getIssues() { return checkNameValidity(this.getValue(), catArray)},
};

// Get and validate the cat colour
export const coatColour = {
    input: document.getElementById('coat-colour'),
    feedback: document.getElementById('colour-feedback'),
    getValue() { return this.input.value },
    getIssues() { return checkColourValidity(this.getValue())},
};

// Get and validate the cat fluffiness
export const fluffiness = {
    input: document.getElementById('fluffiness'),
    feedback: document.getElementById('fluffiness-feedback'),
    getValue() { return this.input.value },
    getIssues() { return checkFluffinessValidity(this.getValue())},
};

// Get and validate the friend value I HAVE NOT DONE THIS YET

// Display input validity

export const displayValidity = (formGroup) => {
    let issues = formGroup.getIssues();
    formGroup.input.classList.remove('is-valid,', 'is-invalid');
    formGroup.input.classList.add(issues.length === 0 ? 'is-valid' : 'is-invalid');
    formGroup.feedback.replaceChildren();
    let issueElements = issues.map((issue) => {
        let issueEl = document.createElement("small");
        issueEl.textContent = issue;
        return issueEl;
    })
    issueElements.forEach((el) => formGroup.feedback.appendChild(el));
}



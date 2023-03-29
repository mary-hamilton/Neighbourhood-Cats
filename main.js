import './bootstrap.css';
import './style.css';
import {checkNameValidity} from "./catName.js";
import {checkFluffinessValidity} from "./fluffiness.js"
import {checkColourValidity} from "./coatColour.js";
import {createNewCat} from "./createCat.js";

const form = document.getElementById("cat-creator");
const main = document.getElementById("main");


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
    if (catName.getIssues().length > 0 || coatColour.getIssues().length > 0 || fluffiness.getIssues().length > 0) {
        validated = false;
    }
    if (validated) {
        let newCat = {
            name: catName.getValue(),
            colour: coatColour.getValue(),
            fluffiness: fluffiness.getValue(),
            // friend: friendsInputYes.value,
        }

        retrieveCats();

        catArray.push(newCat);

        printCats();
        storeCats();

        //     clear the inputs - also clears the positive validation bootstrap class (you don't need to see
        //     positive validation if you have successfully submitted)
        clearForm(catName);
        clearForm(coatColour);
        clearForm(fluffiness);

    }


}


// Get and validate the cat name
export const catName = {
    input: document.getElementById('cat-name'),
    feedback: document.getElementById('name-feedback'),
    getValue() {
        return this.input.value
    },
    getIssues() {
        return checkNameValidity(this.getValue(), catArray)
    },
};

// Get and validate the cat colour
export const coatColour = {
    input: document.getElementById('coat-colour'),
    feedback: document.getElementById('colour-feedback'),
    getValue() {
        return this.input.value
    },
    getIssues() {
        return checkColourValidity(this.getValue())
    },
};

// Get and validate the cat fluffiness
export const fluffiness = {
    input: document.getElementById('fluffiness'),
    feedback: document.getElementById('fluffiness-feedback'),
    getValue() {
        return this.input.value
    },
    getIssues() {
        return checkFluffinessValidity(this.getValue())
    },
};

// Get and validate the friend value I HAVE NOT DONE THIS YET

// Display input validity

export const displayValidity = (formGroup) => {
    let issues = formGroup.getIssues();
    console.log(formGroup.input.classList);
    formGroup.input.classList.remove('is-valid,', 'is-invalid');
    console.log(formGroup.input.classList);
    formGroup.input.classList.add(issues.length < 1 ? 'is-valid' : 'is-invalid');
    console.log(formGroup.input.classList);
    formGroup.feedback.replaceChildren();
    let issueElements = issues.map((issue) => {
        let issueEl = document.createElement("small");
        issueEl.textContent = issue;
        return issueEl;
    })
    issueElements.forEach((el) => formGroup.feedback.appendChild(el));
}

// create and display the cat cards

export const printCats = () => {
    const catCardHolder = document.getElementById("cat-card-holder")
    catCardHolder.replaceChildren();
    let catCards = catArray.map((cat) => {
        let catEl = document.createElement("div");
        catEl.classList.add("cat-cards");
        let catName = document.createElement("p");
        catName.textContent = "Cat Name: " + cat.name;
        let catColour = document.createElement("p");
        catColour.textContent = "Coat Colour: " + cat.colour;
        let catFluffiness = document.createElement("p");
        catFluffiness.textContent = "Fluffiness: " + cat.fluffiness;

        // create delete button
        let deleteCatButton = document.createElement("button");
        deleteCatButton.textContent = "Delete Cat";
        deleteCatButton.onclick = () => {
            deleteCatButton.parentElement.remove();
            catArray = catArray.filter((value) => value.name !== cat.name);
            // must modify the cat array here, or it will continue to be stored intact
            storeCats();
        }

        // create edit button and edit form
        let editCatButton = document.createElement("button");
        editCatButton.textContent = "Edit Cat";
        editCatButton.onclick = () => {
            let editForm = createEditForm(cat);
            main.appendChild(editForm);
        }

        catEl.append(catName, catColour, catFluffiness, editCatButton, deleteCatButton);
        return catEl;
    })

    catCards.forEach((el) => catCardHolder.prepend(el));
}
// Storing the cats
// Adding to local storage
//
const storeCats = () => {

    localStorage.setItem('Cats',JSON.stringify(catArray));
}

// Retrieving from local storage
const retrieveCats = () => {

    catArray = JSON.parse(localStorage.getItem('Cats')) || [];
}

// on page load

retrieveCats();
printCats()

// adding delete all cats button
const killAllCats = () => {
    localStorage.removeItem('Cats');
    catArray = [];
    printCats();
}

const killAllCatsButton = document.getElementById("kill-all-cats");

killAllCatsButton.onclick = () => {
    // change this to a modal at some point
    if (confirm("are you sure you want to kill all your cats?")) {
        killAllCats();
    }
}

// clear the form after positive submission

const clearForm = (formGroup) => {
    formGroup.input.value = "";
    formGroup.input.classList.remove('is-valid');

}


// sketching out the edit function

// click edit button x
// form pops up populated with the current values
// we create a new array with the cat we are editing filtered out of it
// we make our edits and click submit
// we run our validation checks using our new array
// failed? normal validation bootstrap messages; nothing is changed
// cancelled? form disappears, nothing is changed
// passed? we create a new cat
// we delete the old cat from and add our new cat to the original array (at the same index
// as the old cat ideally)
// for now I am happy to just get the edit form onto the screen (anywhere);
// I will try and make it into a proper popup using bootstrap later.
// Need to work out how to not have 2 edit forms open at once - I think
// using the modal functionality where if you click off it the form closes
// would be enough

const createEditForm = (cat) => {
    let editForm = document.createElement("form");
    editForm.classList.add("container", "cat-editor");
    editForm.id = "cat-editor";
    let placeholder = document.createElement("p");
    placeholder.textContent = cat.name;
    editForm.append(placeholder);
    let confirmEditButton = document.createElement("button");
    confirmEditButton.type = "submit";
    confirmEditButton.textContent = "Confirm Edits";
    editForm.appendChild(confirmEditButton);
    editForm.onsubmit = (event) => {
        event.preventDefault();
    }
    return editForm;
}


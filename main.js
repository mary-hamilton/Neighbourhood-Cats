import './bootstrap.css';
import './style.css';
import {checkNameValidity} from "./catName.js";
import {checkFluffinessValidity} from "./fluffiness.js"
import {checkColourValidity} from "./coatColour.js";

import {createNewCat} from "./createCat.js";
import {addCatToEditForm} from "./addCatToEditForm.js";
import {editOriginalCat} from "./editOriginalCat.js";


// const main = document.getElementById("main");


// Form group variables

const form = document.getElementById("cat-creator");

// Cat name
export const catNameFormGroup = {
    input: document.getElementById('cat-name'),
    feedback: document.getElementById('name-feedback'),
    getValue() {
        return this.input.value
    },
    getIssues() {
        return checkNameValidity(this.getValue(), catArray)
    },
};

// Cat colour
export const coatColourFormGroup = {
    input: document.getElementById('coat-colour'),
    feedback: document.getElementById('colour-feedback'),
    getValue() {
        return this.input.value
    },
    getIssues() {
        return checkColourValidity(this.getValue())
    },
};

// Cat fluffiness
export const fluffinessFormGroup = {
    input: document.getElementById('fluffiness'),
    feedback: document.getElementById('fluffiness-feedback'),
    getValue() {
        return this.input.value
    },
    getIssues() {
        return checkFluffinessValidity(this.getValue())
    },
};

// Image stuff

const imageInput = document.getElementById('image-input');
const imagePreview = document.getElementById('image-preview');

const reader = new FileReader();

reader.onload = () => {
    const readImage = reader.result;
    if (readImage) {
        const previewEl = document.createElement('img');
        previewEl.setAttribute('src', readImage);
        previewEl.classList.add('preview');
        imagePreview.replaceChildren(previewEl);
        cardImage = readImage;

    }
}

imageInput.onchange = () => {
    const file = imageInput.files[0];
    reader.readAsDataURL(file);
}

const makeCardImageEl = (catobj) => {
    let cardImageEl = document.createElement("img");
    cardImageEl.setAttribute("src", catobj.image)
    cardImageEl.classList.add("card-image");
    return cardImageEl;
}


// const friendsInputYes = document.getElementById("yes");
// const friendsInputNo = document.getElementById("no");


// Edit form variables

const editForm = document.getElementById("cat-editor")

// Edit cat name
export const editCatNameFormGroup = {
    input: document.getElementById('edit-cat-name'),
    feedback: document.getElementById('edit-name-feedback'),
    getValue() {
        return this.input.value
    },
    getIssues() {
        return checkNameValidity(this.getValue(), editingCatArray)
    },
};

// edit cat colour
export const editCoatColourFormGroup = {
    input: document.getElementById('edit-coat-colour'),
    feedback: document.getElementById('edit-colour-feedback'),
    getValue() {
        return this.input.value
    },
    getIssues() {
        return checkColourValidity(this.getValue())
    },
};

// edit cat fluffiness
export const editFluffinessFormGroup = {
    input: document.getElementById('edit-fluffiness'),
    feedback: document.getElementById('edit-fluffiness-feedback'),
    getValue() {
        return this.input.value
    },
    getIssues() {
        return checkFluffinessValidity(this.getValue())
    },
};
// Cancel edit button
const cancelEditButton = document.getElementById("cancel-edit");

// Submit Edit button
const submitEditButton = document.getElementById("submit-edit");

// Global modifiable variables

let catArray = [];
let editingCatArray = [];
let catID;
let cardImage;

// submit the fucker

form.onsubmit = (event) => {
    event.preventDefault();

    let formElements = [catNameFormGroup, coatColourFormGroup, fluffinessFormGroup];

    formElements.forEach(displayValidity);

    if (validateAll(formElements)) {
        let newCat = {
            name: catNameFormGroup.getValue(),
            colour: coatColourFormGroup.getValue(),
            fluffiness: fluffinessFormGroup.getValue(),
            image: cardImage,
            // friend: friendsInputYes.value,
        }

        retrieveCats();
        catArray.push(newCat);
        printCats();
        storeCats();

        //     clear the inputs - also clears the positive validation bootstrap class (you don't need to see
        //     positive validation if you have successfully submitted)

        formElements.forEach(clearForm);

    }
}

// Get and validate the friend value I HAVE NOT DONE THIS YET

// Display input validity
export const displayValidity = (formGroup) => {
    let issues = formGroup.getIssues();
    formGroup.input.classList.remove('is-valid,', 'is-invalid');
    formGroup.input.classList.add(issues.length < 1 ? 'is-valid' : 'is-invalid');
    formGroup.feedback.replaceChildren();
    let issueElements = issues.map((issue) => {
        let issueEl = document.createElement("small");
        issueEl.textContent = issue;
        return issueEl;
    })
    issueElements.forEach((el) => formGroup.feedback.appendChild(el));
}

// create and print the cat cards

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
        let cardImageEl = makeCardImageEl(cat);

        //  create edit button
        let editCatButton = document.createElement("button");
        editCatButton.textContent = "Edit Cat";
        editCatButton.onclick = () => {
            editForm.style.display = "block";
            catID = cat.name
            addCatToEditForm(catID, catArray);
        }
        //  make it submittable

        submitEditButton.onclick = (event) => {
            event.preventDefault();

            // validation stuff
            // making an array without our current unique name so we can check against it without hitting any conflicts
            editingCatArray = catArray.filter((value) => value.name !== catID);

            let editFormElements = [editCatNameFormGroup, editCoatColourFormGroup, editFluffinessFormGroup];

            editFormElements.forEach(displayValidity);

            if (validateAll(editFormElements)) {
                // Editing the cat and the catArray
                editOriginalCat(catID, catArray);
                storeCats();
                printCats();
                editForm.style.display = "none";
            }
        }

        // cancel edit button

        cancelEditButton.onclick = () => {
            editForm.style.display = "none";
        }


        // delete button

        let deleteCatButton = document.createElement("button");
        deleteCatButton.textContent = "Delete Cat";
        deleteCatButton.onclick = () => {
            deleteCatButton.parentElement.remove();
            catArray = catArray.filter((value) => value.name !== cat.name);
            storeCats();
        }

        // building the cat card

        catEl.append(cardImageEl, catName, catColour, catFluffiness, editCatButton, deleteCatButton);
        return catEl;
    })

    // adding the cat cards to the DOM

    catCards.forEach((el) => catCardHolder.prepend(el));
}

// Storing the cats
// Adding to local storage
export const storeCats = () => {

    localStorage.setItem('Cats',JSON.stringify(catArray));
}

// Retrieving from local storage
const retrieveCats = () => {

    catArray = JSON.parse(localStorage.getItem('Cats')) || [];
}

// on page load

retrieveCats();
printCats()

// delete all cats button
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

// clear form after positive submission

const clearForm = (formGroup) => {
    formGroup.input.value = "";
    formGroup.input.classList.remove('is-valid');

}

// Validation functions
const validate = (formGroup) => {
    return formGroup.getIssues().length === 0;
}

const validateAll = (array) => {
    return array.every((value) => validate(value));
}




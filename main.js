import './bootstrap.css';
import './style.css';
import {checkNameValidity} from "./catName.js";
import {checkFluffinessValidity} from "./fluffiness.js"
import {checkColourValidity} from "./coatColour.js";
import {createNewCat} from "./createCat.js";

const form = document.getElementById("cat-creator");
const main = document.getElementById("main");


const editForm = document.getElementById("cat-editor")
const cancelEditButton = document.getElementById("cancel-edit");
const submitEditButton = document.getElementById("submit-edit");



// Inputs

const friendsInputYes = document.getElementById("yes");
const friendsInputNo = document.getElementById("no");

let catArray = [];
// let editingCatArray = [];



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

        //  create edit button
        let editCatButton = document.createElement("button");
        editCatButton.textContent = "Edit Cat";
        editCatButton.onclick = () => {
            editForm.style.display = "block";
        }

        //  populate the edit form and make it submittable

        const editCatNameInput = document.getElementById("edit-cat-name");
        editCatNameInput.value = cat.name;

        submitEditButton.onclick = (event) => {
            event.preventDefault();
            cat.name = editCatNameInput.value;
            printCats();
            storeCats();
            editForm.style.display = "none";
        }


        // create delete button
        let deleteCatButton = document.createElement("button");
        deleteCatButton.textContent = "Delete Cat";
        deleteCatButton.onclick = () => {
            deleteCatButton.parentElement.remove();
            catArray = catArray.filter((value) => value.name !== cat.name);
            // must edit the stored cat array here, or it will continue to be stored intact
            storeCats();
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

cancelEditButton.onclick = () => {
    editForm.style.display = "none";
}

editForm.onsubmit = (event) =>
    event.preventDefault();
// validate the inputs
// edit the original cat
// update catArray
// print and store the cats
// hide the edit form


// click edit button x
// form pops up populated with the current values
// we create a new array with the cat we are editing filtered out of it
// we make our edits and click submit
// we run our validation checks using our new array
// failed? normal validation bootstrap messages; nothing is changed x
// cancelled? form disappears, nothing is changed x
// passed? we create a new cat x
// we delete the old cat from and add our new cat to the original array (at the same index
// as the old cat)
// for now I am happy to just get the edit form onto the screen (anywhere);
// I will try and make it into a proper popup using bootstrap later.
// Need to work out how to not have 2 edit forms open at once - I think
// using the modal functionality where if you click off it the form closes
// would be enough
//
// const createEditForm = (cat) => {
//     let editForm = document.createElement("form");
//     editForm.classList.add("container", "cat-editor");
//     editForm.id = "cat-editor";
//     // Name
//     let editFormGroupName = document.createElement("div");
//     editFormGroupName.classList.add("form-group");
//     let editNameLabel = document.createElement("label");
//     editNameLabel.htmlFor = "edit-cat-name";
//     editNameLabel.textContent = "Edit Name?"
//     let editNameInput = document.createElement("input");
//     editNameInput.classList.add("form-control");
//     editNameInput.id = "edit-cat-name";
//     editNameInput.type = "text";
//     editNameInput.value = cat.name;
//     let editNameFeedback = document.createElement("div");
//     editNameFeedback.classList.add("invalid-feedback");
//     editNameFeedback.id = "edit-name-feedback";
//     editFormGroupName.append(editNameLabel, editNameInput, editNameFeedback);
//     editForm.append(editFormGroupName);
//
//     // Cancel button
//     let cancelEditButton = document.createElement("button");
//     cancelEditButton.type = "button";
//     cancelEditButton.textContent = "Cancel";
//     editForm.appendChild(cancelEditButton);
//     cancelEditButton.onclick = () => {
//         cancelEditButton.parentElement.remove();
//     }
//
//     // Submit edits button
//     let confirmEditButton = document.createElement("button");
//     confirmEditButton.type = "submit";
//     confirmEditButton.textContent = "Confirm Edits";
//     editForm.appendChild(confirmEditButton);
//     editForm.onsubmit = (event) => {
//         event.preventDefault();
//         //     Adding some actual editing functionality
//
//         // Get and validate edited name
//
//         const editCatName = {
//             input: editNameInput,
//             feedback: editNameFeedback,
//             getValue() {
//                 return this.input.value
//             },
//             getIssues() {
//                 return checkNameValidity(this.getValue(), editingCatArray)
//             },
//         };
//         // create filtered array for validation purposes
//
//         let editingCatArray = catArray.filter((value) => value.name !== cat.name);
//         let editingIndex = catArray.indexOf(cat);
//
//         displayValidity(editCatName);
//
//         let validated = true;
//         if (editCatName.getIssues().length > 0) {
//             validated = false;
//         }
//         if (validated) {
//             let editedCat = createNewCat(editNameInput.value, "egg", "egg", "egg")
//             catArray[editingIndex] = editedCat;
//             printCats();
//             storeCats();
//             editForm.remove();
//         }
//     }
//         return editForm;
// }




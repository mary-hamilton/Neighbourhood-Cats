import './bootstrap.css';
import './style.css';
import {
    checkFluffinessValidity,
    checkColourValidity,
    checkImageValidity,
    clearForm, isEmpty, onlyLetters
} from "./utils.js";


// Buttons

const submitButton = document.getElementById("submit-button");
const cancelEditButton = document.getElementById("cancel-edit");


// Cancel Edit Button

cancelEditButton.style.display = "none";
cancelEditButton.onclick = () => {
    restoreDefaults()
}


// Form group variables

const formHolder = document.getElementById("form-holder");
const form = document.getElementById("cat-creator");

// Cat name
export const catNameFormGroup = {
    input: document.getElementById('cat-name'),
    feedback: document.getElementById('name-feedback'),
    getValue() {
        return this.input.value
    },
    getIssues() {
        return checkNameValidity(this.getValue(), duplicateCheckArray)
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



// Hacky friends radio buttons

export const friendsYetYes = document.getElementById("friends-yet-yes");
export const friendsYetNo = document.getElementById("friends-yet-no");
let friendsYet;


friendsYetYes.onchange = () => {
    if (friendsYetYes.checked) {
        friendsYet = friendsYetYes.value;
    }
}

friendsYetNo.onchange = () => {
    if (friendsYetNo.checked) {
        friendsYet = friendsYetNo.value;
    }
}

// Image

export const imageFormGroup = {
    input: document.getElementById('image-input'),
    feedback: document.getElementById('image-feedback'),
    getValue() {
        return this.input.files[0]
    },
    getIssues() {
        return checkImageValidity(this.getValue())
    },
};

// Image stuff

export const imagePreview = document.getElementById('image-preview');

const reader = new FileReader();

reader.onload = () => {
    const readImage = reader.result;
    if (readImage) {
        let previewThumbnail = makeThumbnail(readImage);
        imagePreview.replaceChildren(previewThumbnail);
        cardImage = readImage;
        displayValidity(imageFormGroup);
    }
}

imageFormGroup.input.onchange = () => {
    if (imageFormGroup.input.files[0]) {
        reader.readAsDataURL(imageFormGroup.input.files[0]);
    } else {
        clearForm(imageFormGroup);
        imagePreview.replaceChildren();
        cardImage = undefined;
    }
}

// Make thumbnail

const makeThumbnail = (image) => {
    let thumbnail = document.createElement("img");
    thumbnail.setAttribute('src', image);
    thumbnail.classList.add('preview', "img-thumbnail");
    return thumbnail;
}

export const makeCardImageEl = (cat) => {
    if (cat.image) {
        let cardImageEl = document.createElement("img");
        cardImageEl.setAttribute("src", cat.image)
        cardImageEl.classList.add("card-img-top");
        return cardImageEl;
    }
}

// Global modifiable variables


const formElements = [catNameFormGroup, coatColourFormGroup, fluffinessFormGroup, imageFormGroup];
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const catEmoji = document.getElementById("cat-emoji");
let catArray = [];
let catID;
let cardImage;
let editing = false;
let newCat;
let duplicateCheckArray = [];

// submit the fucker

form.onsubmit = (event) => {
    event.preventDefault();

    duplicateCheckArray = editing ? catArray.filter((value) => value.name !== catID) : catArray;

    formElements.forEach(displayValidity);
    displayRadioValidity();

    if (validateAll(formElements) && friendsYet) {

        if (!editing) {

            newCat = makeCat();
            retrieveCats();
            catArray.push(newCat);

        }

        if (editing) {

            editOriginalCat(catID, catArray);
            storeCats();
            retrieveCats();

        }

        printCats();
        storeCats();
        restoreDefaults();

    }
}


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

// Display radio button validity

const radioFeedback = document.getElementById("radio-feedback");
export const displayRadioValidity = () => {
    if (friendsYetYes.checked === false && friendsYetNo.checked === false) {
       radioFeedback.style.display = "block";
       radioFeedback.textContent = "Are you friends yet or not?!"
    }
}



// create and print the cat cards

export const printCats = () => {
    const catCardHolder = document.getElementById("cat-card-holder")
    catCardHolder.replaceChildren();
    let catCards = catArray.map((cat) => {
        let cardColumn = document.createElement("div");
        cardColumn.classList.add("col-12", "col-lg-6", "col-xl-4", "mb-4");
        let catEl = document.createElement("div");
        catEl.classList.add("cat-cards", "card", "h-100", "border", "border-4" );
        cardColumn.append(catEl);
        let catElBody = document.createElement("div");
        catElBody.classList.add("card-body");
        catEl.append(catElBody);

        let cardElArray = [];

        let cardImageEl = makeCardImageEl(cat);
        if (cardImageEl) {
            catEl.prepend(cardImageEl)
        }
        
        let catName = document.createElement("p");
        catName.textContent = "Name: " + cat.name;
        cardElArray.push(catName);
        let catColour = document.createElement("p");
        catColour.textContent = "Coat Colour: " + cat.colour;
        cardElArray.push(catColour);
        let catFluffiness = document.createElement("p");
        catFluffiness.textContent = "Fluffiness: " + cat.fluffiness;
        cardElArray.push(catFluffiness);
        let catFriendsYet = document.createElement("p");
        catFriendsYet.textContent = "Friends Yet?? " + cat.friend;
        cardElArray.push(catFriendsYet);

        //  create edit button
        let editCatButton = document.createElement("button");
        editCatButton.classList.add("edit-button", "btn")
        editCatButton.textContent = "Edit Cat";

        editCatButton.onclick = () => {
            editing = true;
            formHolder.classList.add("editing");
            catID = cat.name
            addCatToEditForm(catID, catArray);
            submitButton.textContent = "Edit This Cat";
            killAllCatsButton.style.display = "none"
            cancelEditButton.style.display = "block";
            title.style.display = "none";
            subtitle.style.display = "none";
            catEmoji.style.display = "none";

        }
        cardElArray.push(editCatButton);


        // delete button

        let deleteCatButton = document.createElement("button");
        deleteCatButton.classList.add("delete-button", "btn")
        deleteCatButton.textContent = "Delete Cat";
        deleteCatButton.onclick = () => {
            deleteCatButton.parentElement.remove();
            catArray = catArray.filter((value) => value.name !== cat.name);
            storeCats();
            printCats();
        }

        cardElArray.push(deleteCatButton)


        // building the cat card

        cardElArray.forEach((bit) => catElBody.append(bit));
        return cardColumn;
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
printCats();
friendsYet = "";

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


// Validation functions
export const validate = (formGroup) => {
    return formGroup.getIssues().length === 0
}
export const validateAll = (array) => {
    return array.every((value) => validate(value));
}

// Name validation
export const checkNameValidity = (catName) => {
    const issues = [];
    catName = catName.toLowerCase();
    if (isEmpty(catName)) {
        issues.push('Your cat must have a name!');
        return issues;
    }

    if (duplicateCheckArray.filter((catObj) => catObj.name.toLowerCase() === catName).length !== 0) {
        issues.push("Your cat cannot have the same name as a previously collected cat!");

        return issues;
    }

    if (!onlyLetters(catName)) {
        issues.push("You can only use letters in your cat's name :(")
    }
    console.log(issues)
    return issues;
}

// Add cat to edit form
const addCatToEditForm = (catID) => {
    let catobj = catArray.find((value) => value.name === catID);
    catNameFormGroup.input.value = catobj.name;
    coatColourFormGroup.input.value = catobj.colour;
    fluffinessFormGroup.input.value = catobj.fluffiness;
    friendsYet = catobj.friend;
    catobj.friend === "Yes!" ? friendsYetYes.checked = true : friendsYetNo.checked = true;
    cardImage = catobj.image;
    if (catobj.image) {
        imagePreview.replaceChildren();
        let editThumbnail = makeThumbnail(catobj.image);
        imagePreview.append(editThumbnail);
    }
}

// Make cat

const makeCat = () => {
    return {
        name: catNameFormGroup.getValue(),
        colour: coatColourFormGroup.getValue(),
        fluffiness: fluffinessFormGroup.getValue(),
        image: cardImage,
        friend: friendsYet
    }
}

// Edit cat

const editOriginalCat = (catID, array) => {

        let catobj = array.find((value) => value.name === catID);
        let position = array.indexOf(catobj);
        catobj = makeCat();
        array[position] = catobj;

}

// Restore defaults

const restoreDefaults = () => {
    editing = false;
    formHolder.classList.remove("editing");
    submitButton.textContent = "Submit";
    killAllCatsButton.style.display = "block";
    radioFeedback.style.display = "none";
    cardImage = undefined;
    imagePreview.replaceChildren();
    cancelEditButton.style.display = "none";
    formElements.forEach(clearForm);
    title.style.display = "block";
    subtitle.style.display = "block";
    catEmoji.style.display = "block";


}


import {editCatNameFormGroup, editCoatColourFormGroup, editFluffinessFormGroup} from "./main.js";


let editedImage;

export const setImageUrl = (newImageUrl) => {
    editedImage = newImageUrl;
}

export const editOriginalCat = (catID, array) => {
    let catobj = array.find((value) => value.name === catID);
    catobj.name = editCatNameFormGroup.input.value;
    catobj.colour = editCoatColourFormGroup.input.value;
    catobj.fluffiness = editFluffinessFormGroup.input.value;
    catobj.image = editedImage;

}
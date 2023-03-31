import {editCatNameFormGroup, editCoatColourFormGroup, editFluffinessFormGroup, editImageFormGroup} from "./main.js";

export const editOriginalCat = (catID, array) => {
    let catobj = array.find((value) => value.name === catID);
    catobj.name = editCatNameFormGroup.input.value;
    catobj.colour = editCoatColourFormGroup.input.value;
    catobj.fluffiness = editFluffinessFormGroup.input.value;
    catobj.image = editImageFormGroup.input.files[0];

    console.log(array);
}
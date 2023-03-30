import {editCatNameFormGroup, editCoatColourFormGroup, editFluffinessFormGroup} from "./main.js";

export const editOriginalCat = (catID, array) => {
    let catobj = array.find((value) => value.name === catID);
    catobj.name = editCatNameFormGroup.input.value;
    catobj.colour = editCoatColourFormGroup.input.value;
    catobj.fluffiness = editFluffinessFormGroup.input.value;

    console.log(array);
}
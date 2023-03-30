import {editCatNameFormGroup, editCoatColourFormGroup, editFluffinessFormGroup} from "./main.js";

export const addCatToEditForm = (catID, array) => {

    let catobj = array.find((value) => value.name === catID);
    editCatNameFormGroup.input.value = catobj.name;
    editCoatColourFormGroup.input.value = catobj.colour;
    editFluffinessFormGroup.input.value = catobj.fluffiness;

}
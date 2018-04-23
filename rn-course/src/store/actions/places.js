import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from './actionTypes';

// this one is using ES6 syntax of placeName: placeName  -->  placeName
export const addPlace = (placeName) => {
    return {
        type: ADD_PLACE,
        placeName               
    };
};

export const deletePlace = () => {
    return {
        type: DELETE_PLACE
    };
};

export const selectPlace = (key) => {
    return {
        type: SELECT_PLACE,
        placeKey: key
    };
};

export const deselectPlace = () => {
    return {
        type: DESELECT_PLACE
    };
};

import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

// this one is using ES6 syntax of placeName: placeName  -->  placeName
export const addPlace = (placeName, location, image) => {
    return {
        type: ADD_PLACE,
        placeName,
        location,
        image
    };
};

export const deletePlace = (placeKey) => {
    return {
        type: DELETE_PLACE,
        placeKey
    };
};

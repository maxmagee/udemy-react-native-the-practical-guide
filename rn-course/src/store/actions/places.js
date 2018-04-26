import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

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

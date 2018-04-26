import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes';

import placeImage from '../../../src/assets/st-lucia.jpg';

const initialState = {
    places: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: state.places.concat({ 
                    key: Math.random(),     // assume this is unique just for this example
                    name: action.placeName,
                    image: placeImage
                })
            };
        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter((place) => {
                    return place.key !== action.placeKey;
                })
            };
        default:
            return state;
    }
};

export default reducer;

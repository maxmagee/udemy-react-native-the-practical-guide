import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

// this one is using ES6 syntax of placeName: placeName  -->  placeName
export const addPlace = (placeName, location, image) => {
    return dispatch => {
        fetch('https://us-central1-awesome-places-1525473356114.cloudfunctions.net/storeImage', {
            method: 'POST',
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => console.log(err))
        .then(res => res.json())
        .then(parsedRes => {
            const placeData = {
                name: placeName,
                location,
                image: parsedRes.imageUrl
            };
            return fetch('https://awesome-places-1525473356114.firebaseio.com/places.json', {
                method: 'POST',
                body: JSON.stringify(placeData)
            });
        })
        .catch(err => console.error(err))
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
        });
    };
};

export const deletePlace = (placeKey) => {
    return {
        type: DELETE_PLACE,
        placeKey
    };
};

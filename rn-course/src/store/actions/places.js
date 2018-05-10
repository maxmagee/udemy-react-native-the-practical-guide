import { REMOVE_PLACE, SET_PLACES } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

// this one is using ES6 syntax of placeName: placeName  -->  placeName
export const addPlace = (placeName, location, image) => {
    return dispatch => {
        dispatch(uiStartLoading());

        fetch('https://us-central1-awesome-places-1525473356114.cloudfunctions.net/storeImage', {
            method: 'POST',
            body: JSON.stringify({
                image: image.base64
            })
        })
        .catch(err => {
            console.log(err);
            alert('Something went wrong, please try again!');
        })
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
        .catch(err => {
            console.error(err);
            alert('Something went wrong, please try again!');
        }) 
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
        });
    };
};

export const deletePlace = (placeKey) => {
    return dispatch => {
        dispatch(removePlace(placeKey));
        return fetch(`https://awesome-places-1525473356114.firebaseio.com/places/${placeKey}.json`, {
            method: 'DELETE'
        })
        .catch(err => {
            console.error(err);
            alert('Something went wrong, please try again!');
        }) 
        .then(res => res.json())
        .then(() => {
            console.log(`${placeKey} deleted!`);
        });
    };
};

export const getPlaces = () => {
    return dispatch => {
        return fetch('https://awesome-places-1525473356114.firebaseio.com/places.json')
            .catch(err => {
                alert('Something went wrong, sorry :/');
                console.log(err);
            })
            .then(res => res.json())
            .then(parsedRes => {
                const places = [];
                for (let key in parsedRes) {    //eslint-disable-line 
                    places.push({
                        ...parsedRes[key],
                        key,
                        image: {
                            uri: parsedRes[key].image
                        }
                    });
                }
                dispatch(setPlaces(places));
            });
    };
};

export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key
    };
};

export const setPlaces = places => {
    return {
        type: SET_PLACES,
        places
    };
};

import { REMOVE_PLACE, SET_PLACES } from './actionTypes';
import { authGetToken, uiStartLoading, uiStopLoading } from './index';

// this one is using ES6 syntax of placeName: placeName  -->  placeName
export const addPlace = (placeName, location, image) => {
    let authToken = null;
    return dispatch => {
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(() => {
                alert('No valid token found!');
            })    
            .then(token => {
                authToken = token;
                return fetch('https://us-central1-awesome-places-1525473356114.cloudfunctions.net/storeImage', {
                    method: 'POST',
                    body: JSON.stringify({
                        image: image.base64
                    }),
                    headers: {
                        'Authorization': `Bearer ${token}`  // eslint-disable-line quote-props
                    }
                });
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
                return fetch(`https://awesome-places-1525473356114.firebaseio.com/places.json?auth=${authToken}`, {
                    method: 'POST',
                    body: JSON.stringify(placeData)
                });
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(uiStopLoading());
            })
            .catch(err => {
                console.error(err);
                alert('Something went wrong, please try again!');
            });
    };
};

export const deletePlace = (placeKey) => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                dispatch(removePlace(placeKey));
                return fetch(`https://awesome-places-1525473356114.firebaseio.com/places/${placeKey}.json?auth=${token}`, {
                    method: 'DELETE'
                });
            })
            .catch(() => {
                alert('No valid token found!');
            })
            .then(res => res.json())
            .then(() => {
                console.log(`${placeKey} deleted!`);
            })
            .catch(err => {
                console.error(err);
                alert('Something went wrong, please try again!');
            });
    };
};

export const getPlaces = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                return fetch(`https://awesome-places-1525473356114.firebaseio.com/places.json?auth=${token}`);
            })
            .catch(() => {
                alert('No valid token found!');
            })
            .then(res => {
                return res.json();
            })
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
            })
            .catch(err => {
                alert('Something went wrong, sorry :/');
                console.log(err);
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

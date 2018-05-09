import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import placesReducer from './reducers/places';

const rootReducer = combineReducers({
    places: placesReducer
});

let composeEnhancers = compose;

if (__DEV__) {  // eslint-disable-line no-undef
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  // eslint-disable-line no-undef, no-underscore-dangle, max-len
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;

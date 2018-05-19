import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/auth';
import placesReducer from './reducers/places';
import uiReducer from './reducers/ui';

const rootReducer = combineReducers({
    auth: authReducer,
    places: placesReducer,
    ui: uiReducer
});

let composeEnhancers = compose;

if (__DEV__) {  // eslint-disable-line no-undef
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  // eslint-disable-line no-undef, no-underscore-dangle, max-len
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;

import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, logger, immutableStateInvariantMiddleware())
    );
}
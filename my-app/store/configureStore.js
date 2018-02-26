import { createStore, applyMiddleware } from 'redux';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default function configureStore(initialState) {
    return createStore(
        [],
        initialState,
        applyMiddleware(thunk, logger, immutableStateInvariantMiddleware())
    );
}
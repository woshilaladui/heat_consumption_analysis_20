import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducer';
import {persistStore, persistReducer,persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';

const myReducer = persistReducer({
  key: 'root',
  storage
}, reducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);
const store = createStore(reducer, enhancer);
export const persistor = persistStore(store)
export default store;
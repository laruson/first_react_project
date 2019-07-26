import React from 'react';
import {AppRegistry} from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { apiMqiddleware } from './src/services/api';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducers from './src/reducers';
import App from './App';

const middlewares = [thunk, apiMqiddleware];
const store = createStore(rootReducers, compose(applyMiddleware(...middlewares)));

const Application = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent('education_react', () => Application);

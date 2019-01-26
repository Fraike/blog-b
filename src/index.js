import React from 'react';
import ReactDOM from 'react-dom';
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import Home from './Home';
import './config'
import { BrowserRouter, Route,Switch} from 'react-router-dom';

import AuthRoute from  './component/authroute/authroute'
import DashBoard from './component/dashboard/dashboard'
import Login from './container/login/login'

import reducer from './reducer'

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension(): f=>f

const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    reduxDevtools
))


ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route component={DashBoard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
        </Provider>
    , document.getElementById('root'));

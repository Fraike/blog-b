import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import './config'
import { BrowserRouter, Route,Switch} from 'react-router-dom';

import AuthRoute from  './component/authroute/authroute'
import DashBoard from './component/dashboard/dashboard'

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension(): f=>f




ReactDOM.render(
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/home' component={Home}></Route>
                    <Route component={DashBoard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    , document.getElementById('root'));

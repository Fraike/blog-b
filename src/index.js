import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import './config'
import { BrowserRouter, Route,Switch} from 'react-router-dom';

import AuthRoute from  './component/authroute/authroute'



ReactDOM.render(
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/home' component={Home}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    , document.getElementById('root'));

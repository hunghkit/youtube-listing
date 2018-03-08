import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Youtube from 'pages/Youtube';
import Register from 'pages/Register';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Youtube} />
    <Route exact path="/home" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Switch>
);

export default Routes;

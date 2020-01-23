import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Characters from '../pages/chars';

export default function Routes() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Characters} />
        </Switch>
      </ BrowserRouter>
    )
  }
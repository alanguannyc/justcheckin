import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import EventsDashboard from './EventsDashboard';
import EventView from './EventView';
import CheckIn from './CheckIn';

export default class Routes extends Component {
  render() {

    return (
      <Switch >
        <Redirect
          exact
          from="/dashboard"
          to="/"
        />

        <Route
          component={EventsDashboard}
          exact
          path="/"
        />

        <Route
          component={EventView}
          path='/event/:id/attendees'
        />
        <Route
          component={CheckIn}
          path='/event/:id/checkin'
        />
        {/*
        
        <Route
          component={UnderDevelopment}
          exact
          path="/under-development"
        />
        <Route
          component={NotFound}
          exact
          path="/not-found"
        />
         <Redirect to="/not-found" /> */}
      </Switch>
    );
  }
}
